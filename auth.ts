import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/data/user";
import prismadb from "@/lib/prismadb";
import { getTwoFactorConfirmationbyUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prismadb.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id);
      if (account?.provider === "google" || account?.provider === "github") {
        if (existingUser?.ban === true) {
          const banExpiresAt = existingUser.banExpires
            ? new Date(existingUser.banExpires)
            : null;
          const now = new Date();

          if (banExpiresAt && banExpiresAt > now) {
            return false;
          } else if (banExpiresAt) {
            // Ban period has expired, unban the user
            await prismadb.user.update({
              where: { id: existingUser.id },
              data: {
                ban: false,
                banExpires: null,
              },
            });
          }
        }
      }

      //Ngăn chặn đăng nhập mà không cần xác minh email
      if (!existingUser?.emailVerified) return false;
      //ADD 2FA check --- 2FA: Có nghĩa là xác thực 2 lớp
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationbyUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        //Delete two factor confirmation for next sign in
        await prismadb.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.imageCredential = token.imageCredential as string[];
        session.user.ban = token.ban as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.imageCredential = existingUser.imageCredential;
      token.ban = existingUser.ban;
      return token;
    },
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  ...authConfig,
});

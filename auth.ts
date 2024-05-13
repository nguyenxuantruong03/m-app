import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/data/user";
import prismadb from "@/lib/prismadb";
import { getTwoFactorConfirmationbyUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
import { UserRole } from "@prisma/client";
import { sendBanUserNotStart, sendUnBanUser } from "./lib/mail";
import { format } from "date-fns";

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
      const now = new Date();
      now.setHours(now.getHours() + 7);

      //Các bước check trước khi đăng nhập bầng  account google,github...
      //--Bước1--Check người dùng có bị ban
      const existingUser = await getUserById(user.id);
      if (existingUser?.ban === true) {
        const banExpiresAt = existingUser.banExpires
          ? new Date(existingUser.banExpires)
          : null;
        if (banExpiresAt && banExpiresAt > now) {
          const timeBan = existingUser.banExpires
            ? format(existingUser.banExpires, "dd/MM/yyyy '-' HH:mm:ss a")
            : "";
          await sendBanUserNotStart(
            existingUser.email,
            existingUser.name,
            timeBan
          );
          return '/auth/errorban';
        }
        //Nếu người dùng bị cấm nhưng thời gian cấm đã hết hạn, chương trình sẽ vào đây.
        else if (banExpiresAt) {
          // Ban period has expired, unban the user
          const unbanUser = await prismadb.user.update({
            where: { id: existingUser.id },
            data: {
              ban: false,
              banExpires: null,
              resendCount: 0,
              resendTokenVerify: 0,
              resendEmailResetPassword: 0,
              resendTokenResetPassword: 0,
            },
          });
          await sendUnBanUser(unbanUser.email, unbanUser.name);
        }
      }
      //--Bước2--Handle check xem có bị ban vĩnh viển ko
      //Set-up1: const settinguser = await prismadb.user.findMany();
      const system = await prismadb.system.findMany();
      const banforeverValues = system
        .filter((item) => item.banforever) // Lọc các mục có thuộc tính `banforever`
        .map((item) => item.banforever) // Lấy giá trị của thuộc tính `banforever`
        .reduce((acc, currentValue) => {
          // Nếu currentValue không phải mảng rỗng, thêm vào mảng kết quả
          if (currentValue.length > 0) {
            acc.push(...currentValue);
          }
          return acc;
        }, []);

      //Set-up2: Gộp các giá trị lặp lại bằng cách chuyển sang Set và sau đó trở lại dạng mảng
      const uniqueBanforeverValues = Array.from(new Set(banforeverValues));
      //Lấy banforever so sanh với userId lấy ra email tương ứng
      const userAll = await prismadb.user.findMany();
      // Tạo một mảng chứa các ID người dùng mà bạn muốn lấy
      const matchedUsers = userAll.filter((userData) =>
        uniqueBanforeverValues.includes(userData.id)
      );
      const findEmail = matchedUsers.map((item) => item.email);
      const matchEmail =
        existingUser && findEmail.some((email) => email === existingUser.email);

      if (matchEmail) {
        return '/auth/errorbanforever';
      }

      //--Bước3--Ngăn chặn đăng nhập mà không cần xác minh email
      if (account?.provider !== "credentials") return true;

      //--Bước4--Ngăn chặn đăng nhập mà không cần xác minh email và 2FA
      if (!existingUser?.emailVerified) return false;

      //--Bước5--ADD 2FA check --- 2FA: Có nghĩa là xác thực 2 lớp
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationbyUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        //--Bước6--Xóa xác nhận hai yếu tố cho lần đăng nhập tiếp theo
        //Delete two factor confirmation for next sign in
        await prismadb.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      //Cập nhật lại thời gian mỗi khi đăng nhập
      await prismadb.user.update({
        where: { id: existingUser.id },
        data: {
          lastlogin: now,
        },
      });
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
        session.user.timestartwork = token.timestartwork as string;
        session.user.urlimageCheckAttendance = token.urlimageCheckAttendance as string;
        session.user.codeNFC = token.codeNFC as string;
        session.user.daywork = token.daywork as string[];
        const existingUser = await getUserById(token.sub);
        if (existingUser) {
          const now = new Date();
          now.setHours(now.getHours() + 7);

          //Cập nhật lại thời gian mỗi khi đăng nhập
          await prismadb.user.update({
            where: { id: existingUser.id },
            data: {
              lastlogin: now,
            },
          });
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      if (user && account) {
        if (existingUser) {
          const now = new Date();
          now.setHours(now.getHours() + 7);

          //Cập nhật lại thời gian mỗi khi đăng nhập
          await prismadb.user.update({
            where: { id: existingUser.id },
            data: {
              lastlogin: now,
            },
          });
        }
      }
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.imageCredential = existingUser.imageCredential;
      token.ban = existingUser.ban;
      token.timestartwork = existingUser.timestartwork;
      token.urlimageCheckAttendance = existingUser.urlimageCheckAttendance;
      token.codeNFC = existingUser.codeNFC;
      token.daywork = existingUser.daywork;
      return token;
    },
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  ...authConfig,
});

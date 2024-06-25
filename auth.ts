import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/data/user";
import prismadb from "@/lib/prismadb";
import { getTwoFactorConfirmationbyUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
import { Gender, UserRole } from "@prisma/client";
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
          // Kiểm tra giá trị hiện tại của resendBanUserNotStart
          let resendCount = existingUser.resendBanUserNotStart || 0;
          if (resendCount < 2) {
            // Nếu giá trị nhỏ hơn 2, tăng lên 1
            await sendBanUserNotStart(
              existingUser.email,
              existingUser.name,
              timeBan
            );
            resendCount++; // Tăng giá trị lên 1
            // Cập nhật giá trị mới cho resendBanUserNotStart
            await prismadb.user.update({
              where: { id: existingUser.id },
              data: {
                resendBanUserNotStart: resendCount,
              },
            });
          }
          return "/auth/errorban";
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
              resendBanUserNotStart: 0,
              resendUnBanUser: 0,
            },
          });
          // Kiểm tra giá trị hiện tại của resendUnBanUser
          let resendCount = existingUser.resendUnBanUser || 0;

          if (resendCount < 2) {
            // Nếu giá trị nhỏ hơn 2, tăng lên 1
            await sendUnBanUser(unbanUser.email, unbanUser.name);
            resendCount++; // Tăng giá trị lên 1
            // Cập nhật giá trị mới cho resendUnBanUser
            await prismadb.user.update({
              where: { id: existingUser.id },
              data: {
                resendUnBanUser: resendCount,
              },
            });
          }
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
        return "/auth/errorbanforever";
      }

      if (existingUser) {
        // --Bước3-- Kiểm tra xem "phobien" có trong favorite của người dùng không
        const hasPhobien = existingUser.favorite.includes("phobien");
        //Xem người dùng đã có favorite mặc định là phobien chưa nếu chưa có thì create
        if (!hasPhobien) {
          await prismadb.user.update({
            where: { id: existingUser.id },
            data: {
              favorite: [...existingUser.favorite, "phobien"],
            },
          });
        }
      }

      //--Bước4--Ngăn chặn đăng nhập mà không cần xác minh email
      if (account?.provider !== "credentials") return true;

      //--Bước5--Ngăn chặn đăng nhập mà không cần xác minh email và 2FA
      if (!existingUser?.emailVerified) return false;

      //--Bước6--ADD 2FA check --- 2FA: Có nghĩa là xác thực 2 lớp
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationbyUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        //--Bước7--Xóa xác nhận hai yếu tố cho lần đăng nhập tiếp theo
        //Delete two factor confirmation for next sign in
        await prismadb.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      //--Bước8--Cập nhật lại thời gian mỗi khi đăng nhập
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
        session.user.nameuser = token.nameuser as string;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.provider = token.provider as string;
        session.user.imageCredential = token.imageCredential as string[];
        session.user.favorite = token.favorite as string[];
        session.user.ban = token.ban as boolean;
        session.user.timestartwork = token.timestartwork as string;
        session.user.urlimageCheckAttendance =
          token.urlimageCheckAttendance as string;
        session.user.codeNFC = token.codeNFC as string;
        session.user.daywork = token.daywork as string[];
        session.user.bio = token.bio as string;
        session.user.address = token.address as string;
        session.user.addressother = token.addressother as string;
        session.user.gender = token.gender as Gender;
        session.user.phonenumber = token.phonenumber as string;
        session.user.dateofbirth = token.dateofbirth as Date;
        session.user.linkyoutube = token.linkyoutube as string;
        session.user.linkfacebook = token.linkfacebook as string;
        session.user.linkinstagram = token.linkinstagram as string;
        session.user.linktwitter = token.linktwitter as string;
        session.user.linklinkedin = token.linklinkedin as string;
        session.user.linkgithub = token.linkgithub as string;
        session.user.linktiktok = token.linktiktok as string;
        session.user.linkwebsite = token.linkwebsite as string;
        session.user.linkother = token.linkother as string;
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
      token.provider = existingAccount?.provider;
      token.name = existingUser.name;
      token.nameuser = existingUser.nameuser;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.imageCredential = existingUser.imageCredential;
      token.ban = existingUser.ban;
      token.timestartwork = existingUser.timestartwork;
      token.urlimageCheckAttendance = existingUser.urlimageCheckAttendance;
      token.codeNFC = existingUser.codeNFC;
      token.daywork = existingUser.daywork;
      token.bio = existingUser.bio;
      token.address = existingUser.address;
      token.addressother = existingUser.addressother;
      token.gender = existingUser.gender;
      token.phonenumber = existingUser.phonenumber;
      token.dateofbirth = existingUser.dateofbirth;
      token.favorite = existingUser.favorite;
      if (existingUser.socialLink) {
        token.linkyoutube = existingUser.socialLink.linkyoutube;
        token.linkfacebook = existingUser.socialLink.linkfacebook;
        token.linkinstagram = existingUser.socialLink.linkinstagram;
        token.linktwitter = existingUser.socialLink.linktwitter;
        token.linklinkedin = existingUser.socialLink.linklinkedin;
        token.linkgithub = existingUser.socialLink.linkgithub;
        token.linktiktok = existingUser.socialLink.linktiktok;
        token.linkwebsite = existingUser.socialLink.linkwebsite;
        token.linkother = existingUser.socialLink.linkother;
      } else {
        token.linkyoutube = null;
        token.linkfacebook = null;
        token.linkinstagram = null;
        token.linktwitter = null;
        token.linklinkedin = null;
        token.linkgithub = null;
        token.linktiktok = null;
        token.linkwebsite = null;
        token.linkother = null;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  ...authConfig,
});

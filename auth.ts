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
    async createUser({ user }) {
      //Khi tạo người dùng nếu là người dùng đầu tiên của ứng dụng sẽ tự động trao quyền ADMIN
      const userCount = await prismadb.user.count();
      if (userCount === 1) {
        // Nếu đây là người dùng đầu tiên
        await prismadb.user.update({
          where: { id: user.id },
          data: { role: "ADMIN" }, // Đặt vai trò ADMIN
        });
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const now = new Date();
      now.setHours(now.getHours() + 7);

      //Các bước check trước khi đăng nhập bầng  account google,github...
      const existingUser = await getUserById(user.id);

      // --Bước bắt buộc-- Nếu không có nameuser sẽ tự động update
      const atIndex = existingUser?.email?.indexOf("@");
      const nameuser = existingUser?.email?.slice(0, atIndex).toLowerCase();

      if (existingUser && !existingUser.nameuser) {
        await prismadb.user.update({
          where: { id: existingUser?.id },
          data: {
            nameuser: nameuser,
          },
        });
      }

      //--Bước1--Check người dùng có bị ban
      if (existingUser && existingUser.ban === true) {
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
              existingUser.language,
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
            await sendUnBanUser(
              existingUser.language,
              unbanUser.email,
              unbanUser.name
            );
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
      //--Bước3--Handle check xem có bị ban vĩnh viển ko
      if (existingUser?.isbanforever) {
        return "/auth/errorbanforever";
      }

      //--Bước4--Tọa favorite nếu là người đầu và người người dùng không có phobien thì update luôn luôn có phobien
      if (existingUser) {
        // Bước 1: Kiểm tra xem "phobien" đã có trong favorite của người dùng chưa
        const hasPhobien = existingUser.favorite.includes("phobien");

        if (!hasPhobien) {
          //  Kiểm tra xem "phobien" đã tồn tại trong bảng favorites hay chưa
          let favoriteRecord = await prismadb.favorite.findFirst({
            where: { value: "phobien", storeId: "" },
          });

          // Nếu chưa có "phobien" trong bảng favorites, tạo mới record với "phobien"
          if (!favoriteRecord) {
            favoriteRecord = await prismadb.favorite.create({
              data: {
                storeId: "", // Có thể cần điều chỉnh storeId nếu có thông tin
                name: "Phổ biến",
                value: "phobien",
              },
            });
          }

          //  Đảm bảo người dùng luôn có "phobien" trong danh sách favorite
          if (favoriteRecord?.value) {
            // Kết hợp các giá trị cũ và "phobien" vào danh sách favorite của người dùng
            const updatedFavorites = Array.from(
              new Set([...existingUser.favorite, favoriteRecord.value]) // Loại bỏ phần tử trùng lặp
            );

            // Cập nhật lại danh sách favorite của người dùng
            await prismadb.user.update({
              where: { id: existingUser.id },
              data: {
                favorite: updatedFavorites, // Cập nhật với danh sách mới
              },
            });
          }
        }
      }

      //--Bước5--Ngăn chặn đăng nhập mà không cần xác minh email
      if (account?.provider !== "credentials") return true;

      //--Bước6--Ngăn chặn đăng nhập mà không cần xác minh email và 2FA
      if (existingUser?.email !== "guest@gmail.com" && !existingUser?.emailVerified) {
        return false;
      }
      
      //--Bước7--ADD 2FA check --- 2FA: Có nghĩa là xác thực 2 lớp
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationbyUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        //--Bước8--Xóa xác nhận hai yếu tố cho lần đăng nhập tiếp theo
        //Delete two factor confirmation for next sign in
        await prismadb.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },

    async session({ token, session }) {
      // Giờ VN hiện tại
      const now = new Date();
      now.setHours(now.getHours() + 7);

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
        session.user.imageCredential = token.imageCredential as string;
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
        session.user.frameAvatar = token.frameAvatar as string;
        session.user.isCitizen = token.isCitizen as boolean;
        session.user.createdAt = token.createdAt as Date;
        session.user.language = token.language as string;
        session.user.isLive = token.isLive as boolean;
        session.user.locationLat = token.locationLat as number;
        session.user.locationLng = token.locationLng as number;
        session.user.isSharingLocation = token.isSharingLocation as boolean;
        session.user.isShowAds = token.isShowAds as boolean;
        session.user.TimeshowAds = token.TimeshowAds as Date;
        session.user.conversationId = token.conversationId as string;
        session.user.feedbackTimeNextResonse =
          token.feedbackTimeNextResonse as Date;
        const existingUser = await getUserById(token.sub);

        //--Bước đặc biệt--Handle check xem có bị ban vĩnh viển ko
        if (existingUser?.isbanforever) {
          throw new Error("You have been ban forever!");
        }

        //--Bước1--Check người dùng có bị ban
        if (existingUser && existingUser.ban === true) {
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
                existingUser.language,
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
            throw new Error("You have been banned!");
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
              await sendUnBanUser(
                existingUser.language,
                unbanUser.email,
                unbanUser.name
              );
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

        if (existingUser) {
          //Cập nhật lại thời gian mỗi khi đăng nhập
          await prismadb.user.update({
            where: { id: existingUser.id },
            data: {
              lastlogin: now,
            },
          });
        }

        /// -- Bước kiểm tra favorite -- Nếu ko có tự update
        if (existingUser) {
          // Bước 1: Kiểm tra xem "phobien" đã có trong favorite của người dùng chưa
          const hasPhobien = existingUser.favorite.includes("phobien");

          if (!hasPhobien) {
            //  Kiểm tra xem "phobien" đã tồn tại trong bảng favorites hay chưa
            let favoriteRecord = await prismadb.favorite.findFirst({
              where: { value: "phobien", storeId: "" },
            });

            // Nếu chưa có "phobien" trong bảng favorites, tạo mới record với "phobien"
            if (!favoriteRecord) {
              favoriteRecord = await prismadb.favorite.create({
                data: {
                  storeId: "", // Có thể cần điều chỉnh storeId nếu có thông tin
                  name: "Phổ biến",
                  value: "phobien",
                },
              });
            }

            //  Đảm bảo người dùng luôn có "phobien" trong danh sách favorite
            if (favoriteRecord?.value) {
              // Kết hợp các giá trị cũ và "phobien" vào danh sách favorite của người dùng
              const updatedFavorites = Array.from(
                new Set([...existingUser.favorite, favoriteRecord.value]) // Loại bỏ phần tử trùng lặp
              );

              // Cập nhật lại danh sách favorite của người dùng
              await prismadb.user.update({
                where: { id: existingUser.id },
                data: {
                  favorite: updatedFavorites, // Cập nhật với danh sách mới
                },
              });
            }
          }
        }

        // --Bước bắt buộc-- Nếu không có nameuser se tự động update
        const atIndex = existingUser?.email?.indexOf("@");
        const nameuser = existingUser?.email?.slice(0, atIndex).toLowerCase();

        if (existingUser && !existingUser.nameuser) {
          await prismadb.user.update({
            where: { id: existingUser?.id },
            data: {
              nameuser: nameuser,
            },
          });
        }
      }

      // If isShowAds is true and TimeshowAds exists
      if (session.user.isShowAds === true && session.user.TimeshowAds) {
        const timeWithOffset = new Date(session.user.TimeshowAds);
        timeWithOffset.setHours(timeWithOffset.getHours() + 12);

        if (now > timeWithOffset) {
          // Update isShowAds to false in the database
          await prismadb.user.update({
            where: { id: token.sub },
            data: {
              isShowAds: false,
            },
          });
        }
      }

      // ---------Bảo vệ sự riêng tư khách hàng trong sau 24 giờ xóa messenges---------------
      if (session.user?.conversationId) {
        // Lấy ra các message trong conversationId
        const messages = await prismadb.message.findMany({
          where: {
            conversationId: session.user.conversationId,
          },
        });
    
        if (messages.length > 0) {
          // Lặp qua các messages để kiểm tra và xóa các messages cũ hơn 24 giờ
          const messagesToDelete = messages.filter((message) => {
            const messageCreatedAt = new Date(message.createdAt);
            // So sánh thời gian tạo của message với thời gian hiện tại
            return (now.getTime() - messageCreatedAt.getTime()) > 24 * 60 * 60 * 1000; // 24 giờ
          });
    
          if (messagesToDelete.length > 0) {
            // Xóa các message thỏa mãn điều kiện
            await prismadb.message.deleteMany({
              where: {
                id: {
                  in: messagesToDelete.map((message) => message.id),
                },
              },
            });
          }
        }
      }

      return {
        ...session,
        redirect: "/auth/errorban",
      };
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
      if (existingUser.imageCredential.length > 0) {
        token.imageCredential = existingUser.imageCredential[0].url;
      }
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
      token.frameAvatar = existingUser.frameAvatar;
      token.isCitizen = existingUser.isCitizen;
      token.createdAt = existingUser.createdAt;
      token.language = existingUser.language;
      token.locationLat = existingUser.locationLat;
      token.locationLng = existingUser.locationLng;
      token.isSharingLocation = existingUser.isSharingLocation;
      token.isShowAds = existingUser.isShowAds;
      token.TimeshowAds = existingUser.TimeshowAds;
      token.conversationId = existingUser?.conversations[0]?.id
      token.feedbackTimeNextResonse =
        existingUser?.feedback?.[0]?.timeNextResponse;
      if (existingUser.stream) {
        token.isLive = existingUser.stream.isLive;
      } else {
        token.isLive = false;
      }
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

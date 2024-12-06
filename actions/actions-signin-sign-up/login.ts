"use server";
import * as z from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import prismadb from "@/lib/prismadb";

import {
  generateVerificationToken,
  genearteTwoFactorToken,
} from "@/lib/tokens";

import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
  sendUnBanUser,
} from "@/lib/mail";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorConfirmationbyUserId } from "@/data/two-factor-confirmation";
import { format } from "date-fns";
import bcrypt from "bcryptjs";
import { UAInfo } from "@/providers/device-info-provider";
import {
  getInvalidEmailMessage,
  getToastError,
  translateAccountBannedTime,
  translateAccountPermanentlyBannedPolicyViolation,
  translateDeviceExists,
  translateDeviceInfoNotFound,
  translateDeviceLimitExceeded,
  translateDeviceNotFound,
  translateDeviceSaveError,
  translateDeviceSearchError,
  translateEmailNotConfirmedOrInvalid,
  translateIncorrectPassword,
  translateIncorrectVerificationCode,
  translateInvalid,
  translateInvalidEmailOrPassword,
  translateTooManyVerificationRequests,
  translateValidInfo,
  translateVerificationCodeExpired,
  translateVerificationCodeNotFound,
} from "@/translate/translate-client";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
  deviceInfo?: UAInfo | null,
  languageToUse?: string
) => {
  //languages
  const accountPermanentlyBannedPolicyViolationMessage =
    translateAccountPermanentlyBannedPolicyViolation(languageToUse || "vi");
  const invalidEmailMessage = getInvalidEmailMessage(languageToUse || "vi");
  const emailNotConfirmedOrInvalidMessage = translateEmailNotConfirmedOrInvalid(
    languageToUse || "vi"
  );
  const invalidMessage = translateInvalid(languageToUse!);
  const incorrectPasswordMessage = translateIncorrectPassword(
    languageToUse || "vi"
  );
  const validInfoMessage = translateValidInfo(languageToUse || "vi");
  const deviceLimitExceededMessage = translateDeviceLimitExceeded(
    languageToUse || "vi"
  );
  const verificationCodeNotFoundMessage = translateVerificationCodeNotFound(
    languageToUse || "vi"
  );
  const incorrectVerificationCodeMessage = translateIncorrectVerificationCode(
    languageToUse || "vi"
  );
  const verificationCodeExpiredMessage = translateVerificationCodeExpired(
    languageToUse || "vi"
  );
  const deviceExitsMessage = translateDeviceExists(languageToUse || "vi");
  const deviceSearchErrorMessage = translateDeviceSearchError(
    languageToUse || "vi"
  );
  const deviceNotFoundMessage = translateDeviceNotFound(languageToUse || "vi");
  const deviceSaveErrorMessage = translateDeviceSaveError(
    languageToUse || "vi"
  );
  const deviceInfoNotFoundMessage = translateDeviceInfoNotFound(
    languageToUse || "vi"
  );
  const invalidEmailOrPasswordMessage = translateInvalidEmailOrPassword(
    languageToUse || "vi"
  );
  const toastErrorMessage = getToastError(languageToUse || "vi");

  //safeParse: Phân tích an toàn
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: invalidMessage };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser?.isbanforever) {
    return {
      error: accountPermanentlyBannedPolicyViolationMessage,
    };
  }

  if (!existingUser?.email) {
    return { error: `${invalidEmailMessage}!` };
  }

  if (!existingUser?.emailVerified) {
    return {
      error: emailNotConfirmedOrInvalidMessage,
    };
  }

  // Truy vấn mật khẩu của người dùng từ mô hình Password
  const userPasswords = await prismadb.password.findMany({
    where: {
      userId: existingUser.id,
    },
    orderBy: {
      createdAt: "desc", // Sắp xếp theo thời gian giảm dần để lấy mật khẩu mới nhất
    },
    take: 1, // Chỉ lấy mật khẩu mới nhất
  });

  // Chuyển values password sang hash để so sánh nếu 2 cái match thì mk đúng còn không match thì error
  // // Còn nếu password bằng guestguest@123A thì ko cần compare
  let passwordsMatch = false;
  if (values.password === "guestguest@123A") {
    passwordsMatch = true;
  } else {
    passwordsMatch = await bcrypt.compare(
      values.password,
      userPasswords[0].password
    );
  }

  if (!passwordsMatch) {
    return { error: incorrectPasswordMessage };
  }

  if (existingUser?.role !== "GUEST" && existingUser?.id) {
    //Ban User
    if (existingUser.ban && existingUser.banExpires) {
      const now = new Date();
      const banExpiresAt = new Date(existingUser.banExpires);

      if (banExpiresAt > now) {
        // User is banned
        const daysLeft = banExpiresAt
          ? format(banExpiresAt, "dd/MM/yyyy '-' HH:mm:ss a")
          : "";
        return {
          error: translateAccountBannedTime(languageToUse || "vi", daysLeft),
        };
      } else {
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
          await sendUnBanUser(languageToUse, unbanUser.email, unbanUser.name);
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

    if (!existingUser.emailVerified) {
      const verificationtoken = await generateVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        languageToUse,
        verificationtoken.email,
        verificationtoken.token
      );
      return { success: validInfoMessage };
    }

    // Dùng để kiểm tra thiết bị xem có quá giới hạn không
    const existingDeviceLimitDevice = await prismadb.deviceInfo.findMany({
      where: { userId: existingUser.id },
    });

    let limitDevice = null;
    if (existingDeviceLimitDevice.length > 0) {
      // Assuming limitDevice is stored as a property in each deviceInfo object
      limitDevice = existingDeviceLimitDevice[0].limitDevice;
    }
    // Ensure limitDevice is not null
    const effectiveLimitDevice = limitDevice ?? 0;

    const totalDeviceCount = existingDeviceLimitDevice.length;
    if (totalDeviceCount > effectiveLimitDevice) {
      return {
        error: deviceLimitExceededMessage,
      };
    }

    // Xác thực 2FA hay còn được gọi là xác thục 2 bước
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        // Verify code xác thực 2 yếu tố
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );

        if (!twoFactorToken) {
          return { error: verificationCodeNotFoundMessage };
        }

        if (twoFactorToken.token !== code) {
          return { error: incorrectVerificationCodeMessage };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return { error: verificationCodeExpiredMessage };
        }
        await prismadb.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });

        const existingConfirmation = await getTwoFactorConfirmationbyUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await prismadb.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id },
          });
        }

        await prismadb.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } else {
        // Người dùng yêu cầu gửi lại mã xác thực
        const resendCount = existingUser.resendCount || 0; // Lấy số lần đã gửi lại mã xác thực trước đó
        if (resendCount >= 6) {
          // Nếu đã gửi lại mã xác thực quá 5 lần
          const timeBanUser = new Date();
          timeBanUser.setTime(timeBanUser.getTime() + 24 * 60 * 60 * 1000);
          // Cập nhật trạng thái cấm người dùng
          const banUser = await prismadb.user.update({
            where: { id: existingUser.id },
            data: {
              ban: true,
              banExpires: timeBanUser, // Cấm trong 24 giờ
            },
          });
          const timeBan = banUser.banExpires
            ? format(banUser.banExpires, "dd/MM/yyyy '-' HH:mm:ss a")
            : "";
          return {
            error: translateTooManyVerificationRequests(
              languageToUse || "vi",
              timeBan
            ),
          };
        } else {
          // Tăng resendCount lên 1 và lưu lại vào cơ sở dữ liệu
          await prismadb.user.update({
            where: { id: existingUser.id },
            data: {
              resendCount: resendCount + 1,
            },
          });
          // Gửi lại mã xác thực
          const twoFactorToken = await genearteTwoFactorToken(
            existingUser.email
          );
          await sendTwoFactorTokenEmail(
            languageToUse,
            twoFactorToken.email,
            twoFactorToken.token,
          );
          return { twoFactor: true };
        }
      }
    }
  }

  try {
    const signInPromise = signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    //Update resend nếu như người dùng đã login vào
    const updateUserPromise = prismadb.user.update({
      where: { email: existingUser.email },
      data: {
        resendCount: 0,
        resendTokenVerify: 0,
        resendEmailResetPassword: 0,
        resendTokenResetPassword: 0,
        resendBanUserNotStart: 0,
        resendUnBanUser: 0,
      },
    });

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

    const now = new Date();
    now.setHours(now.getHours() + 7);

    //Cập nhật lại thời gian mỗi khi đăng nhập
    const updateLastLogin = await prismadb.user.update({
      where: { id: existingUser.id },
      data: {
        lastlogin: now,
      },
    });

    const saveDeviceInfo = async (deviceInfo: UAInfo) => {
      try {
        if (existingUser?.role !== "GUEST" && existingUser?.id) {
          const existingDeviceInfo = await prismadb.deviceInfo.findMany({
            where: { ua: deviceInfo.ua, userId: existingUser.id },
          });

          let deviceExists = false;

          existingDeviceInfo.forEach((deviceInfo) => {
            if (deviceInfo.ua) {
              const start = deviceInfo.ua.indexOf("(");
              const end = deviceInfo.ua.indexOf(")");

              // Kiểm tra xem có phần "(" và ")" trong chuỗi không
              if (start !== -1 && end !== -1) {
                // Cắt chuỗi từ vị trí bắt đầu của "(" đến kết thúc của ")"
                const cutString = deviceInfo.ua.substring(start + 1, end);

                if (deviceInfo.ua.includes(cutString)) {
                  console.error(deviceExitsMessage);
                  deviceExists = true;
                }
              } else {
                console.error(deviceSearchErrorMessage);
              }
            } else {
              console.error(deviceNotFoundMessage);
            }
          });

          // Nếu không có thiết bị nào sử dụng UA này, tạo mới
          if (!deviceExists) {
            await prismadb.deviceInfo.create({
              data: {
                userId: existingUser.id,
                browser: deviceInfo.browser
                  ? [deviceInfo.browser.name, deviceInfo.browser.version]
                  : [],
                cpu: deviceInfo.cpu ? [deviceInfo.cpu.architecture] : [],
                device: [
                  deviceInfo.device.type,
                  deviceInfo.device.brand,
                  deviceInfo.device.model,
                ],
                engine: deviceInfo.engine
                  ? [deviceInfo.engine.name, deviceInfo.engine.version]
                  : [],
                os: [
                  deviceInfo.os.platform,
                  deviceInfo.os.name || "unknown",
                  deviceInfo.os.version || "unknown",
                ],
                ua: deviceInfo.ua,
                fullModel: deviceInfo.fullModel,
              },
            });
          }
        }
      } catch (errors) {
        console.error(deviceSaveErrorMessage, errors);
      }
    };

    // Assuming deviceInfo is defined somewhere in your code
    if (deviceInfo) {
      const saveDeviceInfoResult = await saveDeviceInfo(deviceInfo);
      await Promise.all([
        signInPromise,
        updateUserPromise,
        updateLastLogin,
        saveDeviceInfoResult,
      ]);
    } else {
      console.error(deviceInfoNotFoundMessage);
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: invalidEmailOrPasswordMessage };
        default:
          return { error: toastErrorMessage };
      }
    }
    throw error;
  }
};

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

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
  deviceInfo?: any
) => {
  //safeParse: Phân tích an toàn
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Không hợp lệ!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

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
  const user = await prismadb.user.findMany();

  // Tạo một mảng chứa các ID người dùng mà bạn muốn lấy
  const matchedUsers = user.filter((userData) =>
    uniqueBanforeverValues.includes(userData.id)
  );
  const findEmail = matchedUsers.map((item) => item.email);

  const matchEmail =
    existingUser && findEmail.some((email) => email === existingUser.email);

  if (matchEmail) {
    return { error: "Tài khoản hiện tại đã bị ban vĩnh viễn!" };
  }

  if (!existingUser?.email) {
    return { error: "Email không hợp lệ!" };
  }

  if (!existingUser?.emailVerified) {
    return {
      error: "Bạn chưa xác nhận email hoặc email của bạn không hợp lệ!",
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

  //Chuyển values password sang hash để so sánh nếu 2 cái match thì mk đúng còn không match thì error
  const passwordsMatch = await bcrypt.compare(
    values.password,
    userPasswords[0].password
  );

  if (!passwordsMatch) {
    return { error: "Mật khẩu không đúng!" };
  }

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
        error: `Tài khoản của bạn đã bị khóa. Bạn có thể đăng nhập lại sau ${daysLeft} ngày. Để biết thêm thông tin liên hệ ADMIN.`,
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

  if (!existingUser.emailVerified) {
    const verificationtoken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationtoken.email,
      verificationtoken.token
    );
    return { success: "Thông tin chính xác!" };
  }

  //Dùng để kiểm tra thiết bị xem có quá giới hạn không
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
      error: `Xin lỗi! Người dùng đã giới hạn thiết bị đăng nhập. Hiện tại đã quá nhiều thiết bị đăng nhập vào tài khoản này.`,
    };
  }
  

  // Xác thực 2FA hay còn được gọi là xác thục 2 bước
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // Verify code xác thực 2 yếu tố
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Không tìm thấy mã xác thực,hãy thử lại!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Mã xác thực không chính xác,hãy thử lại!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Mã xác thực đã hết hạn!" };
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
          error: `Bạn đã gửi lại mã xác thực quá nhiều lần và đã bị khóa tài khoản trong 24 giờ. Hãy quay lại vào lúc ${timeBan}.`,
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
        const twoFactorToken = await genearteTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );
        return { twoFactor: true };
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
        const existingDeviceInfo = await prismadb.deviceInfo.findMany({
          where: { ua: deviceInfo.ua,userId:existingUser.id },
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
                console.error("Thiết bị đã tồn tại.");
                deviceExists = true;
              }
            } else {
              console.error("Lỗi tìm kiếm thiết bị.");
            }
          } else {
            console.error("Không tìm thấy ua trên thiết bị này.");
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
      } catch (errors) {
        console.error("Lỗi lưu thiết bị vào dữ liệu.", errors);
      }
    };

    const saveDeviceInfoResult = await saveDeviceInfo(deviceInfo);
    await Promise.all([
      signInPromise,
      updateUserPromise,
      updateLastLogin,
      saveDeviceInfoResult,
    ]);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email hoặc mật khẩu không đúng!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};

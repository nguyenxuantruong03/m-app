"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import prismadb from "@/lib/prismadb";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { format } from "date-fns";
import { createTranslator } from "next-intl";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
  languageToUse?: string
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse || "vi", messages });

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: `${t("newPassword.notFound")}!` };
  }

  const { password } = validatedFields.data;
  if (!token) {
    return { error: t("newPassword.missingTokens") };
  }
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: t("newPassword.tokenNotFound") };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: t("newPassword.emailNotFound") };
  }

  // Check ban status again after potential update
  if (existingUser.ban) {
    return {
      error: t("newPassword.accountLocked"),
    };
  }

  const userPasswords = await prismadb.password.findMany({
    where: {
      userId: existingUser.id,
    },
    orderBy: {
      createdAt: "desc", // Sắp xếp theo thời gian giảm dần để lấy mật khẩu mới nhất
    },
  });

  if (userPasswords.length === 0) {
    return { error: t("newPassword.passwordNotFound") };
  }

  let isSamePassword = false;

  for (const userPassword of userPasswords) {
    isSamePassword = await bcrypt.compare(
      values.password,
      userPassword.password
    );

    if (isSamePassword) {
      const passwordSetDate = format(
        userPassword.createdAt, // Lấy ngày tạo của mật khẩu đang được so sánh
        "E '-' dd/MM/yyyy '-' HH:mm:ss a"
      );

      return {
        error: t("newPassword.passwordMismatch", {passwordSetDate:passwordSetDate})
      };
    }
  }

  let resendTokenResetPasswordCount =
    existingUser.resendTokenResetPassword || 0; // Đếm số lần gửi resendTokenResetPassword
  // Tăng số lần gửi lên 1
  resendTokenResetPasswordCount++;

  // Kiểm tra xem đã gửi quá nhiều lần chưa nếu nhiều hơn 5 sẽ bị ban
  if (resendTokenResetPasswordCount >= 6) {
    const timeBanUser = new Date();
    timeBanUser.setTime(timeBanUser.getTime() + 24 * 60 * 60 * 1000);
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
      error: t("newPassword.tooManyAttempts", {timeBan:timeBan}),
    };
  }

  await prismadb.user.update({
    where: { id: existingUser.id },
    data: {
      resendTokenResetPassword: resendTokenResetPasswordCount,
    },
  });

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    // Tạo token mới và gửi email
    const newToken = await generatePasswordResetToken(existingToken.email);
    if (resendTokenResetPasswordCount >= 3) {
      await sendPasswordResetEmail(
        languageToUse,
        existingToken.email,
        newToken.token,
        resendTokenResetPasswordCount
      );
    } else {
      await sendPasswordResetEmail(languageToUse,existingToken.email, newToken.token);
    }
    return {
      error: t("newPassword.tokenExpired"),
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await prismadb.user.update({
    where: { id: existingUser.id }, // Thay thế 'existingUser.id' bằng ID của người dùng bạn muốn cập nhật
    data: {
      password: {
        create: {
          password: hashPassword, // Cập nhật mật khẩu mới
        },
      },
      resendTokenResetPassword: resendTokenResetPasswordCount, // Cập nhật thông tin khác của người dùng
    },
  });
  await prismadb.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: t("newPassword.passwordUpdated") };
};

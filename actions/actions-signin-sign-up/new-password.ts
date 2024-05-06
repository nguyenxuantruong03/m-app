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

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Thiếu Token! Hãy click lại reset password!" };
  }
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Không tìm thấy Token. Hãy send resetpassword click lại!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Không tìm thấy Email!" };
  }

  const existingUserPassword = existingUser.password;

  if (!existingUserPassword) {
    return { error: "Mật khẩu của người dùng không tồn tại!" };
  }

  const lastPasswordSetDate = format(
    existingUser.createdAt,
    "E '-' dd/MM/yyyy '-' HH:mm:ss a"
  );

  // So sánh mật khẩu mới với mật khẩu cũ
  const isSamePassword = await bcrypt.compare(
    values.password,
    existingUserPassword
  );

  if (isSamePassword) {
    return {
      error: `Mật khẩu mới không được giống mật khẩu cũ! Mật khẩu cũ đã được đặt vào ngày ${lastPasswordSetDate}.`,
    };
  }

  let resendTokenResetPasswordCount =
    existingUser.resendTokenResetPassword || 0; // Đếm số lần gửi resendTokenResetPassword
  // Tăng số lần gửi lên 1
  resendTokenResetPasswordCount++;

  // Kiểm tra xem đã gửi quá nhiều lần chưa nếu nhiều hơn 5 sẽ bị ban
  if (resendTokenResetPasswordCount >= 6) {
    await prismadb.user.update({
      where: { id: existingUser.id },
      data: {
        ban: true,
        banExpires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Cấm trong 24 giờ
      },
    });
    return {
      error:
        "Bạn đã gửi lại mã xác thực quá nhiều lần và đã bị khóa tài khoản trong 24 giờ.",
    };
  }

  await prismadb.user.update({
    where: { id: existingUser.id },
    data: {
      resendTokenResetPassword: resendTokenResetPasswordCount,
    },
  });

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Không tìm thấy!" };
  }

  const { password } = validatedFields.data;

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    // Tạo token mới và gửi email
    const newToken = await generatePasswordResetToken(existingToken.email);
    if (resendTokenResetPasswordCount >= 2) {
      await sendPasswordResetEmail(
        existingToken.email,
        newToken.token,
        resendTokenResetPasswordCount
      );
    } else {
      await sendPasswordResetEmail(existingToken.email, newToken.token);
    }
    return {
      error: "Token đã hết hạn! Đã gửi lại token mới. Hãy kiểm tra email.",
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await prismadb.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashPassword,
      resendTokenResetPassword: resendTokenResetPasswordCount,
    },
  });

  await prismadb.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Mật khẩu mới đã cập nhật lại !" };
};

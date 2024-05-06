"use server";

import prismadb from "@/lib/prismadb";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Token đã hết hạn! Đã gửi lại token mới. Hãy kiểm tra email.",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email hiện tại không có!" };
  }

  let resendTokenVerifyCount = existingUser.resendTokenVerify || 0; // Đếm số lần gửi resendTokenVerify
  // Tăng số lần gửi lên 1
  resendTokenVerifyCount++;

  // Kiểm tra xem đã gửi quá nhiều lần chưa nếu nhiều hơn 5 sẽ bị ban
  if (resendTokenVerifyCount >= 6) {
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
      resendTokenVerify: resendTokenVerifyCount,
    },
  });

  //Kiểm tra token sẽ được bao nhiêu phút dựa vào set trong token.ts nếu token lố thì sẽ error
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    // Tạo token mới và gửi email
    const newToken = await generateVerificationToken(existingToken.email);
    if (resendTokenVerifyCount >= 2) {
      await sendVerificationEmail(
        existingToken.email,
        newToken.token,
        resendTokenVerifyCount
      );
    } else {
      await sendVerificationEmail(existingToken.email, newToken.token);
    }
    return {
      error: "Token đã hết hạn! Đã gửi lại token mới. Hãy kiểm tra email.",
    };
  }

  await prismadb.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingUser.email,
      resendTokenVerify: resendTokenVerifyCount,
    },
  });

  await prismadb.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email đã xác thực!" };
};

"use server";

import prismadb from "@/lib/prismadb";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { format } from "date-fns";
import {
  translateAccountLockedForVerification,
  translateEmailNotExist,
  translateEmailVerified,
  translateTokenExpired,
  translateTooManyVerificationRequests,
} from "@/translate/translate-client";

export const newVerification = async (token: string, languageToUse: string) => {
  //languages
  const emailVerifiedMessage = translateEmailVerified(languageToUse);
  const tokenExpiredMessage = translateTokenExpired(languageToUse);
  const emailNotExitMessage = translateEmailNotExist(languageToUse);
  const accountLockedForVerificationMessage =
    translateAccountLockedForVerification(languageToUse);

  const existingToken = await getVerificationTokenByToken(token);
  const user = await prismadb.user.findUnique({
    where: { id: existingToken?.id }, // Tìm user theo id
    select: { emailVerified: true }, // Chỉ lấy trường emailVerified
  });

  if (user?.emailVerified) {
    return { success: emailVerifiedMessage };
  }

  if (!existingToken) {
    return {
      error: tokenExpiredMessage,
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: emailNotExitMessage };
  }

  // Check ban status again after potential update
  if (existingUser.ban) {
    return { error: accountLockedForVerificationMessage };
  }

  let resendTokenVerifyCount = existingUser.resendTokenVerify || 0; // Đếm số lần gửi resendTokenVerify
  // Tăng số lần gửi lên 1
  resendTokenVerifyCount++;

  // Kiểm tra xem đã gửi quá nhiều lần chưa nếu nhiều hơn 5 sẽ bị ban
  if (resendTokenVerifyCount >= 6) {
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
      error: translateTooManyVerificationRequests(languageToUse, timeBan),
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
      error: tokenExpiredMessage,
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

  return { success: emailVerifiedMessage };
};

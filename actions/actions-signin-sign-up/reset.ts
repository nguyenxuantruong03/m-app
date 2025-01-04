"use server";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { createTranslator } from "next-intl";

export const reset = async (
  values: z.infer<typeof ResetSchema>,
  languageToUse: string
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: `${t("resetPassword.invalidEmail")}!` };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: t("resetPassword.emailNotFound") };
  }

  if (existingUser.email === "guest@gmail.com") {
    return { error: t("resetPassword.guestAccountCannotResetPassword") };
  }

  // Check if the user is banned
  if (existingUser.ban) {
    return { error: t("resetPassword.accountLockedCannotChange") };
  }

  let resendEmailResetPasswordCount =
    existingUser.resendEmailResetPassword || 0; // Đếm số lần gửi resendEmailResetPassword
  // Tăng số lần gửi lên 1
  resendEmailResetPasswordCount++;

  // Kiểm tra xem đã gửi quá nhiều lần chưa nếu nhiều hơn 5 sẽ bị ban
  if (resendEmailResetPasswordCount >= 6) {
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
      error: t("resetPassword.tooManyVerificationAttempts",{timeBan: timeBan}),
    };
  }

  await prismadb.user.update({
    where: { id: existingUser.id },
    data: {
      resendEmailResetPassword: resendEmailResetPasswordCount,
    },
  });

  // Generate token & send email
  const passwordResetToken = await generatePasswordResetToken(email);
  if (resendEmailResetPasswordCount >= 3) {
    await sendPasswordResetEmail(
      languageToUse,
      passwordResetToken.email,
      passwordResetToken.token,
      resendEmailResetPasswordCount
    );
  } else {
    await sendPasswordResetEmail(
      languageToUse,
      passwordResetToken.email,
      passwordResetToken.token
    );
  }

  return { success: t("resetPassword.emailSentCheck") };
};

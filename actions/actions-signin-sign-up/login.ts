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

import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorConfirmationbyUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>,callbackUrl?: string | null) => {
  //safeParse: Phân tích an toàn
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Không hợp lệ!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email hoặc password không hợp lệ!" };
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

  // Xác thực 2FA hay còn được gọi là xác thục 2 bước
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // Verify code xác thực 2 yếu tố
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Không tìm thấy mã xác thực!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "không tìm thấy mã xác thực!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if(hasExpired){
        return {error:"Mã xác thực đã hết hạn!" }
      }
      await prismadb.twoFactorToken.delete({
        where: {id:twoFactorToken.id }
      });

      const existingConfirmation = await getTwoFactorConfirmationbyUserId(existingUser.id)

      if(existingConfirmation){
        await prismadb.twoFactorConfirmation.delete({
          where:{id: existingConfirmation.id}
        })
      }

      await prismadb.twoFactorConfirmation.create({
        data:{
          userId: existingUser.id
        }
      })
    } else {
      const twoFactorToken = await genearteTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email hoặc mật khẩu không đúng!" };
        default:
          return { error: " Something went wrong" };
      }
    }
    throw error;
  }
};

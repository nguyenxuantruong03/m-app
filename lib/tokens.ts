import crypto from "crypto";
import prismadb from "@/lib/prismadb";
import cuid from 'cuid';
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const genearteTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  // Xác thực có hiệu nghiệm trong 5 minutes
  const expires = new Date(new Date().getTime() + 2 *60 * 1000);

  const exitstingToken = await getTwoFactorTokenByEmail(email);

  if (exitstingToken) {
    await prismadb.twoFactorToken.delete({
      where: {
        id: exitstingToken.id,
      },
    });
  }

  const twoFactorToken = await prismadb.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  //Token = với cuid là token sẽ được tạo theo phương thúc CUID tạo ra 1 id 25 ký tự
  const token = cuid();
  const expires = new Date(new Date().getTime() + 5 *60 * 1000);

  const exitstingToken = await getPasswordResetTokenByEmail(email);

  if (exitstingToken) {
    await prismadb.passwordResetToken.delete({
      where: {
        id: exitstingToken.id,
      },
    });
  }

  const passwordResetToken = await prismadb.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  //Token = với cuid là token sẽ được tạo theo phương thúc CUID tạo ra 1 id 25 ký tự
  const token = cuid();
  const expires = new Date(new Date().getTime() + 5 *60 * 1000);

  const exitstingToken = await getVerificationTokenByEmail(email);

  if (exitstingToken) {
    await prismadb.verificationToken.delete({
      where: {
        id: exitstingToken.id,
      },
    });
  }

  const verificationToken = await prismadb.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

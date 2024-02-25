import prismadb from "@/lib/prismadb";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResettoken = await prismadb.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResettoken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResettoken = await prismadb.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResettoken;
  } catch (error) {
    return null;
  }
};

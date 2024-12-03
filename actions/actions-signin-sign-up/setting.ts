"use server";

import * as z from "zod";

import prismadb from "@/lib/prismadb";
import { SettingSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { format } from "date-fns";
import { Gender } from "@prisma/client";
import {
  translateAccountLockedCannotChange,
  translateChangeSuccessful,
  translateEmailAlreadyInUse,
  translateEmailVerifiedSuccess,
  translateIncorrectPassword,
  translateNewPasswordCannotBeSameAsOld,
  translateNotAllowed,
  translateUsernameAlreadyTaken,
} from "@/translate/translate-client";

export const setting = async (
  values: z.infer<typeof SettingSchema>,
  languageToUse: string
) => {
  //language
  const accountLockedCannotChangeMessage =
    translateAccountLockedCannotChange(languageToUse);
  const notAllowedMessage = translateNotAllowed(languageToUse);
  const emailAlreadyInUseMessage = translateEmailAlreadyInUse(languageToUse);
  const emailVerifiedSuccessMessage =
    translateEmailVerifiedSuccess(languageToUse);
  const incirrectPasswordMessage = translateIncorrectPassword(languageToUse);
  const usernameAlreadyTakenMessage =
    translateUsernameAlreadyTaken(languageToUse);
  const changeSuccessfulMessage = translateChangeSuccessful(languageToUse);

  const user = await currentUser();

  if (!user) {
    return { error: notAllowedMessage };
  }

  // Check ban status again after potential update
  if (user.ban) {
    return {
      error: accountLockedCannotChangeMessage,
    };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: notAllowedMessage };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: emailAlreadyInUseMessage };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: emailVerifiedSuccessMessage };
  }

  const FindNameUser = await prismadb.user.findMany();

  for (const user of FindNameUser) {
    if (user.nameuser === values.nameuser) {
      return { error: usernameAlreadyTakenMessage };
    }
  }

  const userPasswords = await prismadb.password.findMany({
    where: {
      userId: dbUser.id,
    },
    orderBy: {
      createdAt: "desc", // Sắp xếp theo thời gian giảm dần để lấy mật khẩu mới nhất
    },
  });

  if (values.password && values.newPassword && userPasswords[0].password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      userPasswords[0].password
    );

    if (!passwordMatch) {
      return { error: incirrectPasswordMessage };
    }

    let isSamePassword = false;

    for (const userPassword of userPasswords) {
      isSamePassword = await bcrypt.compare(
        values.newPassword,
        userPassword.password
      );

      if (isSamePassword) {
        const passwordSetDate = format(
          userPassword.createdAt, // Lấy ngày tạo của mật khẩu đang được so sánh
          "E '-' dd/MM/yyyy '-' HH:mm:ss a"
        );

        return {
          error: translateNewPasswordCannotBeSameAsOld(
            languageToUse,
            passwordSetDate
          ),
        };
      }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  // Ensure 'phobien' is included in favorites
  const favoriteWithPhobien = Array.isArray(values.favorite)
    ? Array.from(new Set([...values.favorite, "phobien"]))
    : ["phobien"];

  await prismadb.user.update({
    where: { id: dbUser.id },
    data: {
      password: values.password
        ? {
            create: {
              password: values.password, // Update with new password
            },
          }
        : undefined,

      // Update social links only if any values are provided
      socialLink: {
        upsert: {
          where: { userId: dbUser.id },
          create: {
            linkyoutube: values.linkyoutube || undefined,
            linkfacebook: values.linkfacebook || undefined,
            linkinstagram: values.linkinstagram || undefined,
            linktwitter: values.linktwitter || undefined,
            linklinkedin: values.linklinkedin || undefined,
            linkgithub: values.linkgithub || undefined,
            linktiktok: values.linktiktok || undefined,
            linkwebsite: values.linkwebsite || undefined,
            linkother: values.linkother || undefined,
          },
          update: {
            linkyoutube: values.linkyoutube || undefined,
            linkfacebook: values.linkfacebook || undefined,
            linkinstagram: values.linkinstagram || undefined,
            linktwitter: values.linktwitter || undefined,
            linklinkedin: values.linklinkedin || undefined,
            linkgithub: values.linkgithub || undefined,
            linktiktok: values.linktiktok || undefined,
            linkwebsite: values.linkwebsite || undefined,
            linkother: values.linkother || undefined,
          },
        },
      },

      // Update imageCredential only if values.imageCredential is provided
      imageCredential:
        values.imageCredential && values.imageCredential.length > 0
          ? {
              create: {
                url: values.imageCredential[0], // Select the first URL if available
              },
            }
          : undefined,

      // Other user attributes can be updated directly
      favorite: favoriteWithPhobien,
      bio: values.bio,
      address: values.address,
      addressother: values.addressother,
      nameuser: values.nameuser,
      gender: values.gender as Gender,
      phonenumber: values.phonenumber,
      dateofbirth: values.dateofbirth,
      frameAvatar: values.frame,

      // Do not update email and isTwoFactorEnabled if they are not provided
      email: undefined,
      isTwoFactorEnabled: values.isTwoFactorEnabled,
    },
  });

  return { success: changeSuccessfulMessage };
};

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

export const setting = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Không được phép!" };
  }

  // Check ban status again after potential update
  if (user.ban) {
    return {
      error:
        "Tài khoản của bạn đã bị khóa. Không thể thay đổi. Hãy kiểm tra Email để biết thời gian mở khóa!",
    };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Không được phép!" };
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
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Xác thực email thành công!" };
  }

  const FindNameUser = await prismadb.user.findMany();

  for (const user of FindNameUser) {
    if (user.nameuser === values.nameuser) {
      return { error: "Tên người dùng này đã có người đặt!" };
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
      return { error: "Password không đúng!" };
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
          error: `Mật khẩu mới không được giống mật khẩu cũ! Mật khẩu cũ đã được đặt vào ngày ${passwordSetDate}.`,
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
      password: {
        create: {
          password: values.password || "", // Cập nhật mật khẩu mới
        },
      },
      socialLink: {
        upsert: {
          where: { userId: dbUser.id }, // Điều kiện để kiểm tra sự tồn tại
          create: {
            // Dữ liệu sẽ được tạo mới nếu chưa tồn tại
            linkyoutube: values.linkyoutube || "",
            linkfacebook: values.linkfacebook || "",
            linkinstagram: values.linkinstagram || "",
            linktwitter: values.linktwitter || "",
            linklinkedin: values.linklinkedin || "",
            linkgithub: values.linkgithub || "",
            linktiktok: values.linktiktok || "",
            linkwebsite: values.linkwebsite || "",
            linkother: values.linkother || "",
          },
          update: {
            // Dữ liệu sẽ được cập nhật nếu đã tồn tại
            linkyoutube: values.linkyoutube || "",
            linkfacebook: values.linkfacebook || "",
            linkinstagram: values.linkinstagram || "",
            linktwitter: values.linktwitter || "",
            linklinkedin: values.linklinkedin || "",
            linkgithub: values.linkgithub || "",
            linktiktok: values.linktiktok || "",
            linkwebsite: values.linkwebsite || "",
            linkother: values.linkother || "",
          },
        },
      },
      imageCredential:
        values.imageCredential && values.imageCredential.length > 0
          ? {
              create: {
                url: values.imageCredential[0], // Select the first URL if available
              },
            }
          : undefined,
      favorite: favoriteWithPhobien,
      bio: values.bio,
      address: values.address,
      addressother: values.addressother,
      nameuser: values.nameuser,
      gender: values.gender as Gender,
      phonenumber: values.phonenumber,
      dateofbirth: values.dateofbirth,

      frameAvatar: values.frame,
      email: undefined,
      isTwoFactorEnabled: values.isTwoFactorEnabled,
    },
  });
  return { success: "Thay đổi thành công!" };
};

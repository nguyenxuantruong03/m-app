"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { createTranslator } from "next-intl";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  languageToUse: string
) => {
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  //safeParse: Phân tích an toàn
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: t("register.invalid") };
  }
  const { email, password, name } = validatedFields.data;
  // Add password regex check
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,20}$/;
  if (!passwordRegex.test(password)) {
    return { error: t("register.passwordRequirement") };
  }

  // Check if field of the required fields are empty
  if (!name || !email || !password) {
    return { error: t("register.pleaseFillOutAllField") };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser?.isbanforever) {
    return {
      error: t("register.accountPermanentlyBannedPolicyViolation"),
    };
  }

  if (existingUser) {
    return { error: t("register.emailAlreadyUsed") };
  }

  // Xử lý tạo nameuser từ email
  const atIndex = email.indexOf("@");
  const nameuser = email.slice(0, atIndex).toLowerCase();

  // Kiểm tra trong dữ liệu nếu chưa có người dùng nào hết thì
  //  mặc định cho người dùng đầu tiên role ADMIN
  const userCount = await prismadb.user.count();
  const role = userCount === 0 ? "ADMIN" : "USER";

  // Tạo người dùng mới
  const favoriteValue = "phobien";
  const favoriteName = "Phổ biến";

  // Kiểm tra nếu giá trị "phobien" đã tồn tại trong bảng favorite
  const existingFavorite = await prismadb.favorite.findFirst({
    where: {
      value: favoriteValue,
      storeId: "", // Thay bằng storeId của bạn
    },
  });

  // Nếu chưa tồn tại, tạo mới giá trị trong bảng favorite
  if (!existingFavorite) {
    await prismadb.favorite.create({
      data: {
        storeId: "",
        name: favoriteName,
        value: favoriteValue,
      },
    });
  }

  // Thêm giá trị "phobien" vào mảng favorite của người dùng mới
  await prismadb.user.create({
    data: {
      name,
      email,
      language: languageToUse,
      nameuser: nameuser,
      favorite: [favoriteValue], // Khởi tạo mảng với "phobien"
      password: {
        create: [{ password: hashPassword }],
      },
      role,
    },
  });

  //Send verification token email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(languageToUse, verificationToken.email, verificationToken.token);

  // Clearing values for privacy before returning success message
  const sanitizedValues = { name: "", email: "", password: "" };

  return {
    success: t("register.successCheckEmail"),
    sanitizedValues,
  };
};

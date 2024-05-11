"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  //safeParse: Phân tích an toàn
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Không hợp lệ!" };
  }
  const { email, password, name } = validatedFields.data;
  // Add password regex check
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,20}$/;
  if (!passwordRegex.test(password)) {
    return { error: "Mật khẩu yêu cầu [a-z] và [0-9] ít nhất 6 ký tự!" };
  }

  // Check if any of the required fields are empty
  if (!name || !email || !password) {
    return { error: "Vui lòng nhập đầy đủ thông tin." };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  //Set-up1: const settinguser = await prismadb.user.findMany();
  const system = await prismadb.system.findMany();
  const banforeverValues = system
    .filter((item) => item.banforever) // Lọc các mục có thuộc tính `banforever`
    .map((item) => item.banforever) // Lấy giá trị của thuộc tính `banforever`
    .reduce((acc, currentValue) => {
      // Nếu currentValue không phải mảng rỗng, thêm vào mảng kết quả
      if (currentValue.length > 0) {
        acc.push(...currentValue);
      }
      return acc;
    }, []);

  //Set-up2: Gộp các giá trị lặp lại bằng cách chuyển sang Set và sau đó trở lại dạng mảng
  const uniqueBanforeverValues = Array.from(new Set(banforeverValues));
  //Lấy banforever so sanh với userId lấy ra email tương ứng
  const user = await prismadb.user.findMany();
  // Tạo một mảng chứa các ID người dùng mà bạn muốn lấy
  const matchedUsers = user.filter((userData) =>
    uniqueBanforeverValues.includes(userData.id)
  );
  const findEmail = matchedUsers.map((item) => item.email);

  const matchEmail =
    existingUser && findEmail.some((email) => email === existingUser.email);

  if (matchEmail) {
    return { error: "Tài khoản hiện tại đã bị ban vĩnh viễn!" };
  }

  if (existingUser) {
    return { error: "Email đã được sử dụng!" };
  }

  await prismadb.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  //Send verification token email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  // Clearing values for privacy before returning success message
  const sanitizedValues = { name: "", email: "", password: "" };

  return {
    success: "Thành công. Hãy kiểm tra email của bạn!",
    sanitizedValues,
  };
};

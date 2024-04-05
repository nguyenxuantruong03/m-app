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
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  )

   // Clearing values for privacy before returning success message
   const sanitizedValues = { name: "", email: "", password: "" };

  return { success: "Thành công. Hãy kiểm tra email của bạn!",sanitizedValues };
};

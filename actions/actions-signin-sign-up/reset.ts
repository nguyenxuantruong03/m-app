"use server"
import * as z from "zod"
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"

export const reset = async (values: z.infer<typeof ResetSchema>) =>{
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Email không hợp lệ!"}
    }

    const {email} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser){
        return {error: "Không tìm thấy Email !"}
    }

    // Check if the user is banned
    if (existingUser.ban) {
        return { error: "Tài khoản của bạn đã bị cấm trong 24 giờ." };
    }

    // Generate token & send email
    const passwordResetToken = await generatePasswordResetToken(email)   
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    ) 

    return {success: "Đặt lại Email đã gửi!"}
}
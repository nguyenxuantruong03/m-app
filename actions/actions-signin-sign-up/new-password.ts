"use server"

import bcrypt from "bcryptjs"
import * as z from "zod"
import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import prismadb from "@/lib/prismadb"

export const newPassword = async (values:z.infer<typeof NewPasswordSchema>, token?:string | null) =>{
    if(!token){
        return {error: "Thiếu Token"}
    }

    const validatedFields = NewPasswordSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Không tìm thấy!"}
    }

    const {password} = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token)
    if(!existingToken){
        return {error: "Không tìm thấy Token!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error: "Token đã hết hạn!"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser){
        return {error: "Không tìm thấy Email!"}
    }

    const hashPassword = await bcrypt.hash(password,10)

    await prismadb.user.update({
        where:{id: existingUser.id},
        data: {password:hashPassword }
    })

    await prismadb.passwordResetToken.delete({
        where: {id: existingToken.id}
    })

    return {success: "Mật khẩu mới đã cập nhật lại !"}
}
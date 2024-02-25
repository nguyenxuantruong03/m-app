"use server"

import prismadb from "@/lib/prismadb"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export const newVerification = async (token:string) =>{
    const existingToken = await getVerificationTokenByToken(token)

    if(!existingToken){
        return {error: "Token không tồn tại!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error: "Token đã hết hạn!"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser){
        return {error: "Email hiện tại không có!"}
    }

    await prismadb.user.update({
        where:{id: existingUser.id},
        data:{
            emailVerified: new Date(),
            email: existingUser.email
        }
    })

    await prismadb.verificationToken.delete({
        where:{id: existingToken.id}
    })

    return {success: "Email đã xác thực!"}
}
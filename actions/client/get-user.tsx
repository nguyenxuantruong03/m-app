import { User } from "@/types/type"

const URLUSER = `${process.env.NEXT_PUBLIC_API_URL}/getAllUser`

export const getAllUser = async ():Promise<User[]> =>{
    const res = await fetch(URLUSER)

    return res.json()
} 
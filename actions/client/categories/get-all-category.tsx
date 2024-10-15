import { Category } from "@/types/type"

const URLCategories = `${process.env.NEXT_PUBLIC_API_URL}/getAllCategory`

export const getAllCategory = async ():Promise<Category[]> =>{
    const res = await fetch(URLCategories)

    return res.json()
} 
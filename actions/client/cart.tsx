import { CartItemType } from "@/types/type";
import qs from "query-string"

const URL = `/api/client/cart/get-items`

interface Query{
    userId?: string
    language?: string; // Thêm tham số language
}

const getCart = async (query: Query):Promise<CartItemType[]> =>{
    const url = qs.stringifyUrl({
        url: URL,
        query:{
            userId: query.userId,
            language: query.language || "vi", // Mặc định là "vi" nếu không truyền language
        }
    })
    const res = await fetch(url)
    
    return res.json()
} 

export default getCart
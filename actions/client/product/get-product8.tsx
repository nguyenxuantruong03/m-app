import { Product } from "@/types/type";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/product8`

interface Query{
    isFeatured?: boolean
    language?: string; // Thêm tham số language
}

const getProduct8 = async (query: Query):Promise<Product[]> =>{
    const url = qs.stringifyUrl({
        url: URL,
        query:{
            isFeatured: query.isFeatured,
            language: query.language || "vi", // Mặc định là "vi" nếu không truyền language
        }
    })
    const res = await fetch(url)
    
    return res.json()
} 

export default getProduct8
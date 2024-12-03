import { Product } from "@/types/type";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/searchProduct`

interface Query{
    value?: string
    language?: string; // Thêm tham số language
}

const getSearchProduct = async (query: Query):Promise<Product[]> =>{
    const url = qs.stringifyUrl({
        url: URL,
        query:{
            value: query.value,
            language: query.language || "vi", // Mặc định là "vi" nếu không truyền language
        }
    })
    const res = await fetch(url)
    
    return res.json()
} 

export default getSearchProduct
import { ProductDetail } from "@/types/type";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/productdetail`

interface Query{
    categoryId: any
    language: string; // Thêm tham số language
}

const getProductDetail = async (query: Query):Promise<ProductDetail[]> =>{
    const url = qs.stringifyUrl({
        url: URL,
        query:{
            categoryId: query.categoryId,
            language: query.language || "vi", // Mặc định là "vi" nếu không truyền language
        }
    })
    const res = await fetch(url)
    
    return res.json()
} 

export default getProductDetail
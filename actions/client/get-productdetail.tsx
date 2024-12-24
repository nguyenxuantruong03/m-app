import { ProductDetail } from "@/types/type";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/productdetail`

interface Query{
    categoryId: any
}

const getProductDetail = async (query: Query):Promise<ProductDetail[]> =>{
    const url = qs.stringifyUrl({
        url: URL,
        query:{
            categoryId: query.categoryId,
        }
    })
    const res = await fetch(url)
    
    return res.json()
} 

export default getProductDetail
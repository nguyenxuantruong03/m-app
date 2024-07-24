import { Product } from "@/types/type";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/product6`

interface Query{
    isFeatured?: boolean
}

const getProduct6 = async (query: Query):Promise<Product[]> =>{
    const url = qs.stringifyUrl({
        url: URL,
        query:{
            isFeatured: query.isFeatured
        }
    })
    const res = await fetch(url)
    
    return res.json()
} 

export default getProduct6
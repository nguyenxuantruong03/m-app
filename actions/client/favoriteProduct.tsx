import { FavoriteUnion } from "@/hooks/client/db/use-favorite";
import qs from "query-string"

const URL = `/api/client/favoriteProduct`

interface Query{
    userId?: string
    language?: string; // Thêm tham số language
}

const getFavoriteProduct = async (query: Query):Promise<FavoriteUnion[]> =>{
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

export default getFavoriteProduct
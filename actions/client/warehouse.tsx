import { Order } from "@/types/type"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/warehouse`
const getWareHouse =async(language:string):Promise<Order[]> =>{
    const res = await fetch(`${URL}?language=${language}`)

    return res.json()
}

export default getWareHouse
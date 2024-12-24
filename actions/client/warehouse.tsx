import { Order } from "@/types/type"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/warehouse`
const getWareHouse =async():Promise<Order[]> =>{
    const res = await fetch(`${URL}`)

    return res.json()
}

export default getWareHouse
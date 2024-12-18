import { Billboard } from "@/types/type"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

const getBillboard = async (id: string, language: string):Promise<Billboard> =>{
    const res = await fetch(`${URL}/${id}?language=${language}`)

    return res.json()
}

export default getBillboard
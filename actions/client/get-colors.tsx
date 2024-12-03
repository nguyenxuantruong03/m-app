import { Color } from "@/types/type"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/color`
const getColors =async(language:string):Promise<Color[]> =>{
    const res = await fetch(`${URL}?language=${language}`)

    return res.json()
}

export default getColors
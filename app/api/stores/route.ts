import {NextResponse} from "next/server"
import {auth} from "clerk/nextjs"
export async function POST(req: Request){
try {
    const {userId} = auth()
    const body = await req.json()

    
} catch (error) {
    console.log('[STORES_POST]', error)
    return new NextResponse("POST failed" ,{status: 500})
}
}
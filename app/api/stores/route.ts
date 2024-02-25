import {NextResponse} from "next/server"
import prismadb from "@/lib/prismadb"
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
export async function POST(req: Request){
try {
    const userId = await currentUser();
    const body = await req.json()

    const {name} = body

    if(!userId) {
        return new NextResponse("Unauthorizd " ,{status:403})
    }
    if(!name){
        return new NextResponse("Name is required" , {status: 400})
    }

    const store = await prismadb.store.create({
        data:{
            name,
            userId: userId.role as UserRole
        }
    })
    return NextResponse.json(store)
} catch (error) {
    console.log('[STORES_POST]', error)
    return new NextResponse("POST failed" ,{status: 500})
}
}
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params}:{params:{storeId: string}}){
    try {
        const {userId} = auth();

        const body = await req.json()

        const{imageUrl} =body;

        if(!userId){
            return new NextResponse("Unauthenticated",{status: 403})
        }

        if(!imageUrl){
            return new NextResponse("image Url is required",{status: 400})
        }

        if(!params.storeId){
            return new NextResponse("Store id is required",{status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId,
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status: 400})
        }
        const billboardSale = await prismadb.billboardSale.create({
           data:{
            imageUrl,
            storeId: params.storeId
           }
        })
        return NextResponse.json(billboardSale)
    } catch (error) {
        console.log("[BILLBOARDSALE_POST]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}


export async function GET(req:Request,{params}:{params:{storeId: string}}){
    try {
        if(!params.storeId){
            return new NextResponse("Store id is required",{status: 400})
        }

        const billboardSale = await prismadb.billboardSale.findMany({
           where:{
            storeId: params.storeId
           }
        })
        return NextResponse.json(billboardSale)
    } catch (error) {
        console.log("[BILLBOARDSALE_GET]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}
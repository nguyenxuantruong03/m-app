import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{billboardDeliveryId: string}}){
    try {
        if(!params.billboardDeliveryId){
            return new NextResponse("Store id is required",{status: 400})
        }

        const billboardDelivery = await prismadb.billboardDelivery.findUnique({
           where:{
            id: params.billboardDeliveryId
           }
        })
        return NextResponse.json(billboardDelivery)
    } catch (error) {
        console.log("[BILLBOARDDELIVERY_GET]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE(req:Request,{params}:{params:{billboardDeliveryId: string}}){
    try {
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthenticated",{status: 403})
        }

        if(!params.billboardDeliveryId){
            return new NextResponse("Billboard id is required",{status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.billboardDeliveryId,
                userId,
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status: 400})
        }
        const billboardDelivery = await prismadb.billboardDelivery.delete({
          where:{
            id:params.billboardDeliveryId,
          }
        })
        return NextResponse.json(billboardDelivery)
    } catch (error) {
        console.log("[BILLBOARDDELIVERY_DELETE]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH(req:Request,{params}:{params:{billboardDeliveryId: string ,storeId: string}}){
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

        if(!params.billboardDeliveryId){
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
        const billboardDelivery = await prismadb.billboardDelivery.update({
          where:{
            id: params.billboardDeliveryId,
          },
          data:{
            imageUrl
          }
        })
        return NextResponse.json(billboardDelivery)
    } catch (error) {
        console.log("[BILLBOARDDELIVERY_PATCH]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}



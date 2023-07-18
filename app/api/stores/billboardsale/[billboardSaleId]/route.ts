import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{billboardSaleId: string}}){
    try {
        if(!params.billboardSaleId){
            return new NextResponse("Store id is required",{status: 400})
        }

        const billboardSale = await prismadb.billboardSale.findUnique({
           where:{
            id: params.billboardSaleId
           }
        })
        return NextResponse.json(billboardSale)
    } catch (error) {
        console.log("[BILLBOARDSALE_GET]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE(req:Request,{params}:{params:{billboardSaleId: string}}){
    try {
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthenticated",{status: 403})
        }

        if(!params.billboardSaleId){
            return new NextResponse("Billboard id is required",{status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.billboardSaleId,
                userId,
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status: 400})
        }
        const billboardSale = await prismadb.billboardSale.delete({
          where:{
            id:params.billboardSaleId,
          }
        })
        return NextResponse.json(billboardSale)
    } catch (error) {
        console.log("[BILLBOARDSALE_DELETE]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH(req:Request,{params}:{params:{billboardSaleId: string ,storeId: string}}){
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

        if(!params.billboardSaleId){
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
        const billboardSale = await prismadb.billboardSale.update({
          where:{
            id: params.billboardSaleId,
          },
          data:{
            imageUrl
          }
        })
        return NextResponse.json(billboardSale)
    } catch (error) {
        console.log("[BILLBOARDSALE_PATCH]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}



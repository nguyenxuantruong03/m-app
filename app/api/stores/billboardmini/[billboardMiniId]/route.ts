import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{billboardMiniId: string}}){
    try {
        if(!params.billboardMiniId){
            return new NextResponse("Store id is required",{status: 400})
        }

        const billboardMini = await prismadb.billboardMini.findUnique({
           where:{
            id: params.billboardMiniId
           }
        })
        return NextResponse.json(billboardMini)
    } catch (error) {
        console.log("[BILLBOARDMINI_GET]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE(req:Request,{params}:{params:{billboardMiniId: string}}){
    try {
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthenticated",{status: 403})
        }

        if(!params.billboardMiniId){
            return new NextResponse("Billboard id is required",{status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.billboardMiniId,
                userId,
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status: 400})
        }
        const billboard = await prismadb.billboardMini.delete({
          where:{
            id:params.billboardMiniId,
          }
        })
        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[BILLBOARDMINI_DELETE]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH(req:Request,{params}:{params:{billboardMiniId: string ,storeId: string}}){
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

        if(!params.billboardMiniId){
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
        const billboardMini = await prismadb.billboardMini.update({
          where:{
            id: params.billboardMiniId,
          },
          data:{
            imageUrl
          }
        })
        return NextResponse.json(billboardMini)
    } catch (error) {
        console.log("[BILLBOARDMINI_PATCH]",error)
        return new NextResponse("Internal Error", {status: 500})
    }
}



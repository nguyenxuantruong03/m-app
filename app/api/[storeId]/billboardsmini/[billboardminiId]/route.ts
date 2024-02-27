import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { billboardminiId: string } }
) {
  try {
    if (!params.billboardminiId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const billboard = await prismadb.billboardmini.findUnique({
      where: {
        id: params.billboardminiId
      },
      include:{
        imagebillboardmini:true
      }
    });
  
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { billboardminiId: string, storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.billboardminiId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Access denied. Only Admins can perform this action.", { status: 403 });
    }

    const billboard = await prismadb.billboardmini.delete({
      where: {
        id: params.billboardminiId,
      }
    });
  
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { billboardminiId: string, storeId: string } }
) {
  try {   
    const userId = await currentUser();

    const body = await req.json();
    
    const { label, imagebillboardmini } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imagebillboardmini || !imagebillboardmini.length) {
      return new NextResponse("Image billboad  is required", { status: 400 });
    }

    if (!params.billboardminiId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.billboardmini.update({
      where: {
        id: params.billboardminiId,
      },
      data: {
        label,
        imagebillboardmini:{
          deleteMany:{}
        }
      }
    });
    const billboard = await prismadb.billboardmini.update({
      where:{
        id: params.billboardminiId
      },
      data:{
        imagebillboardmini:{
          createMany:{
            data:[
              ...imagebillboardmini.map((image:{url: string}) => image)
            ]
          }
        }
      }
    })
  
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

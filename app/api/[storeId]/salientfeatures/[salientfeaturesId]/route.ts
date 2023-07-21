import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { salientfeaturesId: string } }
) {
  try {
    if (!params.salientfeaturesId) {
      return new NextResponse("Salientfeatures id is required", { status: 400 });
    }

    const salientfeatures = await prismadb.salientfeatures.findUnique({
      where: {
        id: params.salientfeaturesId
      },
      include:{
        imagesalientfeatures: true,
      }
    });
  
    return NextResponse.json(salientfeatures);
  } catch (error) {
    console.log('[SALIENTFEATURES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { salientfeaturesId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.salientfeaturesId) {
      return new NextResponse("Salientfeatures id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const salientfeatures = await prismadb.salientfeatures.delete({
      where: {
        id: params.salientfeaturesId,
      }
    });
  
    return NextResponse.json(salientfeatures);
  } catch (error) {
    console.log('[SALIENTFEATURES_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { salientfeaturesId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { name,description,description2,description3,description4,content,imagesalientfeatures} = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!description2) {
      return new NextResponse("Description 2 is required", { status: 400 });
    }
    if (!description3) {
      return new NextResponse("Description 3 is required", { status: 400 });
    }
    if (!description4) {
      return new NextResponse("Description 4 is required", { status: 400 });
    }
    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }
    if (!imagesalientfeatures || !imagesalientfeatures.length) {
      return new NextResponse("Imagesalient Features is required", { status: 400 });
    }

    if (!params.salientfeaturesId) {
      return new NextResponse("Salientfeatures id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const salientfeatures = await prismadb.salientfeatures.update({
      where: {
        id: params.salientfeaturesId,
      },
      data: {
        imagesalientfeatures:{
          createMany:{
            data:[
              ...imagesalientfeatures.map((image:{url: string})=> image)
            ]
          }
        }
      }
    });
  
    return NextResponse.json(salientfeatures);
  } catch (error) {
    console.log('[SALIENTFEATURES_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

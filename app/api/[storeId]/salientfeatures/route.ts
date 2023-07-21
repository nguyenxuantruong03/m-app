import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name,description,description2,description3,description4,content,imagesalientfeatures } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description2) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description3) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!description4) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!content) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!imagesalientfeatures || !imagesalientfeatures.length) {
      return new NextResponse("Imagesalient Features is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const salientfeatures = await prismadb.salientfeatures.create({
      data: {
        name,description,
        description2,
        description3,description4,
        content,
        imagesalientfeatures:{
        createMany:{
          data: [
            ...imagesalientfeatures.map((image:{url: string}) => image)
          ]
        },
      },

        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(salientfeatures);
  } catch (error) {
    console.log('[PRODUCT_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const salientfeatures = await prismadb.salientfeatures.findMany({
      where: {
        storeId: params.storeId,
      },
      include:{
        imagesalientfeatures: true,
      },
      orderBy:{
        createdAt: 'desc'
      }
    });
  
    return NextResponse.json(salientfeatures);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

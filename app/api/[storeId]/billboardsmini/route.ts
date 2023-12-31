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

    const { label, imagebillboardmini } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imagebillboardmini || !imagebillboardmini.length) {
      return new NextResponse("Images billboard is required", { status: 400 });
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

    const billboardminis = await prismadb.billboardmini.create({
      data: {
        label,
        imagebillboardmini:{
          createMany: {
            data: [
              ...imagebillboardmini.map((image: { url: string }) => image),
            ],
          },
        },
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(billboardminis);
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await prismadb.billboardmini.findMany({
      where: {
        storeId: params.storeId
      },
      include:{
        imagebillboardmini: true
      },
      orderBy:{
        createdAt: 'desc'
      }
      
    });
  
    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

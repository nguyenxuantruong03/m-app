import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/auth';
import { UserRole } from '@prisma/client';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const billboard = await prismadb.billboardsale.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDSALE_POST]', error);
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

    const billboards = await prismadb.billboardsale.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDSALE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

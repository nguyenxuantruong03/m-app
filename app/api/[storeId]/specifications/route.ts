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

    const { name,
      description, value,description2, value2,
      description3, value3,description4, value4,
      description5, value5,description6, value6,
      description7, value7,description8, value8,
      description9, value9,description10, value10,
    
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!description2) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value2) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!description3) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value3) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!description4) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value4) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!description5) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value5) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!description6) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value6) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!description7) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value7) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!description8) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value8) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!description9) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value9) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!description10) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!value10) {
      return new NextResponse("Value is required", { status: 400 });
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

    const specifications = await prismadb.specifications.create({
      data: { name,
        description, value,description2, value2,
      description3, value3,description4, value4,
      description5, value5,description6, value6,
      description7, value7,description8, value8,
      description9, value9,description10, value10,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(specifications);
  } catch (error) {
    console.log('[specifications_POST]', error);
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

    const specifications = await prismadb.specifications.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(specifications);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

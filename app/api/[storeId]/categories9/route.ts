import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { CategoryType, UserRole } from '@prisma/client';
import { currentUser } from '@/lib/auth';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY9;
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { name,  } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: "Name is required!" }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
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
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    const category = await prismadb.category.create({
      data: {
        name,
        storeId: params.storeId,
        categoryType:categoryType
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post categories9." }),
      { status: 500 }
    );
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY9;
  try {
   if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const category = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
        categoryType:categoryType
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get categories9." }),
      { status: 500 }
    );
  }
};

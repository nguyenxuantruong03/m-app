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

    const { name, value } = body;

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

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: "Color is required!" }),
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

    const category = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post color." }),
      { status: 500 }
    );
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const category = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get color." }),
      { status: 500 }
    );
  }
};

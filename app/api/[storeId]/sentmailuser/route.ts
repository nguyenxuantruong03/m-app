import { NextResponse } from 'next/server';
import { currentUser } from "@/lib/auth";

import prismadb from '@/lib/prismadb';
import { UserRole } from '@prisma/client';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();


    const body = await req.json();

    const { subject, description,createAt } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!subject || !description) {
      return new NextResponse("Invalid Error", { status: 400 });
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

    const sentEmailUser = await prismadb.sentEmailUser.create({
      data: {
        subject,
        description,
        userId: userId?.id || "",
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(sentEmailUser);
  } catch (error) {
    console.log('[SENTEMAILUSER_POST]', error);
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

    const sentEmailUsers = await prismadb.sentEmailUser.findMany({
      where: {
        storeId: params.storeId
      },
      include:{
        user: true
      },
      orderBy:{
        createdAt: 'desc'
      }
    });

  
    return NextResponse.json(sentEmailUsers);
  } catch (error) {
    console.log('[SENTEMAILUSER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { CategoryType, UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { category1Id: string } }
) {
  const categoryType = CategoryType.CATEGORY1;
  try {
    if (!params.category1Id) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.category1Id,
        categoryType:categoryType
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { category1Id: string, storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY1;
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.category1Id) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const category = await prismadb.category.delete({
      where: {
        id: params.category1Id,
        categoryType:categoryType
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { category1Id: string, storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY1;
  try {   
    const userId = await currentUser();

    const body = await req.json();
    
    const { name,  } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

   

    if (!params.category1Id) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const category = await prismadb.category.update({
      where: {
        id: params.category1Id,
        categoryType:categoryType
      },
      data: {
        name,
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

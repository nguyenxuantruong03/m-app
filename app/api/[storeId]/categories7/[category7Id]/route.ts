import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { CategoryType, UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { category7Id: string } }
) {
  const categoryType = CategoryType.CATEGORY7;
  try {
    if (!params.category7Id) {
      return new NextResponse(
        JSON.stringify({ error: "Category7 id is required!" }),
        { status: 400 }
      );
    }


    const category = await prismadb.category.findUnique({
      where: {
        id: params.category7Id,
        categoryType:categoryType
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get categories7." }),
      { status: 500 }
    );
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { category7Id: string, storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY7;
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.category7Id) {
      return new NextResponse(
        JSON.stringify({ error: "Category7 id is required!" }),
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

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
        { status: 403 }
      );
    }

    const category = await prismadb.category.delete({
      where: {
        id: params.category7Id,
        categoryType:categoryType
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete categories7." }),
      { status: 500 }
    );
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { category7Id: string, storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY7;
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

    if (!params.category7Id) {
      return new NextResponse(
        JSON.stringify({ error: "Category7 id is required!" }),
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

    const category = await prismadb.category.update({
      where: {
        id: params.category7Id,
        categoryType:categoryType
      },
      data: {
        name,
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch categories7." }),
      { status: 500 }
    );
  }
};

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { CategoryType, UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const categoryType = CategoryType.CATEGORY;
  try {
    if (!params.categoryId) {
      return new NextResponse(
        JSON.stringify({ error: "Category id is required!" }),
        { status: 400 }
      );
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
        categoryType: categoryType,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get categories." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY;
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.categoryId) {
      return new NextResponse(
        JSON.stringify({ error: "Category id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
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
        id: params.categoryId,
        categoryType: categoryType,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete categories." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY;
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { name } = body;

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

    if (!params.categoryId) {
      return new NextResponse(
        JSON.stringify({ error: "Category id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
        categoryType: categoryType,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch categories." }),
      { status: 500 }
    );
  }
}

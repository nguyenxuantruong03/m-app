import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { CategoryType, UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { category8Id: string } }
) {
  const categoryType = CategoryType.CATEGORY8;
  try {
    if (!params.category8Id) {
      return new NextResponse(
        JSON.stringify({ error: "Category8 id is required!" }),
        { status: 400 }
      );
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.category8Id,
        categoryType: categoryType,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get categories8." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { category8Id: string; storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY8;
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.category8Id) {
      return new NextResponse(
        JSON.stringify({ error: "Category8 id is required!" }),
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
        id: params.category8Id,
        categoryType: categoryType,
      },
    });

    const sentCategory = {
      name: category?.name,
      CategoryType: category.categoryType,
    };

    // Log sự thay đổi của sentVeirifi
    const changes = [
      `DeleteName: ${sentCategory.name}, CategoryType: ${sentCategory.CategoryType}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETESƠN-CATEGORY",
        delete: changes,
        user: userId?.email || "",
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete categories8." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { category8Id: string; storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY8;
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
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
    }

    if (!params.category8Id) {
      return new NextResponse(
        JSON.stringify({ error: "Category8 id is required!" }),
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

    const existingCategory = await prismadb.category.findUnique({
      where: {
        id: params.category8Id,
        categoryType: categoryType,
      },
    });

    const category = await prismadb.category.update({
      where: {
        id: params.category8Id,
        categoryType: categoryType,
      },
      data: {
        name,
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: { [key: string]: { oldValue: any; newValue: any } } = {};
    for (const key in existingCategory) {
      if (
        existingCategory.hasOwnProperty(key) &&
        category.hasOwnProperty(key)
      ) {
        if (
          existingCategory[key as keyof typeof existingCategory] !==
          category[key as keyof typeof category]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingCategory[key as keyof typeof existingCategory],
              newValue: category[key as keyof typeof category],
            };
          }
        }
      }
    }

    //Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
    const oldChanges = Object.keys(changes).map((key) => {
      return `${key}: { Old: '${changes[key].oldValue}'}`;
    });
    const newChanges = Object.keys(changes).map((key) => {
      return `${key}: { New: '${changes[key].newValue}'}`;
    });

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        oldChange: oldChanges,
        newChange: newChanges,
        type: "UPDATESƠN-CATEGORY",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch categories8." }),
      { status: 500 }
    );
  }
}

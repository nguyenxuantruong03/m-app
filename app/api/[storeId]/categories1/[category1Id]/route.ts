import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { CategoryType, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

type CategoryValue = string | CategoryType | Date | undefined;

interface ChangeRecord {
  oldValue: CategoryValue;
  newValue: CategoryValue;
}

export async function GET(
  req: Request,
  { params }: { params: { category1Id: string } }
) {
  const categoryType = CategoryType.CATEGORY1;
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!params.category1Id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.category.categoryId") }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.category1Id,
        categoryType: categoryType,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.category.intternalErrorGetCategory") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { category1Id: string; storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY1;
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!params.category1Id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.category.categoryId") }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    const category = await prismadb.category.delete({
      where: {
        id: params.category1Id,
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
        type: "DELETEQUẠT-CATEGORY",
        delete: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.category.intternalErrorDeleteCategory") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { category1Id: string; storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY1;
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();
    const { name } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.name") }),
        {
          status: 400,
        }
      );
    }

    if (!params.category1Id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.category.categoryId") }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    const existingCategory = await prismadb.category.findUnique({
      where: {
        id: params.category1Id,
        categoryType: categoryType,
      },
    });

    // Kiểm tra nếu không tìm thấy category
    if (!existingCategory) {
      return new NextResponse(JSON.stringify({ error: t("toastError.category.categoryNotFound") }), {
        status: 404,
      });
    }

    // Kiểm tra xem tên mới có trùng với tên của bất kỳ category nào ngoại trừ category hiện tại không
    const existingCategoryWithName = await prismadb.category.findFirst({
      where: {
        name,
        categoryType: categoryType,
        NOT: {
          id: params.category1Id,
        },
      },
    });

    if (existingCategoryWithName) {
      return new NextResponse(
        JSON.stringify({
          error:
          t("toastError.category.categoryNameAlready"),
        }),
        { status: 400 }
      );
    }

    const category = await prismadb.category.update({
      where: {
        id: params.category1Id,
        categoryType: categoryType,
      },
      data: {
        name,
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
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
        type: "UPDATEQUẠT-CATEGORY",
        user: user?.email || "",
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.category.intternalErrorPatchCategory") }),
      { status: 500 }
    );
  }
}

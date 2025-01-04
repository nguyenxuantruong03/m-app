import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { CategoryType, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY10;
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
      return new NextResponse(JSON.stringify({ error: t("toastError.name") }), {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    // Kiểm tra xem có danh mục nào đã tồn tại với tên và categoryType giống nhau trong store không
    const existingCategory = await prismadb.category.findFirst({
      where: {
        name,
        categoryType,
        storeId: params.storeId,
      },
    });

    if (existingCategory) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.categoryAlreadyExists") }),
        { status: 400 }
      );
    }

    const category = await prismadb.category.create({
      data: {
        name,
        categoryType: categoryType,
        storeId: params.storeId,
      },
    });

    const sentCategory = {
      name: category?.name,
      CategoryType: category.categoryType,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentCategory.name}, TypeCategory: ${sentCategory.CategoryType}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATEBÓNGĐÈN-CATEGORY",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.category.intternalErrorPostCategory") }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  const categoryType = CategoryType.CATEGORY10;

  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
        categoryType: categoryType,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.category.intternalErrorGetCategory") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();
    const categoryType = CategoryType.CATEGORY10;

    const { ids } = body;

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

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.idsArrayNotEmpty") }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    // Fetch all cartegories to delete, including their images
    const CategoryToDelete = await prismadb.category.findMany({
      where: {
        categoryType: categoryType,
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = CategoryToDelete.map((category) => ({
      name: category.name,
    }));

    // Delete all the cartegories in one operation
    await prismadb.category.deleteMany({
      where: {
        categoryType: categoryType,
        id: {
          in: ids,
        },
      },
    });

    // Log the changes in a single database operation
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changesArray.map((change) => `DeleteName: ${change.name}`),
        type: "DELETEMANYBÓNGĐÈN-CATEGORY",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: t("toastSuccess.deletionSuccess") });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.category.intternalErrorDeleteCategory") }),
      { status: 500 }
    );
  }
}

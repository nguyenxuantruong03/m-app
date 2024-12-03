import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { CategoryType, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { translateText } from "@/translate/translate-client";
import { translateCategoriesDelete, translateCategoriesGet, translateCategoriesPost } from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const categoryType = CategoryType.CATEGORY;
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const categoriesPostMessage = translateCategoriesPost(LanguageToUse)

  try {
    const body = await req.json();
    const { name } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: categoriesPostMessage.name1 }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: categoriesPostMessage.name2 }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: categoriesPostMessage.name3 }), {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: categoriesPostMessage.name4 }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: categoriesPostMessage.name5 }),
        { status: 405 }
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
        type: "CREATEPIN-CATEGORY",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: categoriesPostMessage.name6 }),
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
  const LanguageToUse = user?.language || "vi";
  const categoriesGetMessage = translateCategoriesGet(LanguageToUse)

  const categoryType = CategoryType.CATEGORY;

  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language

  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: categoriesGetMessage.name1 }),
        { status: 400 }
      );
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
        categoryType: categoryType,
      },
    });

    const translations = await Promise.all(
      categories.map(async (category) => {
        try {
          // Chỉ dịch name
          const translatedName = await translateText(category.name, language);

          return {
            ...category,
            name: translatedName,
          };
        } catch (error) {
          return category; // Trả về dữ liệu gốc nếu có lỗi
        }
      })
    );

    return NextResponse.json(translations);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: categoriesGetMessage.name2 }),
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
  const LanguageToUse = user?.language || "vi";
  const categoriesDeleteMessage = translateCategoriesDelete(LanguageToUse)

  try {
    const body = await req.json();
    const categoryType = CategoryType.CATEGORY;

    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: categoriesDeleteMessage.name1 }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: categoriesDeleteMessage.name2 }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: categoriesDeleteMessage.name3 }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: categoriesDeleteMessage.name4 }),
        { status: 405 }
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
        type: "DELETEMANYPIN-CATEGORY",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: categoriesDeleteMessage.name5 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: categoriesDeleteMessage.name6 }),
      { status: 500 }
    );
  }
}

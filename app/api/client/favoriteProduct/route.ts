import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  const body = await req.json();
  const { id, productId, userId, selectedSize, selectedColor, productName } =
    body;

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.userNotFound") }),
      { status: 403 }
    );
  }

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.favoriteIdNotFound") }),
      { status: 403 }
    );
  }

  if (!productId) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.productIdRequired") }),
      { status: 400 }
    );
  }

  if (!productName) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.productNameRequired") }),
      { status: 400 }
    );
  }

  if (!selectedSize) {
    return new NextResponse(JSON.stringify({ error: t("toastError.sizeRequired") }), {
      status: 400,
    });
  }

  if (!selectedColor) {
    return new NextResponse(JSON.stringify({ error: t("toastError.colorRequired") }), {
      status: 400,
    });
  }

  try {
    const favoriteProduct = await prismadb.favoriteProduct.create({
      data: {
        id: id,
        productName,
        productId,
        userId,
        selectedSize,
        selectedColor,
      },
    });

    return NextResponse.json(favoriteProduct);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorFavoriteProductPost") }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  const body = await req.json();
  const { id, userId } = body;

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.userNotFound") }),
      { status: 403 }
    );
  }

  if (!id) {
    return new NextResponse(JSON.stringify({ error: t("toastError.idNotFound") }), {
      status: 403,
    });
  }

  try {
    const favoriteProduct = await prismadb.favoriteProduct.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return NextResponse.json(favoriteProduct);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorFavoriteProductDeleteMany") }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || ""; // Mặc định là "vi" nếu không có language

    const favoriteProducts = await prismadb.favoriteProduct.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        product: {
          include: {
            images: true,
            comment: true,
            productdetail: {
              include: {
                size1: true,
                color1: true,
                size2: true,
                color2: true,
                size3: true,
                color3: true,
                size4: true,
                color4: true,
                size5: true,
                color5: true,
                category: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(favoriteProducts);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorFavoriteProductGet") }),
      { status: 500 }
    );
  }
}

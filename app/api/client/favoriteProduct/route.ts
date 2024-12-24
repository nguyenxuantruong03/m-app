import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { translateFavoriteProductDeleteMany, translateFavoriteProductGet, translateFavoriteProductPost } from "@/translate/translate-api";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteProductPostMessage = translateFavoriteProductPost(LanguageToUse)

  const body = await req.json();
  const { id, productId, userId, selectedSize, selectedColor, productName } =
    body;

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductPostMessage.userIdNotFound }),
      { status: 403 }
    );
  }

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductPostMessage.favoriteIdNotFound }),
      { status: 403 }
    );
  }

  if (!productId) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductPostMessage.productIdRequired }),
      { status: 400 }
    );
  }

  if (!productName) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductPostMessage.productNameRequired }),
      { status: 400 }
    );
  }

  if (!selectedSize) {
    return new NextResponse(JSON.stringify({ error: favoriteProductPostMessage.sizeRequired }), {
      status: 400,
    });
  }

  if (!selectedColor) {
    return new NextResponse(JSON.stringify({ error: favoriteProductPostMessage.colorRequired }), {
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
      JSON.stringify({ error: favoriteProductPostMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteProductDeleteManyMessage = translateFavoriteProductDeleteMany(LanguageToUse)

  const body = await req.json();
  const { id, userId } = body;

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductDeleteManyMessage.userIdNotFound }),
      { status: 403 }
    );
  }

  if (!id) {
    return new NextResponse(JSON.stringify({ error: favoriteProductDeleteManyMessage.idNotFound }), {
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
      JSON.stringify({ error: favoriteProductDeleteManyMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteProductGetMessage = translateFavoriteProductGet(LanguageToUse)
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
      JSON.stringify({ error: favoriteProductGetMessage }),
      { status: 500 }
    );
  }
}

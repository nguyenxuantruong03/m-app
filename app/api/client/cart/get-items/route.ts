import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { translateCartItemGet } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const cartItemGetMessage = translateCartItemGet(LanguageToUse)
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || ""; // Mặc định là "vi" nếu không có language

    const carts = await prismadb.cartItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        product: {
          include: {
            images: true,
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
    
    return NextResponse.json(carts);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: cartItemGetMessage}),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { translateProductGetAll } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productGetAllMessage = translateProductGetAll(LanguageToUse);

  try {
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("isFeatured");

    // Fetch danh sách sản phẩm từ Prisma
    const products = await prismadb.product.findMany({
      where: {
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        comment: true,
        productdetail: {
          include: {
            category: true,
            color1: true,
            color2: true,
            color3: true,
            color4: true,
            color5: true,
            size1: true,
            size2: true,
            size3: true,
            size4: true,
            size5: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: productGetAllMessage }),
      { status: 500 }
    );
  }
}

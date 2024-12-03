import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { translateText } from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import { translateProductSearchGet } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productSearchGetMessage = translateProductSearchGet(LanguageToUse)
  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language
    const value = searchParams.get("value") || ""; // Mặc định là "vi" nếu không có language

    // Lấy tất cả sản phẩm trong cơ sở dữ liệu (không áp dụng lọc)
    const allProducts = await prismadb.product.findMany({
      select: {
        id: true,
        name: true,
        heading: true,
        description: true,
        images: true,
        productType: true,
        sold: true,
        productdetail: {
          select: {
            price1: true,
            percentpromotion1: true,
          },
        },
      },
    });

    // Dịch các trường cần thiết trước khi tìm kiếm
    const translatedProducts = await Promise.all(
      allProducts.map(async (product) => ({
        ...product,
        name: await translateText(product.name, language || "vi"),
        heading: await translateText(product.heading, language || "vi"),
        description: await translateText(product.description, language || "vi"),
      }))
    );

    // Tìm kiếm trong các sản phẩm đã được dịch
    const searchResults = translatedProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.heading.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
      );
    });

    return NextResponse.json(searchResults);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productSearchGetMessage }),
      { status: 500 }
    );
  }
}

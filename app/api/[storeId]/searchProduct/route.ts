import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { translateText } from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import { translateProductSearchGet } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productSearchGetMessage = translateProductSearchGet(LanguageToUse);
  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language");
    const value = searchParams.get("value");

    if (value) {
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
        allProducts.map(async (product) => {
          // Hàm dịch với kiểm tra ngôn ngữ
          const translateField = async (
            field: any,
            language: string
          ) => {
            if (language === "vi") return field; // Không dịch nếu ngôn ngữ là "vi"
            const translated = await translateText(field || "", language);
            return translated || field; // Trả về bản dịch nếu có, ngược lại giữ lại giá trị gốc
          };

          return {
            ...product,
            name: await translateField(product.name, language || "vi"),
            heading: await translateField(product.heading, language || "vi"),
            description: await translateField(
              product.description,
              language || "vi"
            ),
          };
        })
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
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productSearchGetMessage }),
      { status: 500 }
    );
  }
}

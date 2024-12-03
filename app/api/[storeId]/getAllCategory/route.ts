import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { translateText } from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import { translateCategoryGetAll } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const categoryGetAllMessage = translateCategoryGetAll(LanguageToUse);

  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language

    const categories = await prismadb.category.findMany();

    const translations = await Promise.all(
      categories.map(async (category) => {
        try {
          // Dịch `name` và `value` bằng hàm `translateText`
          const translatedName = await translateText(category.name, language);

          return {
            ...category,
            name: translatedName,
          };
        } catch (error) {
          return category; // Trả về dữ liệu gốc nếu lỗi
        }
      })
    );

    return NextResponse.json(translations);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: categoryGetAllMessage }),
      { status: 500 }
    );
  }
}

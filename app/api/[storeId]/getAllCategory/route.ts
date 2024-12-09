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
          // Chỉ dịch name nếu ngôn ngữ không phải "vi"
          let translatedName = category.name;
    
          if (language !== "vi") {
            translatedName = await translateText(category.name, language);
    
            // Nếu không có dữ liệu dịch, giữ lại name gốc
            if (!translatedName) {
              translatedName = category.name;
            }
          }
    
          return {
            ...category,
            name: translatedName,
          };
        } catch (error) {
          // Nếu có lỗi trong quá trình dịch, trả về dữ liệu gốc
          return category;
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

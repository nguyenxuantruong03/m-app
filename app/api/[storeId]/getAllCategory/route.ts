import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { translateCategoryGetAll } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const categoryGetAllMessage = translateCategoryGetAll(LanguageToUse);

  try {
    const categories = await prismadb.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: categoryGetAllMessage }),
      { status: 500 }
    );
  }
}

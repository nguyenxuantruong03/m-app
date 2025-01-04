import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    const categories = await prismadb.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.category.intternalErrorGetCategory") }),
      { status: 500 }
    );
  }
}

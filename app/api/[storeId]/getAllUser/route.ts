import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const user = await currentUser();
    //language
    const languageToUse = user?.language || "vi";
    let messages;
      messages = (await import(`@/messages/${languageToUse}.json`)).default;
      const t = createTranslator({ locale: languageToUse, messages });
    try {
      const settinguser = await prismadb.user.findMany({
        include: {
          imageCredential: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
  
      return NextResponse.json(settinguser);
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: t("toastError.user.internalErrorGetUser") }), {
        status: 500,
      });
    }
  }
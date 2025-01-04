import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userId = await currentUser();
  //language
  const languageToUse = userId?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

    try {
      const body = await req.json();
  
      const { language } = body;
  
      if (!userId) {
        return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
          status: 403,
        });
      }
  
      if (!language) {
        return new NextResponse(JSON.stringify({ error: t("toastError.languageRequired") }), {
          status: 400,
        });
      }

      const user = await prismadb.user.update({
        where:{
            id: userId?.id
        },
        data: {
          language,
        },
      });
  
      return NextResponse.json(user);
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: t("toastError.internalErrorUpdateLanguage") }), {
        status: 500,
      });
    }
  }
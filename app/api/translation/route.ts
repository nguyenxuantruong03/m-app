import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateLanguageUpdate } from "@/translate/translate-api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userId = await currentUser();
  //language
  const LanguageToUse = userId?.language || "vi";
  const languageUpdateMessage = translateLanguageUpdate(LanguageToUse)
    try {
      const body = await req.json();
  
      const { language } = body;
  
      if (!userId) {
        return new NextResponse(JSON.stringify({ error: languageUpdateMessage.userIdNotFound }), {
          status: 403,
        });
      }
  
      if (!language) {
        return new NextResponse(JSON.stringify({ error: languageUpdateMessage.languageRequired }), {
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
      return new NextResponse(JSON.stringify({ error: languageUpdateMessage.internalErrorUpdateLanguage }), {
        status: 500,
      });
    }
  }
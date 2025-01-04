import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();

  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }
    
    const now = new Date();
    now.setHours(now.getHours() + 7);

    const ads = await prismadb.user.update({
      where: {
        id: user.id,
      },
      data: {
        isShowAds: true,
        TimeshowAds: now,
      },
    });
    return NextResponse.json(ads);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.systemError") }),
      { status: 500 }
    );
  }
}

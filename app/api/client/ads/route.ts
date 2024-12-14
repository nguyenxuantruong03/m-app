import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateAdsMessage } from "@/translate/translate-api";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();

  //language
  const LanguageToUse = user?.language || "vi";
  const billboardPostMessage = translateAdsMessage(LanguageToUse);
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: billboardPostMessage.userNotFound }),
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
      JSON.stringify({ error: billboardPostMessage.systemError }),
      { status: 500 }
    );
  }
}

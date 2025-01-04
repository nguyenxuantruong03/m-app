import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();
    const { userId, score } = body;

    const existingLeaderboard = await prismadb.leaderboard.findFirst({
      where: {
        userId: userId,
      },
    });

    let favoriteItemData;

    if (existingLeaderboard) {
      favoriteItemData = await prismadb.leaderboard.update({
        where: {
          id: existingLeaderboard.id,
        },
        data: {
          userId: userId,
          score: score,
        },
      });
    } else {
      favoriteItemData = await prismadb.leaderboard.create({
        data: {
          userId: userId,
          score: score,
        },
      });
    }

    return NextResponse.json(favoriteItemData);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorLeaderboardPost") }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const FavoriteItemData = await prismadb.leaderboard.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(FavoriteItemData);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorLeaderboardGet") }),
      { status: 500 }
    );
  }
}

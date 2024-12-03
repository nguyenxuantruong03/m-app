import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateLeaderboardGet, translateLeaderboardPost } from "@/translate/translate-api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const leaderboardPostMessage = translateLeaderboardPost(LanguageToUse);

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
      JSON.stringify({ error: leaderboardPostMessage }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const leaderboardGetMessage = translateLeaderboardGet(LanguageToUse);

  try {
    const FavoriteItemData = await prismadb.leaderboard.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(FavoriteItemData);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: leaderboardGetMessage }),
      { status: 500 }
    );
  }
}

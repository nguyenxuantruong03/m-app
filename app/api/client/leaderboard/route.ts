import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
      JSON.stringify({ error: "Internal error post favorite Product." }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const FavoriteItemData = await prismadb.leaderboard.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(FavoriteItemData);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get favorite Product." }),
      { status: 500 }
    );
  }
}

import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateDeleteManySelectItem } from "@/translate/translate-api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const deleteManySelectItemMessage =
    translateDeleteManySelectItem(LanguageToUse);
  try {
    const body = await req.json();
    const { userId, ids } = body;

    if (!ids) {
      return new NextResponse(
        JSON.stringify({ error: deleteManySelectItemMessage.idsNotFound }),
        { status: 400 }
      );
    }

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: deleteManySelectItemMessage.userIdNotFound }),
        { status: 400 }
      );
    }

    const removeSelectItem = await prismadb.cartItem.deleteMany({
      where: {
        userId,
        id: { in: ids },
      },
    });

    return NextResponse.json(removeSelectItem);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: deleteManySelectItemMessage.internalErrorDelete,
      }),
      { status: 500 }
    );
  }
}

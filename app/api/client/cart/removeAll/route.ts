import { currentUser } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { translateCartItemDeleteMany } from '@/translate/translate-api';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const cartItemDeleteManyMessage = translateCartItemDeleteMany(LanguageToUse)

  try {
    const body = await req.json();
    const { userId } = body;

    if(!userId){
        return new NextResponse(
        JSON.stringify({ error: cartItemDeleteManyMessage.userIdNotFound }),
        { status: 403 }
      );
    }

  const removeAll = await prismadb.cartItem.deleteMany({
      where: { userId },
    });

    return NextResponse.json(removeAll);
  } catch(error) {
    return new NextResponse(
        JSON.stringify({ error: cartItemDeleteManyMessage.internalErrorDeleteMany }),
        { status: 500 }
      );
  }
}

import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateCartItemDelete } from "@/translate/translate-api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const cartItemDeleteMessage = translateCartItemDelete(LanguageToUse)
  try {
    const body = await req.json();
    const { id } = body;

    if(!id){
      return new NextResponse(
        JSON.stringify({ error: cartItemDeleteMessage.idNotFound }),
        { status: 500 }
      );
    }
    const removeItem = await prismadb.cartItem.delete({
      where: { id: id  },
    })

    return NextResponse.json(removeItem);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: cartItemDeleteMessage.internalErrorDelete }),
      { status: 500 }
    );
  }
}

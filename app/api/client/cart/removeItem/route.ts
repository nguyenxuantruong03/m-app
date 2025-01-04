import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { id } = body;

    if(!id){
      return new NextResponse(
        JSON.stringify({ error: t("toastError.idNotFound") }),
        { status: 500 }
      );
    }
    const removeItem = await prismadb.cartItem.delete({
      where: { id: id  },
    })

    return NextResponse.json(removeItem);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorCartItemDelete") }),
      { status: 500 }
    );
  }
}

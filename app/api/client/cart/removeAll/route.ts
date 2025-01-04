import { currentUser } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { createTranslator } from 'next-intl';
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
    const { userId } = body;

    if(!userId){
        return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound")}),
        { status: 403 }
      );
    }

  const removeAll = await prismadb.cartItem.deleteMany({
      where: { userId },
    });

    return NextResponse.json(removeAll);
  } catch(error) {
    return new NextResponse(
        JSON.stringify({ error: t("toastError.internalErrorCartItemDeleteMany") }),
        { status: 500 }
      );
  }
}

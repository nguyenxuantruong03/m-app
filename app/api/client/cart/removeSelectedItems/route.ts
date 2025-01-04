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
    const { userId, ids } = body;

    if (!ids) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.idsArrayNotEmpty") }),
        { status: 400 }
      );
    }

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
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
        error: t("toastError.internalErrorDeleteManySelectItem"),
      }),
      { status: 500 }
    );
  }
}

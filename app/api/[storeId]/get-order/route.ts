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
    const { userId } = await req.json();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    const order = await prismadb.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderItem: {
          include: {
            product: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.order.internalErrorGetOrder") }),
      { status: 403 }
    );
  }
}

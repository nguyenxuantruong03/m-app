import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateOrderGet } from "@/translate/translate-api";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const orderGetMessage = translateOrderGet(LanguageToUse);

  try {
    const { userId } = await req.json();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: orderGetMessage.userIdNotFound }),
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
      JSON.stringify({ error: orderGetMessage.internalError }),
      { status: 403 }
    );
  }
}

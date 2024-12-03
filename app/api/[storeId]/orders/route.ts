import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateOrders } from "@/translate/translate-api";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const orderMessage = translateOrders(LanguageToUse);
  try {
    const body = await req.json();

    const { orderId } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: orderMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: StatusOrder.Soan_hang,
        userIdStaff: user?.id || "",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: orderMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const orderMessage = translateOrders(LanguageToUse);
  try {
    const user = await currentUser();
    const body = await req.json();

    const { orderId } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: orderMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: StatusOrder.Cho_lay_hang,
        userIdStaff: user?.id || "",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: orderMessage.internalError }),
      { status: 500 }
    );
  }
}

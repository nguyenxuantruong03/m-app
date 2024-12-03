import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateOrderPreparation, translatePickupStore } from "@/translate/translate-api";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const pickupStoreMessage = translatePickupStore(LanguageToUse)

  try {
    const body = await req.json();

    const { orderId } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: pickupStoreMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: StatusOrder.Soan_hang_nhan_tai_cua_hang,
        userIdStaff: user?.id || "",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: pickupStoreMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const orderPreparationMessage = translateOrderPreparation(LanguageToUse)
  try {
    const body = await req.json();

    const { orderId } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: orderPreparationMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: StatusOrder.Da_soan_hang_xong,
        userIdStaff: user?.id || "",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: orderPreparationMessage.internalError }),
      { status: 500 }
    );
  }
}


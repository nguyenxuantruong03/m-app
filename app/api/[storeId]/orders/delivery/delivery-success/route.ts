import { currentUser } from "@/lib/auth";
import { sendDeliverySuccess } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { translateDeliveryOrderUpdate } from "@/translate/translate-api";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const deliveryOrderUpdateMessage =
    translateDeliveryOrderUpdate(LanguageToUse);
  try {
    const body = await req.json();

    const { orderId, imageCustomer,locationLatEnd,locationLngEnd } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: deliveryOrderUpdateMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (!imageCustomer) {
      return new NextResponse(
        JSON.stringify({ error: deliveryOrderUpdateMessage.addDeliveryImage }),
        { status: 404 }
      );
    }

    const existingOrder = await prismadb.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!existingOrder) {
      return new NextResponse(
        JSON.stringify({ error: deliveryOrderUpdateMessage.orderNotFound }),
        { status: 404 }
      );
    }

    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        //Sử dụng debtShipper và receiveCash lặp lại ở đây vì debtShipper sẽ bị chỉnh sửa lại khi shipper đã đưa tiền cho cửa hàng
        debtShipper: !existingOrder.isPaid ? true : false,
        receiveCash: !existingOrder.isPaid ? true : false,
        status: StatusOrder.Da_giao,
        userIdShipper: user?.id || "",
        updatedAt: new Date(),
        locationLatEnd:locationLatEnd,
        locationLngEnd:locationLngEnd,
        imageCustomer: {
          createMany: {
            data: [...imageCustomer.map((image: { url: string }) => image)],
          },
        },
      },
      include:{
        user: true,
        orderItem: true
      }
    });

    await sendDeliverySuccess(order?.user?.email || "",order,LanguageToUse)

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: deliveryOrderUpdateMessage.internalError }),
      { status: 500 }
    );
  }
}

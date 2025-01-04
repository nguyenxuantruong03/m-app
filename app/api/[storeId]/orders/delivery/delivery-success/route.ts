import { currentUser } from "@/lib/auth";
import { sendDeliverySuccess } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { StatusOrder } from "@prisma/client";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();

    const { orderId, imageCustomer,locationLatEnd,locationLngEnd } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (!imageCustomer) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.order.delivery.addDeliveryImage") }),
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
        JSON.stringify({ error: t("toastError.order.orderNotFound") }),
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

    await sendDeliverySuccess(order?.user?.language, order?.user?.email || "",order)

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.order.delivery.internalErrorPatchDeliverySuccessOrder") }),
      { status: 500 }
    );
  }
}

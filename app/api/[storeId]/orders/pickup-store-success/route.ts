import { currentUser } from "@/lib/auth";
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
    const { orderId } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    const existingOrder = await prismadb.order.findUnique({
      where:{
        id: orderId
      }
    })

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
        receiveCash: !existingOrder.isPaid ? true : false,
        status: StatusOrder.Da_nhan_tai_cua_hang,
        userIdStaff: user?.id || "",
        updatedAt: new Date()
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.order.internalErrorPatchPickupStoreSuccess") }),
      { status: 500 }
    );
  }
}
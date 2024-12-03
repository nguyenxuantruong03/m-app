import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateOrderPickupSuccess } from "@/translate/translate-api";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const orderPickupStoreSuccessMessage = translateOrderPickupSuccess(LanguageToUse)

  try {
    const body = await req.json();
    const { orderId } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: orderPickupStoreSuccessMessage.userIdNotFound }),
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
        JSON.stringify({ error: orderPickupStoreSuccessMessage.orderNotFound }),
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
      JSON.stringify({ error: orderPickupStoreSuccessMessage.internalError }),
      { status: 500 }
    );
  }
}
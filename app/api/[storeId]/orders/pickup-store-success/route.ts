import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { orderId } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
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
        JSON.stringify({ error: "Order not found!" }),
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
        userIdStaff: userId?.id || "",
        updatedAt: new Date()
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch order." }),
      { status: 500 }
    );
  }
}
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateReturnProductReceiveOrderUpdate } from "@/translate/translate-api";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const returnProductReceiveOrderUpdateMessage = translateReturnProductReceiveOrderUpdate(LanguageToUse)
    try {
      const body = await req.json();
      const { orderId } = body;
  
      if (!user) {
        return new NextResponse(
          JSON.stringify({ error: returnProductReceiveOrderUpdateMessage.userIdNotFound }),
          { status: 403 }
        );
      }

      const order = await prismadb.order.update({
        where: {
          id: orderId,
        },
        data: {
          returnProduct: false,
          status: StatusOrder.Da_nhan_tra_hang,
          userIdShipper: user?.id || "",
          updatedAt: new Date()
        },
      });
  
      return NextResponse.json(order);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: returnProductReceiveOrderUpdateMessage.internalError }),
        { status: 500 }
      );
    }
  }
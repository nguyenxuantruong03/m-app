import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateDeliveryOrderCancel } from "@/translate/translate-api";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const deliveryOrderCancelMessage = translateDeliveryOrderCancel(LanguageToUse)
    try {
      const body = await req.json();
  
      const { orderId,value } = body;
  
      if (!user) {
        return new NextResponse(
          JSON.stringify({ error: deliveryOrderCancelMessage.userIdNotFound }),
          { status: 403 }
        );
      }

      if(!value){
        return new NextResponse(
            JSON.stringify({ error: deliveryOrderCancelMessage.cancelContentNotFound }),
            { status: 403 }
          );
      }

      const order = await prismadb.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: StatusOrder.Da_huy,
          statusOther: value,
          userIdShipper: user?.id || "",
        },
      });

      return NextResponse.json(order);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: deliveryOrderCancelMessage.internalError }),
        { status: 500 }
      );
    }
  }
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateRedeliveryOrder } from "@/translate/translate-api";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const redeliveryOrderMessage = translateRedeliveryOrder(LanguageToUse)

    try {
      const body = await req.json();
  
      const { orderId } = body;
  
      if (!user) {
        return new NextResponse(
          JSON.stringify({ error: redeliveryOrderMessage.userIdNotFound }),
          { status: 403 }
        );
      }
  
      const order = await prismadb.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: StatusOrder.Giao_lai_hang,
          userIdShipper: user?.id || "",
        },
      });
  
      return NextResponse.json(order);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: redeliveryOrderMessage.internalError }),
        { status: 500 }
      );
    }
  }
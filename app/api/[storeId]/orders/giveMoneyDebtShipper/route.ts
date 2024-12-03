import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateReturnMoneyFromShipperOrder } from "@/translate/translate-api";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const returnMoneyFromShipperOrderMessage = translateReturnMoneyFromShipperOrder(LanguageToUse)

    try {
      const body = await req.json();
  
      const { orderId } = body;
  
      if (!user) {
        return new NextResponse(
          JSON.stringify({ error: returnMoneyFromShipperOrderMessage.userIdNotFound }),
          { status: 403 }
        );
      }
  
      const order = await prismadb.order.update({
        where: {
          id: orderId,
        },
        data: {
          debtShipper : false,
          userIdRecieveDebt: user?.id || "",
        },
      });
  
      return NextResponse.json(order);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: returnMoneyFromShipperOrderMessage.internalError }),
        { status: 500 }
      );
    }
  }
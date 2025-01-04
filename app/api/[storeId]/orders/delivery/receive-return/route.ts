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
  
      const order = await prismadb.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: StatusOrder.Shipper_dang_den,
          userIdShipper: user?.id || "",
        },
      });
  
      return NextResponse.json(order);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.order.delivery.internalErrorPatchReceiveReturnOrder") }),
        { status: 500 }
      );
    }
  }
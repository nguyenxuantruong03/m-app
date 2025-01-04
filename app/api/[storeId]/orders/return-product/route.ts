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
    const { orderId, imagereturnProduct, description } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (!imagereturnProduct) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.order.addReturnImage") }),
        { status: 404 }
      );
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.order.addReturnContent") }),
        { status: 404 }
      );
    }

    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        returnProduct: true,
        status: StatusOrder.Tra_hang,
        userIdStaff: user?.id || "",
        destiontionReturnProduct: description,
        imagereturnProduct: {
          createMany: {
            data: [
              ...imagereturnProduct.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.order.internalErrorPatchReturnProduct") }),
      { status: 500 }
    );
  }
}

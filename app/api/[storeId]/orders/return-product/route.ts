import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateReturnProduct } from "@/translate/translate-api";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const returnProductMessage = translateReturnProduct(LanguageToUse);
  try {
    const body = await req.json();
    const { orderId, imagereturnProduct, description } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: returnProductMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (!imagereturnProduct) {
      return new NextResponse(
        JSON.stringify({ error: returnProductMessage.addReturnImage }),
        { status: 404 }
      );
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: returnProductMessage.addReturnContent }),
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
      JSON.stringify({ error: returnProductMessage.internalError }),
      { status: 500 }
    );
  }
}

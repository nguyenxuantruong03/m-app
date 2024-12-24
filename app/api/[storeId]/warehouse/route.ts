import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { translateWareHouseGet } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const wareHouseGetMessage = translateWareHouseGet(LanguageToUse);
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: wareHouseGetMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    const orders = await prismadb.order.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        orderItem: {
          include: {
            product: {
              include: {
                images: true,
                productdetail: {
                  include: {
                    size1: true,
                    color1: true,
                    size2: true,
                    color2: true,
                    size3: true,
                    color3: true,
                    size4: true,
                    color4: true,
                    size5: true,
                    color5: true,
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const ordersWithShipper = await Promise.all(
      orders.map(async (order) => {
        const shipper = order.userIdShipper
          ? await prismadb.user.findUnique({
              where: { id: order.userIdShipper },
            })
          : null;

        return { ...order, shipper };
      })
    );
    
    return NextResponse.json(ordersWithShipper);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: wareHouseGetMessage.internalError }),
      { status: 500 }
    );
  }
}

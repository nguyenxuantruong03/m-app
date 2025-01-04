import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
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
      JSON.stringify({ error: t("toastError.warehouse.internalErrorGetWarehouse") }),
      { status: 500 }
    );
  }
}

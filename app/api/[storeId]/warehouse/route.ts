import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    const order = await prismadb.order.findMany({
      where: {
        userId: userId?.id,
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

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch order." }),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { id, timeSale, isSale } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    const product = await prismadb.product.update({
      where: {
        id: id,
      },
      data: {
        timeSale: timeSale,
        isSale: isSale,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch product sále." }),
      { status: 500 }
    );
  }
}

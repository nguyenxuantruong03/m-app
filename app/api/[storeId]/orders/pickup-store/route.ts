import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { orderId } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: StatusOrder.Soan_hang_nhan_tai_cua_hang,
        userIdStaff: userId?.id || "",
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

export async function PATCH(req: Request) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { orderId } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: StatusOrder.Da_soan_hang_xong,
        userIdStaff: userId?.id || "",
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


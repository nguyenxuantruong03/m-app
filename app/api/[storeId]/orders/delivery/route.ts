import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { StatusOrder } from "@prisma/client";
import { NextResponse } from "next/server";

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
          status: StatusOrder.Dang_giao,
          userIdShipper: userId?.id || "",
          updatedAt: new Date(),
        },
      });
  
      return NextResponse.json(order);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Internal error patch delivery order." }),
        { status: 500 }
      );
    }
  }
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { id } = body;
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (
      userId.role !== UserRole.ADMIN &&
      userId.role !== UserRole.STAFF &&
      userId.role !== UserRole.MARKETING
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền cập nhật product!" }),
        { status: 403 }
      );
    }

    const product = await prismadb.product.update({
      where: {
        id: id,
      },
      data: {
        timeSaleStart: null,
        timeSaleEnd: null,
        isSale: false,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch product sale." }),
      { status: 500 }
    );
  }
}

import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateProductSalePatch } from "@/translate/translate-api";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productSalatePatchMessage = translateProductSalePatch(LanguageToUse)
  try {
    const body = await req.json();

    const { id } = body;
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: productSalatePatchMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (
      user.role !== UserRole.ADMIN &&
      user.role !== UserRole.STAFF &&
      user.role !== UserRole.MARKETING
    ) {
      return new NextResponse(
        JSON.stringify({ error: productSalatePatchMessage.permissionDenied }),
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
      JSON.stringify({ error: productSalatePatchMessage.internalError }),
      { status: 500 }
    );
  }
}

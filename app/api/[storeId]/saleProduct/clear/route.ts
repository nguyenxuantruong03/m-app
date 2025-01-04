import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();

    const { id } = body;
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (
      user.role !== UserRole.ADMIN &&
      user.role !== UserRole.STAFF &&
      user.role !== UserRole.MARKETING
    ) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
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
      JSON.stringify({ error: t("toastError.saleproduct.internalErrorPatchSaleProduct") }),
      { status: 500 }
    );
  }
}

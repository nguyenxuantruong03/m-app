import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { id, timeSaleStart, timeSaleEnd, isSale } = body;

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

    const timeSaleStartProduct = new Date(timeSaleStart!);
    timeSaleStartProduct.setHours(timeSaleStartProduct.getHours() + 7);
    
    const timeSaleEndProduct = new Date(timeSaleEnd!);
    timeSaleEndProduct.setHours(timeSaleEndProduct.getHours() + 7);    

    const product = await prismadb.product.update({
      where: {
        id: id,
      },
      data: {
        timeSaleStart: timeSaleStartProduct,
        timeSaleEnd: timeSaleEndProduct,
        isSale: isSale,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.saleproduct.internalErrorPatchSaleProduct") }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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

    // Retrieve all products with timeSaleStart and timeSaleEnd defined
    const productsToUpdate = await prismadb.product.findMany({
      where: {
        timeSaleStart: {
          not: null, // Ensure timeSaleStart is not null
        },
        timeSaleEnd: {
          not: null, // Ensure timeSaleEnd is not null
        },
        isSale: {
          not: true,
        },
      },
    });

    // Update isSale to true for each product found
    const updatedProducts = await Promise.all(
      productsToUpdate.map((product) =>
        prismadb.product.update({
          where: {
            id: product.id,
          },
          data: {
            isSale: true,
          },
        })
      )
    );

    return NextResponse.json(updatedProducts);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new NextResponse(
      JSON.stringify({ error: t("toastError.saleproduct.internalErrorPatchSaleProduct") }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
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

    // Retrieve all products with timeSaleStart and timeSaleEnd defined
    const productsToUpdate = await prismadb.product.findMany({
      where: {
        timeSaleStart: {
          not: null, // Ensure timeSaleStart is not null
        },
        timeSaleEnd: {
          not: null, // Ensure timeSaleEnd is not null
        },
        isSale: {
          not: false,
        },
      },
    });

    // Update isSale to true for each product found
    const updatedProducts = await Promise.all(
      productsToUpdate.map((product) =>
        prismadb.product.update({
          where: {
            id: product.id,
          },
          data: {
            isSale: false,
          },
        })
      )
    );

    return NextResponse.json(updatedProducts);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new NextResponse(
      JSON.stringify({ error: t("toastError.saleproduct.internalErrorPatchSaleProduct") }),
      { status: 500 }
    );
  }
}

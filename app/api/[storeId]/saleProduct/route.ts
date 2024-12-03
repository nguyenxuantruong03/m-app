import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { translateProductSalePatch } from "@/translate/translate-api";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productSalatePatchMessage = translateProductSalePatch(LanguageToUse)
  try {
    const body = await req.json();
    const { id, timeSaleStart, timeSaleEnd, isSale } = body;

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

    const timeSaleStartUTC = new Date(timeSaleStart!);
    const timeSaleEndUTC = new Date(timeSaleEnd!);

    // Thêm 7 tiếng vào thời gian UTC
    const timeSaleStartLocal = new Date(
      timeSaleStartUTC.getTime() + 7 * 60 * 60 * 1000
    );
    const timeSaleEndLocal = new Date(
      timeSaleEndUTC.getTime() + 7 * 60 * 60 * 1000
    );

    const product = await prismadb.product.update({
      where: {
        id: id,
      },
      data: {
        timeSaleStart: timeSaleStartLocal,
        timeSaleEnd: timeSaleEndLocal,
        isSale: isSale,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productSalatePatchMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productSalatePatchMessage = translateProductSalePatch(LanguageToUse)
  try {
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
      JSON.stringify({ error: productSalatePatchMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productSalatePatchMessage = translateProductSalePatch(LanguageToUse)
  try {
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
      JSON.stringify({ error: productSalatePatchMessage.internalError }),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function PATCH(req: Request) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { id, timeSaleStart, timeSaleEnd, isSale } = body;

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
      JSON.stringify({ error: "Internal error patch product sále." }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await currentUser();

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
      JSON.stringify({ error: "Internal error patch product sale." }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await currentUser();

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
      JSON.stringify({ error: "Internal error patch product sale." }),
      { status: 500 }
    );
  }
}
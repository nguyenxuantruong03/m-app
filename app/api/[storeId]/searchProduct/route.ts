import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { value } = body;

    const searchProduct = await prismadb.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: value,
            },
          },
          {
            heading: {
              contains: value,
            },
          },
          {
            description: {
              contains: value,
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        heading: true,
        description: true,
        images: true,
        productType: true,
        sold: true,
        productdetail: {
          select: {
            price1: true,
            percentpromotion1: true,
          },
        },
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
      take: 10,
    });

    return NextResponse.json(searchProduct);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get product." }),
      { status: 500 }
    );
  }
}

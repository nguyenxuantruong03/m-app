import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const value = searchParams.get("value") || "";

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
        productType: true,
        images:{
          select: {
            url: true
          }
        },
        productdetail: {
          select: {
            price1: true,
            percentpromotion1: true
          }
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

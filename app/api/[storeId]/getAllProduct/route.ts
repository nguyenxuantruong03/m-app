import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
  ) {
    try {
      const { searchParams } = new URL(req.url);
      const isFeatured = searchParams.get("isFeatured");
  
      const product = await prismadb.product.findMany({
        where: {
          isFeatured: isFeatured ? true : undefined,
          isArchived: false,
        },
        include: {
          images: true,
          imagesalientfeatures: true,
          comment: true,
          productdetail: {
            include: {
              category: true,
              color1: true,
              color2: true,
              color3: true,
              color4: true,
              color5: true,
              size1: true,
              size2: true,
              size3: true,
              size4: true,
              size5: true,
            }
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  
      return NextResponse.json(product);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Internal error get product." }),
        { status: 500 }
      );
    }
  }
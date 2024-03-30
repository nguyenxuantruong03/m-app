import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { ProductType, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const {
      name,
      heading,
      description,
      price,
      percentpromotion,
      isFeatured,
      isArchived,
      images,
      imagesalientfeatures,
      productdetailId
    } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: "Name is required!" }),
        { status: 400 }
      );
    }
    if (!heading) {
      return new NextResponse(
        JSON.stringify({ error: "Heading is required!" }),
        { status: 400 }
      );
    }
    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: "Description is required!" }),
        { status: 400 }
      );
    }
    if (!price) {
      return new NextResponse(
        JSON.stringify({ error: "Price is required!" }),
        { status: 400 }
      );
    }
    if (!percentpromotion) {
      return new NextResponse(
        JSON.stringify({ error: "Percentpromotion is required!" }),
        { status: 400 }
      );
    }
    if (!images || !images.length) {
      return new NextResponse(
        JSON.stringify({ error: "Images is required!" }),
        { status: 400 }
      );
    }
    if (!productdetailId) {
      return new NextResponse(
        JSON.stringify({ error: "ProductDetail is required!" }),
        { status: 400 }
      );
    }
    if (!imagesalientfeatures || !imagesalientfeatures.length) {
      return new NextResponse(
        JSON.stringify({ error: "Imagesalientfeatures is required!" }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const productDetail = await prismadb.productDetail.findFirst({
      where: {
        id: body.productdetailId,
      },
    });

    // Nếu productDetail không tồn tại, trả về thông báo lỗi
    if (!productDetail) {
      return new NextResponse(JSON.stringify({ error: "Hãy chọn lại ProductDetail!" }), { status: 404 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    const productType = ProductType.PRODUCT8;
    const product = await prismadb.product.create({
      data: {
        name,
        heading,
        description,
        productType:productType,
        price,
        percentpromotion,
        isFeatured,
        isArchived,
        productdetailId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        imagesalientfeatures: {
          createMany: {
            data: [
              ...imagesalientfeatures.map((image: { url: string }) => image),
            ],
          },
        },
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post product8." }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("isFeatured");
    const productdetailId = searchParams.get("productdetailId") || undefined;
    const productType = ProductType.PRODUCT8;
     if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const product = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        productType:productType,
        productdetailId
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        productdetail: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get product8." }),
      { status: 500 }
    );
  }
}

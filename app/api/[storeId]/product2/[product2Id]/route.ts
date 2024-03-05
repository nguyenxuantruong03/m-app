import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { ProductType, UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { product2Id: string } }
) {
  const productType = ProductType.PRODUCT2;
  try {
    if (!params.product2Id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        name: params.product2Id,
        productType: productType,
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        productdetail: true
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { product2Id: string; storeId: string } }
) {
  const productType = ProductType.PRODUCT2;
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.product2Id) {
      return new NextResponse("Product id is required", { status: 400 });
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
      return new NextResponse("Unauthorized", { status: 405 });
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Access denied. Only Admins can perform this action.", { status: 403 });
    }

    const product = await prismadb.product.delete({
      where: {
        id: params.product2Id,
        productType: productType,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { product2Id: string; storeId: string } }
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
      images,
      imagesalientfeatures,
      productdetailId,
      isFeatured,
      isArchived
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!heading) {
      return new NextResponse("Heading is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!productdetailId) {
      return new NextResponse("Product Detail is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!percentpromotion) {
      return new NextResponse("Percentpromotion is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Images is required", { status: 400 });
    }
    if (!imagesalientfeatures || !imagesalientfeatures.length) {
      return new NextResponse("Imagesalientfeatures Product is required", {
        status: 400,
      });
    }
    if (!params.product2Id) {
      return new NextResponse("Product id is required", { status: 400 });
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
      return new NextResponse("Unauthorized", { status: 405 });
    }
    const productType = ProductType.PRODUCT2;
    await prismadb.product.update({
      where: {
        name: params.product2Id,
        productType: productType,
      },
      data: {
        name,
        heading,
        description,
        price,
        percentpromotion,
        productdetailId,
        images: {
          deleteMany: {},
        },
        imagesalientfeatures: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        name: params.product2Id,
        productType: productType,
      },
      data: {
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
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

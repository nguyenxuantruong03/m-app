import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { ProductType, UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { product11Id: string } }
) {
  const productType = ProductType.PRODUCT11;
  try {
    if (!params.product11Id) {
      return new NextResponse(
        JSON.stringify({ error: "Product11 id is required!" }),
        { status: 400 }
      );
    }

    const product = await prismadb.product.findUnique({
      where: {
        name: params.product11Id,
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
    return new NextResponse(
      JSON.stringify({ error: "Internal error get product11." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { product11Id: string; storeId: string } }
) {
  const productType = ProductType.PRODUCT11;
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.product11Id) {
      return new NextResponse(
        JSON.stringify({ error: "Product11 id is required!" }),
        { status: 400 }
      );
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

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
        { status: 403 }
      );
    }

    const product = await prismadb.product.delete({
      where: {
        id: params.product11Id,
        productType: productType,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete product11." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { product11Id: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const {
      name,
      heading,
      description,
      images,
      imagesalientfeatures,
      productdetailId,
      isFeatured,
      isArchived
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
    if (!params.product11Id) {
      return new NextResponse(
        JSON.stringify({ error: "Product11 id is required!" }),
        { status: 405 }
      );
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
    
    const productType = ProductType.PRODUCT11;
    await prismadb.product.update({
      where: {
        id: params.product11Id,
        productType: productType,
      },
      data: {
        name,
        heading,
        description,
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
        id: params.product11Id,
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
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch product11." }),
      { status: 500 }
    );
  }
}

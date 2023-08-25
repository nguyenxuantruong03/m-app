import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { product1Id: string } }
) {
  try {
    if (!params.product1Id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product1.findUnique({
      where: {
        id: params.product1Id,
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        category: true,
        size: true,
        color: true,
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
  { params }: { params: { product1Id: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.product1Id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product1.delete({
      where: {
        id: params.product1Id,
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
  { params }: { params: { product1Id: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      name,
      heading,
      description,
      categoryId,
      promotionheading,
      promotiondescription,
      guaranteeheading,
      guaranteedescription,
      guaranteeinfomation,
      guaranteeprice,
      price,
      percentpromotion,
      isFeatured,
      isArchived,
      sizeId,
      colorId,
      images,
      descriptionspecifications,
      valuespecifications,
      description2specifications,
      value2specifications,
      description3specifications,
      value3specifications,
      description4specifications,
      value4specifications,
      description5specifications,
      value5specifications,
      description6specifications,
      value6specifications,
      description7specifications,
      value7specifications,
      description8specifications,
      value8specifications,
      description9specifications,
      value9specifications,
      description10specifications,
      value10specifications,
      description11specifications,
      value11specifications,
      description12specifications,
      value12specifications,
      description13specifications,
      value13specifications,
      description14specifications,
      value14specifications,
      descriptionsalientfeatures,
      description2salientfeatures,
      description3salientfeatures,
      description4salientfeatures,
      contentsalientfeatures,
      imagesalientfeatures,
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
    if (!categoryId) {
      return new NextResponse("CategoryId is required", { status: 400 });
    }
    if (!promotionheading) {
      return new NextResponse("Promotionheading is required", { status: 400 });
    }
    if (!promotiondescription) {
      return new NextResponse("Promotiondescription is required", {
        status: 400,
      });
    }
    if (!guaranteeheading) {
      return new NextResponse("Guaranteeheading is required", { status: 400 });
    }
    if (!guaranteedescription) {
      return new NextResponse("Guaranteedescription is required", {
        status: 400,
      });
    }
    if (!guaranteeinfomation) {
      return new NextResponse("Guaranteeinfomation is required", {
        status: 400,
      });
    }
    if (!guaranteeprice) {
      return new NextResponse("Guaranteeprice is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!percentpromotion) {
      return new NextResponse("Percentpromotion is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("SizeId is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("ColorId is required", { status: 400 });
    }
    if (!descriptionspecifications) {
      return new NextResponse("Descriptionspecifications is required", {
        status: 400,
      });
    }
    if (!valuespecifications) {
      return new NextResponse("Valuespecifications is required", {
        status: 400,
      });
    }
    if (!description2specifications) {
      return new NextResponse("Description2specifications is required", {
        status: 400,
      });
    }
    if (!value2specifications) {
      return new NextResponse("Value2specifications is required", {
        status: 400,
      });
    }
    if (!description3specifications) {
      return new NextResponse("Description3specifications is required", {
        status: 400,
      });
    }
    if (!value3specifications) {
      return new NextResponse("Value3specifications is required", {
        status: 400,
      });
    }
    if (!description4specifications) {
      return new NextResponse("Description4specifications is required", {
        status: 400,
      });
    }
    if (!value4specifications) {
      return new NextResponse("Value4specifications is required", {
        status: 400,
      });
    }
    if (!description5specifications) {
      return new NextResponse("Description5specifications is required", {
        status: 400,
      });
    }
    if (!value5specifications) {
      return new NextResponse("Value5specifications is required", {
        status: 400,
      });
    }
    if (!description6specifications) {
      return new NextResponse("Description6specifications is required", {
        status: 400,
      });
    }
    if (!value6specifications) {
      return new NextResponse("Value6specifications is required", {
        status: 400,
      });
    }
    if (!description7specifications) {
      return new NextResponse("Description7specifications is required", {
        status: 400,
      });
    }
    if (!value7specifications) {
      return new NextResponse("Value7specifications is required", {
        status: 400,
      });
    }
    if (!description8specifications) {
      return new NextResponse("Description8specifications is required", {
        status: 400,
      });
    }
    if (!value8specifications) {
      return new NextResponse("Value8specifications is required", {
        status: 400,
      });
    }
    if (!description9specifications) {
      return new NextResponse("Description9specifications is required", {
        status: 400,
      });
    }
    if (!value9specifications) {
      return new NextResponse("Value9specifications is required", {
        status: 400,
      });
    }
    if (!description10specifications) {
      return new NextResponse("Description10specifications is required", {
        status: 400,
      });
    }
    if (!value10specifications) {
      return new NextResponse("Value10specifications is required", {
        status: 400,
      });
    }
    if (!description11specifications) {
      return new NextResponse("Description11specifications is required", {
        status: 400,
      });
    }
    if (!value11specifications) {
      return new NextResponse("Value11specifications is required", {
        status: 400,
      });
    }
    if (!description12specifications) {
      return new NextResponse("Description12specifications is required", {
        status: 400,
      });
    }
    if (!value12specifications) {
      return new NextResponse("Value12specifications is required", {
        status: 400,
      });
    }
    if (!description13specifications) {
      return new NextResponse("Description13specifications is required", {
        status: 400,
      });
    }
    if (!value13specifications) {
      return new NextResponse("Value13specifications is required", {
        status: 400,
      });
    }
    if (!description14specifications) {
      return new NextResponse("Description14specifications is required", {
        status: 400,
      });
    }
    if (!value14specifications) {
      return new NextResponse("Value14specifications is required", {
        status: 400,
      });
    }
    if (!descriptionsalientfeatures) {
      return new NextResponse("Descriptionsalientfeatures is required", {
        status: 400,
      });
    }
    if (!description2salientfeatures) {
      return new NextResponse("Description2salientfeatures is required", {
        status: 400,
      });
    }
    if (!description3salientfeatures) {
      return new NextResponse("Description3salientfeatures is required", {
        status: 400,
      });
    }
    if (!description4salientfeatures) {
      return new NextResponse("Description4salientfeatures is required", {
        status: 400,
      });
    }
    if (!contentsalientfeatures) {
      return new NextResponse("Contentsalientfeatures is required", {
        status: 400,
      });
    }
    if (!imagesalientfeatures || !imagesalientfeatures.length) {
      return new NextResponse("Imagesalientfeatures Product1 is required", {
        status: 400,
      });
    }

    if (!images || !images.length) {
      return new NextResponse("Images is required", { status: 400 });
    }

    if (!params.product1Id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.product1.update({
      where: {
        id: params.product1Id,
      },
      data: {
        name,
        heading,
        description,
        categoryId,
        promotionheading,
        promotiondescription,
        guaranteeheading,
        guaranteedescription,
        guaranteeinfomation,
        guaranteeprice,
        price,
        percentpromotion,
        sizeId,
        colorId,
        descriptionspecifications,
        valuespecifications,
        description2specifications,
        value2specifications,
        description3specifications,
        value3specifications,
        description4specifications,
        value4specifications,
        description5specifications,
        value5specifications,
        description6specifications,
        value6specifications,
        description7specifications,
        value7specifications,
        description8specifications,
        value8specifications,
        description9specifications,
        value9specifications,
        description10specifications,
        value10specifications,
        description11specifications,
        value11specifications,
        description12specifications,
        value12specifications,
        description13specifications,
        value13specifications,
        description14specifications,
        value14specifications,
        descriptionsalientfeatures,
        description2salientfeatures,
        description3salientfeatures,
        description4salientfeatures,
        contentsalientfeatures,
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

    const product = await prismadb.product1.update({
      where: {
        id: params.product1Id,
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
              ...imagesalientfeatures.map(
                (image: { url: string }) => image
              ),
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

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
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
      categoryId,
      promotionheading,
      promotiondescription,
      guaranteeheading,
      guaranteedescription,
      guaranteeinfomation,
      guaranteeprice,
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
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
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
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Kiểm tra sizeId truyền vào có tồn tại trong danh sách size không
    const size = await prismadb.size.findFirst({
      where: {
        id: body.sizeId,
      },
    });

    // Nếu sizeId không tồn tại, trả về thông báo lỗi
    if (!size) {
      return new NextResponse(JSON.stringify({ error: "Hãy chọn lại Size!" }), { status: 404 });
    }

    const color = await prismadb.color.findFirst({
      where: {
        id: body.colorId,
      },
    });

    // Nếu sizeId không tồn tại, trả về thông báo lỗi
    if (!color) {
      return new NextResponse(JSON.stringify({ error: "Hãy chọn lại Color!" }), { status: 404 });
    }

    const category = await prismadb.category.findFirst({
      where: {
        id: body.categoryId,
      },
    });

    // Nếu sizeId không tồn tại, trả về thông báo lỗi
    if (!category) {
      return new NextResponse(JSON.stringify({ error: "Hãy chọn lại Category!" }), { status: 404 });
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
    const productDetail = await prismadb.productDetail.create({
      data: {
        name,
        categoryId,
        promotionheading,
        promotiondescription,
        guaranteeheading,
        guaranteedescription,
        guaranteeinfomation,
        guaranteeprice,
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
        storeId: params.storeId,
      },
    });

    return NextResponse.json(productDetail);
  } catch (error) {
    console.log("[PRODUCTDETAIL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const productDetail = await prismadb.productDetail.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
      },
      include: {
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(productDetail);
  } catch (error) {
    console.log("[PRODUCTDETAIL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

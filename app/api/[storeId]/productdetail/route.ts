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

    if (!categoryId) {
      return new NextResponse(
        JSON.stringify({ error: "CategoryId is required!" }),
        { status: 400 }
      );
    }

    if (!promotionheading) {
      return new NextResponse(
        JSON.stringify({ error: "Promotionheading is required!" }),
        { status: 400 }
      );
    }
    if (!promotiondescription) {
      return new NextResponse(
        JSON.stringify({ error: "Promotiondescription is required!" }),
        { status: 400 }
      );
    }

    if (!guaranteeheading) {
      return new NextResponse(
        JSON.stringify({ error: "Guaranteeheading is required!" }),
        { status: 400 }
      );
    }
    if (!guaranteedescription) {
      return new NextResponse(
        JSON.stringify({ error: "Guaranteedescription is required!" }),
        { status: 400 }
      );
    }
    if (!guaranteeinfomation) {
      return new NextResponse(
        JSON.stringify({ error: "Guaranteeinfomation is required!" }),
        { status: 400 }
      );
    }

    if (!guaranteeprice) {
      return new NextResponse(
        JSON.stringify({ error: "Guaranteeprice is required!" }),
        { status: 400 }
      );
    }

    if (!sizeId) {
      return new NextResponse(
        JSON.stringify({ error: "SizeId is required!" }),
        { status: 400 }
      );
    }

    if (!colorId) {
      return new NextResponse(
        JSON.stringify({ error: "ColorId is required!" }),
        { status: 400 }
      );
    }
    if (!descriptionspecifications) {
      return new NextResponse(
        JSON.stringify({ error: "Descriptionspecifications is required!" }),
        { status: 400 }
      );
    }
    if (!valuespecifications) {
      return new NextResponse(
        JSON.stringify({ error: "Valuespecifications is required!" }),
        { status: 400 }
      );
    }
    if (!description2specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description2specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value2specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value2specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description3specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description3specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value3specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value3specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description4specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description4specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value4specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value4specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description5specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description5specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value5specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value5specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description6specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description6specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value6specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value6specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description7specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description7specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value7specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value7specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description8specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description8specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value8specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value8specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description9specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description9specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value9specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value9specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description10specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description10specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value10specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value10specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description11specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description11specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value11specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value11specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description12specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description12specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value12specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value12specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description13specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description13specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value13specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value13specifications is required!" }),
        { status: 400 }
      );
    }
    if (!description14specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Description14specifications is required!" }),
        { status: 400 }
      );
    }
    if (!value14specifications) {
      return new NextResponse(
        JSON.stringify({ error: "Value14specifications is required!" }),
        { status: 400 }
      );
    }
    if (!descriptionsalientfeatures) {
      return new NextResponse(
        JSON.stringify({ error: "Descriptionsalientfeatures is required!" }),
        { status: 400 }
      );
    }
    if (!description2salientfeatures) {
      return new NextResponse(
        JSON.stringify({ error: "Description2salientfeatures is required!" }),
        { status: 400 }
      );
    }
    if (!description3salientfeatures) {
      return new NextResponse(
        JSON.stringify({ error: "Description3salientfeatures is required!" }),
        { status: 400 }
      );
    }
    if (!description4salientfeatures) {
      return new NextResponse(
        JSON.stringify({ error: "Description4salientfeatures is required!" }),
        { status: 400 }
      );
    }
    if (!contentsalientfeatures) {
      return new NextResponse(
        JSON.stringify({ error: "Contentsalientfeatures is required!" }),
        { status: 400 }
      );
    }
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    // Kiểm tra sizeId truyền vào có tồn tại trong danh sách size không
    const size = await prismadb.size.findFirst({
      where: {
        id: body.sizeId,
      },
    });

    // Nếu sizeId không tồn tại, trả về thông báo lỗi
    if (!size) {
      return new NextResponse(JSON.stringify({ error: "Hãy chọn lại Size!" }), {
        status: 404,
      });
    }

    const color = await prismadb.color.findFirst({
      where: {
        id: body.colorId,
      },
    });

    // Nếu sizeId không tồn tại, trả về thông báo lỗi
    if (!color) {
      return new NextResponse(
        JSON.stringify({ error: "Hãy chọn lại Color!" }),
        { status: 404 }
      );
    }

    const category = await prismadb.category.findFirst({
      where: {
        id: body.categoryId,
      },
    });

    // Nếu sizeId không tồn tại, trả về thông báo lỗi
    if (!category) {
      return new NextResponse(
        JSON.stringify({ error: "Hãy chọn lại Category!" }),
        { status: 404 }
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
    return new NextResponse(
      JSON.stringify({ error: "Internal error post productdetail." }),
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
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
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
    return new NextResponse(
      JSON.stringify({ error: "Internal error get productdetail." }),
      { status: 500 }
    );
  }
}

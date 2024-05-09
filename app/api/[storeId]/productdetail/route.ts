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
      title,
      categoryId,
      promotionheading,
      promotiondescription,
      warranty1,
      warranty2,
      warranty3,
      warranty4,
      color1Id,
      size1Id,
      color2Id,
      size2Id,
      color3Id,
      size3Id,
      color4Id,
      size4Id,
      color5Id,
      size5Id,
      price1,
      price2,
      price3,
      price4,
      price5,
      name1,
      name2,
      name4,
      name3,
      name5,
      quantity1,
      quantity2,
      quantity3,
      quantity4,
      quantity5,
      percentpromotion1,
      percentpromotion2,
      percentpromotion3,
      percentpromotion4,
      percentpromotion5,
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

    if (!title) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
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

    if (!size1Id) {
      return new NextResponse(
        JSON.stringify({ error: "SizeId is required!" }),
        { status: 400 }
      );
    }

    if (!color1Id) {
      return new NextResponse(
        JSON.stringify({ error: "ColorId is required!" }),
        { status: 400 }
      );
    }

    if (!name1) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
    }

    if (!percentpromotion1) {
      return new NextResponse(
        JSON.stringify({ error: "Percent Promotion is required!" }),
        { status: 400 }
      );
    }

    if (!price1) {
      return new NextResponse(JSON.stringify({ error: "Price is required!" }), {
        status: 400,
      });
    }

    if (!quantity1) {
      return new NextResponse(
        JSON.stringify({ error: "Quantity is required!" }),
        {
          status: 400,
        }
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
        title,
        categoryId,
        size1Id,
        color1Id,
        size2Id,
        color2Id,
        size3Id,
        color3Id,
        size4Id,
        color4Id,
        size5Id,
        color5Id,
        price1,
        price2,
        price3,
        price4,
        price5,
        name1,
        name2,
        name3,
        name4,
        name5,
        quantity1,
        quantity2,
        quantity3,
        quantity4,
        quantity5,
        percentpromotion1,
        percentpromotion2,
        percentpromotion3,
        percentpromotion4,
        percentpromotion5,
        promotionheading,
        promotiondescription,
        warranty1,
        warranty2,
        warranty3,
        warranty4,
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

    const sentProductDetail = {
        title:productDetail.title,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Title: ${sentProductDetail.title}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATEPRODUCTDETAIL",
        newChange: changes,
        user: userId?.email || "",
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
    const color1Id = searchParams.get("color1Id") || undefined;
    const color2Id = searchParams.get("color2Id") || undefined;
    const color3Id = searchParams.get("color3Id") || undefined;
    const color4Id = searchParams.get("color4Id") || undefined;
    const color5Id = searchParams.get("color5Id") || undefined;
    const size1Id = searchParams.get("size1Id") || undefined;
    const size2Id = searchParams.get("size2Id") || undefined;
    const size3Id = searchParams.get("size3Id") || undefined;
    const size4Id = searchParams.get("size4Id") || undefined;
    const size5Id = searchParams.get("size5Id") || undefined;

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
        color1Id,
        size1Id,
        color2Id,
        size2Id,
        color3Id,
        size3Id,
        color4Id,
        size4Id,
        color5Id,
        size5Id,
      },
      include: {
        category: true,
        color1: true,
        size1: true,
        color2: true,
        size2: true,
        color3: true,
        size3: true,
        color4: true,
        size4: true,
        color5: true,
        size5: true,
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

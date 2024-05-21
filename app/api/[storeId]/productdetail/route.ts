import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

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


export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();
    const body = await req.json();

    const { ids } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Mảng IDs không được trống!" }),
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

    // Fetch all product to delete, including their images
    const ProductToDelete = await prismadb.productDetail.findMany({
      where: {
        id: {
          in: ids,
        },
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
    });

    // Create an array of changes for logging
    const changesArray = ProductToDelete.map(productdetail => ({
      title: productdetail.title,
      name1: productdetail.name1,
      price1: productdetail.price1,
      percentpromotion1: productdetail.percentpromotion1,
      quantity1: productdetail.quantity1,
      size1: productdetail.size1,
      color1: productdetail.color1,
      name2: productdetail.name1,
      price2: productdetail.price1,
      percentpromotion2: productdetail.percentpromotion1,
      quantity2: productdetail.quantity1,
      size2: productdetail.size1,
      color2: productdetail.color1,
      name3: productdetail.name1,
      price3: productdetail.price1,
      percentpromotion3: productdetail.percentpromotion1,
      quantity3: productdetail.quantity1,
      size3: productdetail.size1,
      color3: productdetail.color1,
      name4: productdetail.name1,
      price4: productdetail.price1,
      percentpromotion4: productdetail.percentpromotion1,
      quantity4: productdetail.quantity1,
      size4: productdetail.size1,
      color4: productdetail.color1,
      name5: productdetail.name1,
      price5: productdetail.price1,
      percentpromotion5: productdetail.percentpromotion1,
      quantity5: productdetail.quantity1,
      size5: productdetail.size1,
      color5: productdetail.color1,
      category: productdetail.category,
      promotionheading: productdetail.promotionheading,
      promotiondescription: productdetail.promotiondescription,
      warranty1: productdetail.warranty1,
      warranty2: productdetail.warranty2,
      warranty3: productdetail.warranty3,
      warranty4: productdetail.warranty4,
    }));

    // Delete all the product in one operation
    await prismadb.productDetail.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Log the changes in a single database operation
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changesArray.map(change => `Title: ${change.title}, Name1: ${change.name1}, Price1: ${change.price1}, Percentpromotion1: ${change.percentpromotion1}, Quantity1: ${change.quantity1}, Size1: ${change.size1}, Color1: ${change.color1}, Name2: ${change.name2}, Price2: ${change.price2}, Percentpromotion2: ${change.percentpromotion2}, Quantity2: ${change.quantity2}, Size2: ${change.size2}, Color2: ${change.color2}, Name3: ${change.name3}, Price3: ${change.price3}, Percentpromotion3: ${change.percentpromotion3}, Quantity3: ${change.quantity3}, Size3: ${change.size3}, Color3: ${change.color3}, Name4: ${change.name4}, Price4: ${change.price4}, Percentpromotion4: ${change.percentpromotion4}, Quantity4: ${change.quantity4}, Size4: ${change.size4}, Color4: ${change.color4}, Name5: ${change.name5}, Price5: ${change.price5}, Percentpromotion5: ${change.percentpromotion5}, Quantity5: ${change.quantity5}, Size5: ${change.size5}, Color5: ${change.color5}, Category: ${change.category}, Promotionheading: ${change.promotionheading}, Promotiondescription: ${change.promotiondescription}, Warranty1: ${change.warranty1}, Warranty2: ${change.warranty2}, Warranty3: ${change.warranty3}, Warranty4: ${change.warranty4}`),
        type: "DELETEMANY-PRODUCTDETAIL",
        user: userId?.email || "",
      },
    });

    return NextResponse.json({ message: "Xóa thành công!" });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete category." }),
      { status: 500 }
    );
  }
}
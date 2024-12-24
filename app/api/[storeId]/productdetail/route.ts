import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import {
  translateProductDetailDelete,
  translateProductDetailGet,
  translateProductDetailPost,
} from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productDetailPostMessage = translateProductDetailPost(LanguageToUse);

  try {
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

    // Validation for unique size and color
    const sizeIds = [size1Id, size2Id, size3Id, size4Id, size5Id].filter(Boolean); // Loại bỏ các giá trị null/undefined
    const colorIds = [color1Id, color2Id, color3Id, color4Id, color5Id].filter(Boolean); // Loại bỏ các giá trị null/undefined

    if (new Set(sizeIds).size !== sizeIds.length) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.sizeMismatch }),
        { status: 400 }
      );
    }

    if (new Set(colorIds).size !== colorIds.length) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.colorMismatch }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!title) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.titleRequired }),
        {
          status: 400,
        }
      );
    }

    if (!categoryId) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.categoryIdRequired }),
        { status: 400 }
      );
    }

    if (!promotionheading) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailPostMessage.promotionHeadingRequired,
        }),
        { status: 400 }
      );
    }

    if (!promotiondescription) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailPostMessage.promotionDescriptionRequired,
        }),
        { status: 400 }
      );
    }

    if (!size1Id) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.sizeIdRequired }),
        { status: 400 }
      );
    }

    if (!color1Id) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.colorIdRequired }),
        { status: 400 }
      );
    }

    if (!name1) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.nameRequired }),
        {
          status: 400,
        }
      );
    }

    if (!price1) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.priceRequired }),
        {
          status: 400,
        }
      );
    }

    if (!quantity1) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.quantityRequired }),
        {
          status: 400,
        }
      );
    }

    if (!descriptionspecifications) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailPostMessage.descriptionSpecificationsRequired,
        }),
        { status: 400 }
      );
    }
    if (!valuespecifications) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailPostMessage.valueSpecificationsRequired,
        }),
        { status: 400 }
      );
    }
    if (!descriptionsalientfeatures) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailPostMessage.descriptionSalientFeaturesRequired,
        }),
        { status: 400 }
      );
    }
    if (!contentsalientfeatures) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailPostMessage.contentSalientFeaturesRequired,
        }),
        { status: 400 }
      );
    }
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.storeIdRequired }),
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
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.chooseSize }),
        {
          status: 404,
        }
      );
    }

    const color = await prismadb.color.findFirst({
      where: {
        id: body.colorId,
      },
    });

    // Nếu sizeId không tồn tại, trả về thông báo lỗi
    if (!color) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.chooseColor }),
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
        JSON.stringify({ error: productDetailPostMessage.chooseCategory }),
        { status: 404 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    const existingProductDetail = await prismadb.productDetail.findFirst({
      where: {
        title: title,
        storeId: params.storeId, // Kiểm tra trong cùng store nếu cần
      },
    });

    // Nếu title đã tồn tại, trả về lỗi
    if (existingProductDetail) {
      return new NextResponse(
        JSON.stringify({ error: productDetailPostMessage.titleExists }),
        { status: 400 }
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
      title: productDetail.title,
    };

    // Log sự thay đổi của billboard
    const changes = [`Title: ${sentProductDetail.title}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATEPRODUCTDETAIL",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(productDetail);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productDetailPostMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productDetailGetMessage = translateProductDetailGet(LanguageToUse);
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: productDetailGetMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    const productDetails = await prismadb.productDetail.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
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

    return NextResponse.json(productDetails);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: productDetailGetMessage.internalErrorGetProductDetail,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productDetailDeleteMessage =
    translateProductDetailDelete(LanguageToUse);
  try {
    const body = await req.json();
    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: productDetailDeleteMessage.userNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: productDetailDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: productDetailDeleteMessage.idsArrayEmpty }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: productDetailDeleteMessage.storeIdNotFound }),
        { status: 405 }
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
    const changesArray = ProductToDelete.map((productdetail) => ({
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
        delete: changesArray.map(
          (change) =>
            `Title: ${change.title}, Name1: ${change.name1}, Price1: ${change.price1}, Percentpromotion1: ${change.percentpromotion1}, Quantity1: ${change.quantity1}, Size1: ${change.size1}, Color1: ${change.color1}, Name2: ${change.name2}, Price2: ${change.price2}, Percentpromotion2: ${change.percentpromotion2}, Quantity2: ${change.quantity2}, Size2: ${change.size2}, Color2: ${change.color2}, Name3: ${change.name3}, Price3: ${change.price3}, Percentpromotion3: ${change.percentpromotion3}, Quantity3: ${change.quantity3}, Size3: ${change.size3}, Color3: ${change.color3}, Name4: ${change.name4}, Price4: ${change.price4}, Percentpromotion4: ${change.percentpromotion4}, Quantity4: ${change.quantity4}, Size4: ${change.size4}, Color4: ${change.color4}, Name5: ${change.name5}, Price5: ${change.price5}, Percentpromotion5: ${change.percentpromotion5}, Quantity5: ${change.quantity5}, Size5: ${change.size5}, Color5: ${change.color5}, Category: ${change.category}, Promotionheading: ${change.promotionheading}, Promotiondescription: ${change.promotiondescription}, Warranty1: ${change.warranty1}, Warranty2: ${change.warranty2}, Warranty3: ${change.warranty3}, Warranty4: ${change.warranty4}`
        ),
        type: "DELETEMANY-PRODUCTDETAIL",
        user: user?.email || "",
      },
    });

    return NextResponse.json({
      message: productDetailDeleteMessage.deleteSuccess,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: productDetailDeleteMessage.internalErrorDeleteCategory,
      }),
      { status: 500 }
    );
  }
}

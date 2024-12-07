import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { Category, Color, Size, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { Decimal } from "@prisma/client/runtime/library";
import {
  translateProductDetailIdDelete,
  translateProductDetailIdGet,
  translateProductDetailIdPatch,
} from "@/translate/translate-api";

type ProductDetailValue =
  | string
  | number
  | Date
  | Decimal
  | undefined
  | Category
  | Size
  | Color
  | null;

interface ChangeRecord {
  oldValue: ProductDetailValue;
  newValue: ProductDetailValue;
}

export async function GET(
  req: Request,
  { params }: { params: { productdetailId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productDetailIdGetMessage = translateProductDetailIdGet(LanguageToUse);
  try {
    if (!params.productdetailId) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailIdGetMessage.productDetailIdRequired,
        }),
        { status: 400 }
      );
    }

    const productDetail = await prismadb.productDetail.findUnique({
      where: {
        id: params.productdetailId,
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

    return NextResponse.json(productDetail);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: productDetailIdGetMessage.internalErrorGetProductDetail,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productdetailId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productDetailIdDeleteMessage =
    translateProductDetailIdDelete(LanguageToUse);
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: productDetailIdDeleteMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailIdDeleteMessage.permissionDenied,
        }),
        { status: 403 }
      );
    }

    if (!params.productdetailId) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailIdDeleteMessage.productDetailIdRequired,
        }),
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
        JSON.stringify({ error: productDetailIdDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    const productDetail = await prismadb.productDetail.delete({
      where: {
        id: params.productdetailId,
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
        type: "DELETEPRODUCTDETAIL",
        delete: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(productDetail);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: productDetailIdDeleteMessage.internalErrorDeleteProductDetail,
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productdetailId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productDetailIdPatchMessage =
    translateProductDetailIdPatch(LanguageToUse);
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

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: productDetailIdPatchMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: productDetailIdPatchMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!title) {
      return new NextResponse(
        JSON.stringify({ error: productDetailIdPatchMessage.titleRequired }),
        {
          status: 400,
        }
      );
    }

    if (!categoryId) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailIdPatchMessage.categoryIdRequired,
        }),
        { status: 400 }
      );
    }

    if (!promotionheading) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailIdPatchMessage.promotionHeadingRequired,
        }),
        { status: 400 }
      );
    }
    if (!promotiondescription) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailIdPatchMessage.promotionDescriptionRequired,
        }),
        { status: 400 }
      );
    }

    if (!size1Id) {
      return new NextResponse(
        JSON.stringify({ error: productDetailIdPatchMessage.sizeIdRequired }),
        { status: 400 }
      );
    }

    if (!color1Id) {
      return new NextResponse(
        JSON.stringify({ error: productDetailIdPatchMessage.colorIdRequired }),
        { status: 400 }
      );
    }

    if (!name1) {
      return new NextResponse(
        JSON.stringify({ error: productDetailIdPatchMessage.nameRequired }),
        {
          status: 400,
        }
      );
    }

    if (!price1) {
      return new NextResponse(
        JSON.stringify({ error: productDetailIdPatchMessage.priceRequired }),
        {
          status: 400,
        }
      );
    }

    if (!quantity1) {
      return new NextResponse(
        JSON.stringify({ error: productDetailIdPatchMessage.quantityRequired }),
        {
          status: 400,
        }
      );
    }

    if (!descriptionsalientfeatures) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailIdPatchMessage.descriptionSalientFeaturesRequired,
        }),
        { status: 400 }
      );
    }
    
    if (!contentsalientfeatures) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailIdPatchMessage.contentSalientFeaturesRequired,
        }),
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
        JSON.stringify({ error: productDetailIdPatchMessage.chooseSize }),
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
        JSON.stringify({ error: productDetailIdPatchMessage.chooseColor }),
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
        JSON.stringify({ error: productDetailIdPatchMessage.chooseCategory }),
        { status: 404 }
      );
    }

    if (!params.productdetailId) {
      return new NextResponse(
        JSON.stringify({
          error: productDetailIdPatchMessage.productDetailIdRequired,
        }),
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
        JSON.stringify({ error: productDetailIdPatchMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    const existingTitle = await prismadb.productDetail.findFirst({
      where: {
        title: title, // Kiểm tra trùng title
        NOT: {
          id: params.productdetailId, // Ngoại trừ sản phẩm hiện tại
        },
      },
    });

    if (existingTitle) {
      return new NextResponse(JSON.stringify(productDetailIdPatchMessage.titleExists), {
        status: 400,
      });
    }

    const existingProductDetail = await prismadb.productDetail.findUnique({
      where: {
        id: params.productdetailId,
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

    // Kiểm tra nếu không tìm thấy bản ghi
    if (!existingProductDetail) {
      return new NextResponse(JSON.stringify(productDetailIdPatchMessage.productNotFound), {
        status: 404,
      });
    }

    const productDetail = await prismadb.productDetail.update({
      where: {
        id: params.productdetailId,
      },
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
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingProductDetail) {
      if (
        existingProductDetail.hasOwnProperty(key) &&
        productDetail.hasOwnProperty(key)
      ) {
        if (
          existingProductDetail[key as keyof typeof existingProductDetail] !==
          productDetail[key as keyof typeof productDetail]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue:
                existingProductDetail[
                  key as keyof typeof existingProductDetail
                ],
              newValue: productDetail[key as keyof typeof productDetail],
            };
          }
        }
      }
    }

    //Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
    const oldChanges = Object.keys(changes).map((key) => {
      return `${key}: { Old: '${changes[key].oldValue}'}`;
    });
    const newChanges = Object.keys(changes).map((key) => {
      return `${key}: { New: '${changes[key].newValue}'}`;
    });

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        oldChange: oldChanges,
        newChange: newChanges,
        type: "UPDATEPRODUCTDETAIL",
        user: user?.email || "",
      },
    });

    return NextResponse.json(productDetail);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productDetailIdPatchMessage.internalError }),
      { status: 500 }
    );
  }
}

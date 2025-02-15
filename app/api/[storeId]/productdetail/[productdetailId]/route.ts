import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { Category, Color, Size, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { Decimal } from "@prisma/client/runtime/library";
import { createTranslator } from "next-intl";

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
   const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!params.productdetailId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.productdetail.productDetailIdRequired")
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
        error: t("toastError.productdetail.internalErrorGetProductDetail")
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
   const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.permissionDenied")
        }),
        { status: 403 }
      );
    }

    if (!params.productdetailId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.productdetail.productDetailIdRequired")
        }),
        { status: 400 }
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
        error: t("toastError.productdetail.internalErrorDeleteProductDetail")
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
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

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
    const sizeIds = [size1Id, size2Id, size3Id, size4Id, size5Id];
    const colorIds = [color1Id, color2Id, color3Id, color4Id, color5Id];

    if (new Set(sizeIds).size !== sizeIds.length) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productdetail.sizeNotAllowed") }),
        { status: 400 }
      );
    }

    if (new Set(colorIds).size !== colorIds.length) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productdetail.colorNotAllowed") }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!title) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productdetail.titleRequired") }),
        {
          status: 400,
        }
      );
    }

    if (!categoryId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.categoryId")
        }),
        { status: 400 }
      );
    }

    if (!promotionheading) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.productdetail.promotionHeadingRequired")
        }),
        { status: 400 }
      );
    }
    if (!promotiondescription) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.productdetail.promotionDescriptionRequired")
        }),
        { status: 400 }
      );
    }

    if (!size1Id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.sizeRequired") }),
        { status: 400 }
      );
    }

    if (!color1Id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.colorRequired") }),
        { status: 400 }
      );
    }

    if (!name1) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.nameRequired") }),
        {
          status: 400,
        }
      );
    }

    if (!price1) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productdetail.priceRequired") }),
        {
          status: 400,
        }
      );
    }

    if (!quantity1) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productdetail.quantityRequired") }),
        {
          status: 400,
        }
      );
    }

    if (!descriptionsalientfeatures) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.productdetail.descriptionSpecificationsRequired")
        }),
        { status: 400 }
      );
    }
    if (!valuespecifications) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.productdetail.valueSpecificationsRequired")
        }),
        { status: 400 }
      );
    }
    if (!contentsalientfeatures) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.productdetail.contentSalientFeaturesRequired")
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
        JSON.stringify({ error: t("toastError.productdetail.chooseSize") }),
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
        JSON.stringify({ error: t("toastError.productdetail.chooseColor") }),
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
        JSON.stringify({ error: t("toastError.productdetail.chooseCategory") }),
        { status: 404 }
      );
    }

    if (!params.productdetailId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.productdetail.productDetailIdRequired")
        }),
        { status: 404 }
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
      return new NextResponse(
        JSON.stringify(t("toastError.productdetail.titleExists")),
        {
          status: 400,
        }
      );
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
      return new NextResponse(
        JSON.stringify(t("toastError.productdetail.productDetailNotFound")),
        {
          status: 404,
        }
      );
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
      JSON.stringify({ error: t("toastError.productdetail.internalErrorPatchProductDetail") }),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import {
  Image,
  Imagesalientfeatures,
  ProductDetail,
  ProductType,
  UserRole,
} from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { translateText } from "@/translate/translate-client";
import {
  translateProductIdDelete,
  translateProductIdGet,
  translateProductIdPatch,
} from "@/translate/translate-api";

type ProductValue =
  | string
  | boolean
  | Date
  | string[]
  | number
  | Imagesalientfeatures[]
  | Image[]
  | ProductDetail
  | null
  | undefined;

interface ChangeRecord {
  oldValue: ProductValue;
  newValue: ProductValue;
}

export async function GET(
  req: Request,
  { params }: { params: { product6Id: string } }
) {
  const productType = ProductType.PRODUCT6;
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productIdGetMessage = translateProductIdGet(LanguageToUse);
  try {
    if (!params.product6Id) {
      return new NextResponse(
        JSON.stringify({ error: productIdGetMessage.productIdRequired }),
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language

    const product = await prismadb.product.findUnique({
      where: {
        name: params.product6Id,
        productType: productType,
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        comment: {
          include: {
            user: {
              include: {
                imageCredential: {
                  orderBy: {
                    createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
                  },
                  take: 1, // Take only the most recent entry
                },
              },
            },
          },
        },
        responsecomment: {
          include: {
            user: {
              include: {
                imageCredential: {
                  orderBy: {
                    createdAt: "desc", // Assuming 'createdAt' is the field that stores the creation date
                  },
                  take: 1, // Take only the most recent entry
                },
              },
            },
          },
        },
        productdetail: {
          include: {
            category: true,
            color1: true,
            color2: true,
            color3: true,
            color4: true,
            color5: true,
            size1: true,
            size2: true,
            size3: true,
            size4: true,
            size5: true,
          },
        },
      },
    });

    // Kiểm tra nếu không tìm thấy billboard
    if (!product) {
      return new NextResponse(
        JSON.stringify({ error: productIdGetMessage.productsNotFound  }),
        { status: 404 }
      );
    }

    const translateField = async (field: any, language: string) => {
      if (language !== "vi" && field) {
        return await translateText(field, language);
      }
      return field;
    };
    

    const translatedProduct = {
      ...product,
      heading: await translateField(product.heading, language),
      description: await translateField(product.description, language),
      comment: await Promise.all(
        product.comment.map(async (item: any) => ({
          ...item,
          comment: await translateField(item.comment, language),
          user: {
            ...item.user,
            issued: await translateField(item.user.issued, language),
            gender: await translateField(item.user.gender, language),
            degree: await translateField(item.user.degree, language),
            maritalStatus: await translateField(item.user.maritalStatus, language),
            workingTime: await translateField(item.user.workingTime, language),
          },
        }))
      ),
      responsecomment: await Promise.all(
        product.responsecomment.map(async (response: any) => ({
          ...response,
          description: await translateField(response.description, language),
          user: {
            ...response.user,
            issued: await translateField(response.user.issued, language),
            gender: await translateField(response.user.gender, language),
            degree: await translateField(response.user.degree, language),
            maritalStatus: await translateField(response.user.maritalStatus, language),
            workingTime: await translateField(response.user.workingTime, language),
          },
        }))
      ),
      productdetail: {
        ...product.productdetail,
        title: await translateField(product.productdetail?.title, language),
        name1: await translateField(product.productdetail?.name1, language),
        name2: await translateField(product.productdetail?.name2, language),
        name3: await translateField(product.productdetail?.name3, language),
        name4: await translateField(product.productdetail?.name4, language),
        name5: await translateField(product.productdetail?.name5, language),
        promotionheading: await translateField(product.productdetail?.promotionheading, language),
        promotiondescription: await translateField(product.productdetail?.promotiondescription, language),
        descriptionsalientfeatures: await translateField(product.productdetail?.descriptionsalientfeatures, language),
        description2salientfeatures: await translateField(product.productdetail?.description2salientfeatures, language),
        description3salientfeatures: await translateField(product.productdetail?.description3salientfeatures, language),
        description4salientfeatures: await translateField(product.productdetail?.description4salientfeatures, language),
        contentsalientfeatures: await translateField(product.productdetail?.contentsalientfeatures, language),
        descriptionspecifications: await translateField(product.productdetail?.descriptionspecifications, language),
        valuespecifications: await translateField(product.productdetail?.valuespecifications, language),
        description2specifications: await translateField(product.productdetail?.description2specifications, language),
        value2specifications: await translateField(product.productdetail?.value2specifications, language),
        description3specifications: await translateField(product.productdetail?.description3specifications, language),
        value3specifications: await translateField(product.productdetail?.value3specifications, language),
        description4specifications: await translateField(product.productdetail?.description4specifications, language),
        value4specifications: await translateField(product.productdetail?.value4specifications, language),
        description5specifications: await translateField(product.productdetail?.description5specifications, language),
        value5specifications: await translateField(product.productdetail?.value5specifications, language),
        description6specifications: await translateField(product.productdetail?.description6specifications, language),
        value6specifications: await translateField(product.productdetail?.value6specifications, language),
        description7specifications: await translateField(product.productdetail?.description7specifications, language),
        value7specifications: await translateField(product.productdetail?.value7specifications, language),
        description8specifications: await translateField(product.productdetail?.description8specifications, language),
        value8specifications: await translateField(product.productdetail?.value8specifications, language),
        description9specifications: await translateField(product.productdetail?.description9specifications, language),
        value9specifications: await translateField(product.productdetail?.value9specifications, language),
        description10specifications: await translateField(product.productdetail?.description10specifications, language),
        value10specifications: await translateField(product.productdetail?.value10specifications, language),
        description11specifications: await translateField(product.productdetail?.description11specifications, language),
        value11specifications: await translateField(product.productdetail?.value11specifications, language),
        description12specifications: await translateField(product.productdetail?.description12specifications, language),
        value12specifications: await translateField(product.productdetail?.value12specifications, language),
        description13specifications: await translateField(product.productdetail?.description13specifications, language),
        value13specifications: await translateField(product.productdetail?.value13specifications, language),
        description14specifications: await translateField(product.productdetail?.description14specifications, language),
        value14specifications: await translateField(product.productdetail?.value14specifications, language),
        category: {
          ...product.productdetail?.category,
          name: await translateField(product.productdetail?.category?.name, language),
        },
        color1: {
          ...product.productdetail?.color1,
          name: await translateField(product.productdetail?.color1?.name, language),
        },
        color2: {
          ...product.productdetail?.color2,
          name: await translateField(product.productdetail?.color2?.name, language),
        },
        color3: {
          ...product.productdetail?.color3,
          name: await translateField(product.productdetail?.color3?.name, language),
        },
        color4: {
          ...product.productdetail?.color4,
          name: await translateField(product.productdetail?.color4?.name, language),
        },
        color5: {
          ...product.productdetail?.color5,
          name: await translateField(product.productdetail?.color5?.name, language),
        },
        size1: {
          ...product.productdetail?.size1,
          name: await translateField(product.productdetail?.size1?.name, language),
        },
        size2: {
          ...product.productdetail?.size2,
          name: await translateField(product.productdetail?.size2?.name, language),
        },
        size3: {
          ...product.productdetail?.size3,
          name: await translateField(product.productdetail?.size3?.name, language),
        },
        size4: {
          ...product.productdetail?.size4,
          name: await translateField(product.productdetail?.size4?.name, language),
        },
        size5: {
          ...product.productdetail?.size5,
          name: await translateField(product.productdetail?.size5?.name, language),
        },
      },
    };

    return NextResponse.json(translatedProduct);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `${productIdGetMessage.internalError}6` }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { product6Id: string; storeId: string } }
) {
  const productType = ProductType.PRODUCT6;
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productIdDeleteMessage = translateProductIdDelete(LanguageToUse);
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: productIdDeleteMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: productIdDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!params.product6Id) {
      return new NextResponse(
        JSON.stringify({ error: productIdDeleteMessage.productIdRequired }),
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
        JSON.stringify({ error: productIdDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    const existingProduct = await prismadb.product.findUnique({
      where: {
        id: params.product6Id,
        productType: productType,
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        productdetail: true,
      },
    });

    const product = await prismadb.product.delete({
      where: {
        id: params.product6Id,
        productType: productType,
      },
    });

    const sentProduct = {
      name: product?.heading,
      description: product.description,
      ProductType: product.productType,
      images: existingProduct?.images.map(
        (image: { url: string }) => image.url
      ),
      imagesalientfeatures: existingProduct?.imagesalientfeatures.map(
        (image: { url: string }) => image.url
      ),
      isFeatured: product.isFeatured,
      isArchived: product.isFeatured,
      productdetailId: product.productdetailId,
    };

    const changes = [
      `Name: ${sentProduct.name}, Description: ${sentProduct.description}, ProductType: ${sentProduct.ProductType}, Images: ${sentProduct.images}, ImageSalientfeatures: ${sentProduct.imagesalientfeatures}, isFeatured: ${sentProduct.isFeatured}, isArchived: ${sentProduct.isArchived}, ProductDetail: ${sentProduct.productdetailId}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changes,
        type: "DELETEKEO-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `${productIdDeleteMessage.internalError}6` }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { product6Id: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productIdPatchMessage = translateProductIdPatch(LanguageToUse)
  try {
    const productType = ProductType.PRODUCT6;
    const body = await req.json();

    const {
      name,
      heading,
      description,
      images,
      imagesalientfeatures,
      productdetailId,
      isFeatured,
      isArchived,
    } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error:productIdPatchMessage.userIdNotFound}),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: productIdPatchMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: productIdPatchMessage.nameRequired }), {
        status: 400,
      });
    }
    if (!heading) {
      return new NextResponse(
        JSON.stringify({ error: productIdPatchMessage.headingRequired }),
        { status: 400 }
      );
    }
    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: productIdPatchMessage.descriptionRequired }),
        { status: 400 }
      );
    }
    if (!images || !images.length) {
      return new NextResponse(
        JSON.stringify({ error: productIdPatchMessage.imagesRequired }),
        { status: 400 }
      );
    }
    if (!productdetailId) {
      return new NextResponse(
        JSON.stringify({ error: productIdPatchMessage.productDetailRequired }),
        { status: 400 }
      );
    }
    if (!imagesalientfeatures || !imagesalientfeatures.length) {
      return new NextResponse(
        JSON.stringify({ error: productIdPatchMessage.imagesAlientFeaturesRequired }),
        { status: 400 }
      );
    }
    if (!params.product6Id) {
      return new NextResponse(
        JSON.stringify({ error: productIdPatchMessage.productIdRequired }),
        { status: 405 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: productIdPatchMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Kiểm tra xem sản phẩm có tồn tại không
    const existingProduct = await prismadb.product.findUnique({
      where: {
        id: params.product6Id,
        productType: productType,
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        productdetail: true,
      },
    });

    // Nếu sản phẩm không tồn tại, trả về lỗi 404
    if (!existingProduct) {
      return new NextResponse(JSON.stringify({ error: productIdPatchMessage.productNotFound }), {
        status: 404,
      });
    }

    // Kiểm tra nếu heading mới trùng với heading của sản phẩm khác trong cùng cửa hàng (ngoại trừ sản phẩm hiện tại)
    const existingProductWithSameHeading = await prismadb.product.findFirst({
      where: {
        heading,
        storeId: params.storeId,
        NOT: {
          id: params.product6Id, // Loại trừ sản phẩm hiện tại
        },
      },
    });

    if (existingProductWithSameHeading) {
      return new NextResponse(
        JSON.stringify({
          error: productIdPatchMessage.headingExists,
        }),
        { status: 400 }
      );
    }

    await prismadb.product.update({
      where: {
        id: params.product6Id,
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
        id: params.product6Id,
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

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingProduct) {
      if (existingProduct.hasOwnProperty(key) && product.hasOwnProperty(key)) {
        if (
          existingProduct[key as keyof typeof existingProduct] !==
          product[key as keyof typeof product]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingProduct[key as keyof typeof existingProduct],
              newValue: product[key as keyof typeof product],
            };
          }
        }
      }
    }

    // Nếu có thay đổi trong imagebillboard, thêm vào danh sách changes
    if (images && images.length) {
      changes["images"] = {
        oldValue: existingProduct?.images.map(
          (image: { url: string }) => image.url
        ),
        newValue: images.map((image: { url: string }) => image.url),
      };
    }

    // Nếu có thay đổi trong imagebillboard, thêm vào danh sách changes
    if (imagesalientfeatures && imagesalientfeatures.length) {
      changes["imagesalientfeatures"] = {
        oldValue: existingProduct?.imagesalientfeatures.map(
          (imagesalientfeatures: { url: string }) => imagesalientfeatures.url
        ),
        newValue: imagesalientfeatures.map(
          (imagesalientfeatures: { url: string }) => imagesalientfeatures.url
        ),
      };
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
        newChange: newChanges,
        oldChange: oldChanges,
        type: "UPDATEKEO-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `${productIdPatchMessage.internalError}6` }),
      { status: 500 }
    );
  }
}

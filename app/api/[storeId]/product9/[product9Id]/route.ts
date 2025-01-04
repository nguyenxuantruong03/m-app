import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import {
  Image,
  Imagesalientfeatures,
  ProductDetail,
  ProductType,
  UserRole,
} from "@prisma/client";
import { createTranslator } from "next-intl";

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
  { params }: { params: { product9Id: string } }
) {
  const productType = ProductType.PRODUCT9;
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!params.product9Id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productIdRequired") }),
        { status: 400 }
      );
    }

    const product = await prismadb.product.findUnique({
      where: {
        name: params.product9Id,
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

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.product.internalErrorGetProduct") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { product9Id: string; storeId: string } }
) {
  const productType = ProductType.PRODUCT9;
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
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!params.product9Id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productIdRequired") }),
        { status: 400 }
      );
    }

    const existingProduct = await prismadb.product.findUnique({
      where: {
        id: params.product9Id,
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
        id: params.product9Id,
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
        type: "DELETEVẬTLIỆUNHÀTẮM-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.product.internalErrorDeleteProduct") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { product9Id: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const productType = ProductType.PRODUCT9;
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

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.name") }),
        {
          status: 400,
        }
      );
    }
    if (!heading) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.headingRequired") }),
        { status: 400 }
      );
    }
    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.description") }),
        { status: 400 }
      );
    }
    if (!images || !images.length) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.imageNotfound") }),
        { status: 400 }
      );
    }
    if (!productdetailId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productDetailRequired") }),
        { status: 400 }
      );
    }
    if (!imagesalientfeatures || !imagesalientfeatures.length) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.product.imageSalientFeaturesRequired"),
        }),
        { status: 400 }
      );
    }
    if (!params.product9Id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productIdRequired") }),
        { status: 405 }
      );
    }

    // Kiểm tra xem sản phẩm có tồn tại không
    const existingProduct = await prismadb.product.findUnique({
      where: {
        id: params.product9Id,
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
      return new NextResponse(
        JSON.stringify({ error: t("toastError.productIdNotFound") }),
        {
          status: 404,
        }
      );
    }

    // Kiểm tra nếu heading mới trùng với heading của sản phẩm khác trong cùng cửa hàng (ngoại trừ sản phẩm hiện tại)
    const existingProductWithSameHeading = await prismadb.product.findFirst({
      where: {
        heading,
        storeId: params.storeId,
        NOT: {
          id: params.product9Id, // Loại trừ sản phẩm hiện tại
        },
      },
    });

    if (existingProductWithSameHeading) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.product.headingExists"),
        }),
        { status: 400 }
      );
    }

    await prismadb.product.update({
      where: {
        id: params.product9Id,
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
        id: params.product9Id,
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
        type: "UPDATEVẬTLIỆUNHÀTẮM-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.product.internalErrorPatchProduct") }),
      { status: 500 }
    );
  }
}

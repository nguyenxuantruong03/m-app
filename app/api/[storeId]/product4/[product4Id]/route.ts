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
  { params }: { params: { product4Id: string } }
) {
  const productType = ProductType.PRODUCT4;
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productIdGetMessage = translateProductIdGet(LanguageToUse);
  try {
    if (!params.product4Id) {
      return new NextResponse(
        JSON.stringify({ error: productIdGetMessage.productIdRequired }),
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language

    const product = await prismadb.product.findUnique({
      where: {
        name: params.product4Id,
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
        JSON.stringify({ error:  productIdGetMessage.productsNotFound }),
        { status: 404 }
      );
    }

    // Dịch tất cả các trường trong sản phẩm
    const translatedProduct = {
      ...product,
      heading: await translateText(product.heading || "", language),
      description: await translateText(product.description || "", language),
      comment: await Promise.all(
        product.comment.map(async (item: any) => ({
          ...item,
          comment: await translateText(item.comment || "", language),
          user: {
            ...item.user,
            issued: await translateText(item.user.issued || "", language),
            gender: await translateText(item.user.gender || "", language),
            degree: await translateText(item.user.degree || "", language),
            maritalStatus: await translateText(
              item.user.maritalStatus || "",
              language
            ),
            workingTime: await translateText(
              item.user.workingTime || "",
              language
            ),
          },
        }))
      ),
      responsecomment: await Promise.all(
        product.responsecomment.map(async (response: any) => ({
          ...response,
          description: await translateText(
            response.description || "",
            language
          ),
          user: {
            ...response.user,
            issued: await translateText(response.user.issued || "", language),
            gender: await translateText(response.user.gender || "", language),
            degree: await translateText(response.user.degree || "", language),
            maritalStatus: await translateText(
              response.user.maritalStatus || "",
              language
            ),
            workingTime: await translateText(
              response.user.workingTime || "",
              language
            ),
          },
        }))
      ),
      productdetail: {
        ...product.productdetail,
        title: await translateText(
          product.productdetail?.title || "",
          language
        ),
        name1: await translateText(
          product.productdetail?.name1 || "",
          language
        ),
        name2: await translateText(
          product.productdetail?.name2 || "",
          language
        ),
        name3: await translateText(
          product.productdetail?.name3 || "",
          language
        ),
        name4: await translateText(
          product.productdetail?.name4 || "",
          language
        ),
        name5: await translateText(
          product.productdetail?.name5 || "",
          language
        ),
        promotionheading: await translateText(
          product.productdetail?.promotionheading || "",
          language
        ),
        promotiondescription: await translateText(
          product.productdetail?.promotiondescription || "",
          language
        ),
        descriptionsalientfeatures: await translateText(
          product.productdetail?.descriptionsalientfeatures || "",
          language
        ),
        description2salientfeatures: await translateText(
          product.productdetail?.description2salientfeatures || "",
          language
        ),
        contentsalientfeatures: await translateText(
          product.productdetail?.contentsalientfeatures || "",
          language
        ),
        descriptionspecifications: await translateText(
          product.productdetail?.descriptionspecifications || "",
          language
        ),
        valuespecifications: await translateText(
          product.productdetail?.valuespecifications || "",
          language
        ),
        description2specifications: await translateText(
          product.productdetail?.description2specifications || "",
          language
        ),
        value2specifications: await translateText(
          product.productdetail?.value2specifications || "",
          language
        ),
        category: {
          ...product.productdetail?.category,
          name: await translateText(
            product.productdetail?.category?.name || "",
            language
          ),
        },
        color1: {
          ...product.productdetail?.color1,
          name: await translateText(
            product.productdetail?.color1?.name || "",
            language
          ),
        },
        color2: {
          ...product.productdetail?.color2,
          name: await translateText(
            product.productdetail?.color2?.name || "",
            language
          ),
        },
        color3: {
          ...product.productdetail?.color3,
          name: await translateText(
            product.productdetail?.color3?.name || "",
            language
          ),
        },
        color4: {
          ...product.productdetail?.color4,
          name: await translateText(
            product.productdetail?.color4?.name || "",
            language
          ),
        },
        color5: {
          ...product.productdetail?.color5,
          name: await translateText(
            product.productdetail?.color5?.name || "",
            language
          ),
        },
        size1: {
          ...product.productdetail?.size1,
          name: await translateText(
            product.productdetail?.size1?.name || "",
            language
          ),
        },
        size2: {
          ...product.productdetail?.size2,
          name: await translateText(
            product.productdetail?.size2?.name || "",
            language
          ),
        },
        size3: {
          ...product.productdetail?.size3,
          name: await translateText(
            product.productdetail?.size3?.name || "",
            language
          ),
        },
        size4: {
          ...product.productdetail?.size4,
          name: await translateText(
            product.productdetail?.size4?.name || "",
            language
          ),
        },
        size5: {
          ...product.productdetail?.size5,
          name: await translateText(
            product.productdetail?.size5?.name || "",
            language
          ),
        },
      },
    };

    return NextResponse.json(translatedProduct);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `${productIdGetMessage.internalError}4` }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { product4Id: string; storeId: string } }
) {
  const productType = ProductType.PRODUCT4;
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

    if (!params.product4Id) {
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
        id: params.product4Id,
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
        id: params.product4Id,
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
        type: "DELETEĐÁCẮT-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `${productIdDeleteMessage.internalError}4` }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { product4Id: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productIdPatchMessage = translateProductIdPatch(LanguageToUse)
  try {
    const productType = ProductType.PRODUCT4;
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
    if (!params.product4Id) {
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

    const existingProduct = await prismadb.product.findUnique({
      where: {
        id: params.product4Id,
        productType: productType,
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        productdetail: true,
      },
    });

    await prismadb.product.update({
      where: {
        id: params.product4Id,
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
        id: params.product4Id,
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
        type: "UPDATEĐÁCẮT-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `${productIdPatchMessage.internalError}4` }),
      { status: 500 }
    );
  }
}

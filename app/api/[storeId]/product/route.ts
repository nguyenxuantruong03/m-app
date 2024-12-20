import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { ProductType, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { translateText } from "@/translate/translate-client";
import {
  translateProductDelete,
  translateProductGet,
  translateProductPost,
} from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productPostMessage = translateProductPost(LanguageToUse);

  try {
    const body = await req.json();
    const {
      name,
      heading,
      description,
      isFeatured,
      isArchived,
      images,
      imagesalientfeatures,
      productdetailId,
    } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.nameRequired }),
        {
          status: 400,
        }
      );
    }
    if (!heading) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.headingRequired }),
        { status: 400 }
      );
    }
    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.descriptionRequired }),
        { status: 400 }
      );
    }
    if (!images || !images.length) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.imagesRequired }),
        { status: 400 }
      );
    }
    if (!productdetailId) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.productDetailRequired }),
        { status: 400 }
      );
    }
    if (!imagesalientfeatures || !imagesalientfeatures.length) {
      return new NextResponse(
        JSON.stringify({
          error: productPostMessage.imagesAlientFeaturesRequired,
        }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    const productDetail = await prismadb.productDetail.findFirst({
      where: {
        id: body.productdetailId,
      },
    });

    // Nếu productDetail không tồn tại, trả về thông báo lỗi
    if (!productDetail) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.chooseProductDetail }),
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
        JSON.stringify({ error: productPostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    const productType = ProductType.PRODUCT;

    // Kiểm tra xem heading mới có trùng với heading của sản phẩm nào đã có trong cùng cửa hàng không
    const existingProduct = await prismadb.product.findFirst({
      where: {
        heading,
        storeId: params.storeId,
        productType: productType,
      },
    });

    if (existingProduct) {
      return new NextResponse(
        JSON.stringify({ error: productPostMessage.headingExists }),
        { status: 400 }
      );
    }

    const product = await prismadb.product.create({
      data: {
        name,
        heading,
        description,
        productType: productType,
        isFeatured,
        isArchived,
        productdetailId,
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
        storeId: params.storeId,
      },
    });

    const sentProduct = {
      name: product?.heading,
      description: product.description,
      ProductType: product.productType,
      images: images.map((image: { url: string }) => image.url),
      imagesalientfeatures: imagesalientfeatures.map(
        (image: { url: string }) => image.url
      ),
      isFeatured: product.isFeatured,
      isArchived: product.isFeatured,
      productdetailId: product.productdetailId,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentProduct.name}, Description: ${sentProduct.description}, ProductType: ${sentProduct.ProductType}, Images: ${sentProduct.images}, ImageSalientfeatures: ${sentProduct.imagesalientfeatures}, isFeatured: ${sentProduct.isFeatured}, isArchived: ${sentProduct.isArchived}, ProductDetail: ${sentProduct.productdetailId}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: changes,
        type: "CREATEPIN-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productPostMessage.internalError }),
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
  const productGetMessage = translateProductGet(LanguageToUse);
  try {
    const { searchParams } = new URL(req.url);
    const isFeaturedParam = searchParams.get("isFeatured");
    const isFeatured =
      isFeaturedParam === null ? undefined : isFeaturedParam === "true";
    const productdetailId = searchParams.get("productdetailId") || undefined;
    const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language
    
    const categoryIds = searchParams.get("categoryId")?.split(",") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    // Lấy giá trị page và limit từ query params, nếu không có thì trả về undefined
    const page = searchParams.has("page") ? parseInt(searchParams.get("page") as string, 10) : undefined;
    const limit = searchParams.has("limit") ? parseInt(searchParams.get("limit") as string, 10) : undefined;

    // Nếu cả page và limit đều có giá trị, tính offset
    const offset = page && limit ? (page - 1) * limit : undefined;

    const productType = ProductType.PRODUCT;
    const productType7 = ProductType.PRODUCT7;
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: productGetMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        isFeatured,
        isArchived: false,
        productType: {
          in: [productType, productType7],
        },
        productdetailId,
        productdetail: {
          ...(categoryIds ? { categoryId: { in: categoryIds } } : {}),
          ...(colorId
            ? {
                OR: [
                  { color1Id: colorId },
                  { color2Id: colorId },
                  { color3Id: colorId },
                  { color4Id: colorId },
                  { color5Id: colorId },
                ],
              }
            : {}),
          ...(sizeId
            ? {
                OR: [
                  { size1Id: sizeId },
                  { size2Id: sizeId },
                  { size3Id: sizeId },
                  { size4Id: sizeId },
                  { size5Id: sizeId },
                ],
              }
            : {}),
        },
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        comment: true,
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
      // Chỉ thêm skip hoặc take nếu offset hoặc limit có giá trị
      ...(offset && { skip: offset }),
      ...(limit && { take: limit }),
      orderBy: {
        createdAt: "desc",
      },
    });

    // Sort by productType alternating between productType and productType7
    const alternatingProducts = [];
    let productTypeQueue = products.filter(p => p && p.productType === productType);  // Explicit check for undefined
    let productType7Queue = products.filter(p => p && p.productType === productType7);  // Explicit check for undefined

    while (productTypeQueue.length || productType7Queue.length) {
      if (productTypeQueue.length) {
        const product = productTypeQueue.shift();
        if (product) {
          alternatingProducts.push(product);  // Only push if product is defined
        }
      }
      if (productType7Queue.length) {
        const product = productType7Queue.shift();
        if (product) {
          alternatingProducts.push(product);  // Only push if product is defined
        }
      }
    }

    const totalProducts = await prismadb.product.count({
      where: {
        storeId: params.storeId,
        isFeatured,
        isArchived: false,
        productdetailId,
        productType: {
          in: [productType, productType7],
        },
        productdetail: {
          ...(categoryIds ? { categoryId: { in: categoryIds } } : {}),
          ...(colorId
            ? {
                OR: [
                  { color1Id: colorId },
                  { color2Id: colorId },
                  { color3Id: colorId },
                  { color4Id: colorId },
                  { color5Id: colorId },
                ],
              }
            : {}),
          ...(sizeId
            ? {
                OR: [
                  { size1Id: sizeId },
                  { size2Id: sizeId },
                  { size3Id: sizeId },
                  { size4Id: sizeId },
                  { size5Id: sizeId },
                ],
              }
            : {}),
        },
      },
    });

   // Kiểm tra xem limit có phải là undefined hay không trước khi tính totalPages
   const totalPages = limit !== undefined ? Math.ceil(totalProducts / limit) : undefined;

    const getTranslatedValue = async (value: any, language: string) => {
      if (language === "vi" || !value) {
        return value; // Trả về giá trị gốc nếu là ngôn ngữ tiếng Việt hoặc không có giá trị
      }
      const translated = await translateText(value, language);
      return translated || value; // Nếu không có kết quả dịch, trả về giá trị gốc
    };

    const translations = await Promise.all(
      alternatingProducts.map(async (product) => {
        const translatedProduct = {
          ...product,
          heading: await getTranslatedValue(product.heading, language),
          description: await getTranslatedValue(product.description, language),
          comment: await Promise.all(
            product.comment.map(async (item) => ({
              ...item,
              comment: await getTranslatedValue(item.comment, language),
            }))
          ),
          productdetail: {
            ...product.productdetail,
            title: await getTranslatedValue(
              product.productdetail?.title,
              language
            ),
            name1: await getTranslatedValue(
              product.productdetail?.name1,
              language
            ),
            name2: await getTranslatedValue(
              product.productdetail?.name2,
              language
            ),
            name3: await getTranslatedValue(
              product.productdetail?.name3,
              language
            ),
            name4: await getTranslatedValue(
              product.productdetail?.name4,
              language
            ),
            name5: await getTranslatedValue(
              product.productdetail?.name5,
              language
            ),
            promotionheading: await getTranslatedValue(
              product.productdetail?.promotionheading,
              language
            ),
            promotiondescription: await getTranslatedValue(
              product.productdetail?.promotiondescription,
              language
            ),
            descriptionsalientfeatures: await getTranslatedValue(
              product.productdetail?.descriptionsalientfeatures,
              language
            ),
            description2salientfeatures: await getTranslatedValue(
              product.productdetail?.description2salientfeatures,
              language
            ),
            description3salientfeatures: await getTranslatedValue(
              product.productdetail?.description3salientfeatures,
              language
            ),
            description4salientfeatures: await getTranslatedValue(
              product.productdetail?.description4salientfeatures,
              language
            ),
            contentsalientfeatures: await getTranslatedValue(
              product.productdetail?.contentsalientfeatures,
              language
            ),
            descriptionspecifications: await getTranslatedValue(
              product.productdetail?.descriptionspecifications,
              language
            ),
            valuespecifications: await getTranslatedValue(
              product.productdetail?.valuespecifications,
              language
            ),
            description2specifications: await getTranslatedValue(
              product.productdetail?.description2specifications,
              language
            ),
            value2specifications: await getTranslatedValue(
              product.productdetail?.value2specifications,
              language
            ),
            description3specifications: await getTranslatedValue(
              product.productdetail?.description3specifications,
              language
            ),
            value3specifications: await getTranslatedValue(
              product.productdetail?.value3specifications,
              language
            ),
            description4specifications: await getTranslatedValue(
              product.productdetail?.description4specifications,
              language
            ),
            value4specifications: await getTranslatedValue(
              product.productdetail?.value4specifications,
              language
            ),
            description5specifications: await getTranslatedValue(
              product.productdetail?.description5specifications,
              language
            ),
            value5specifications: await getTranslatedValue(
              product.productdetail?.value5specifications,
              language
            ),
            description6specifications: await getTranslatedValue(
              product.productdetail?.description6specifications,
              language
            ),
            value6specifications: await getTranslatedValue(
              product.productdetail?.value6specifications,
              language
            ),
            description7specifications: await getTranslatedValue(
              product.productdetail?.description7specifications,
              language
            ),
            value7specifications: await getTranslatedValue(
              product.productdetail?.value7specifications,
              language
            ),
            description8specifications: await getTranslatedValue(
              product.productdetail?.description8specifications,
              language
            ),
            value8specifications: await getTranslatedValue(
              product.productdetail?.value8specifications,
              language
            ),
            description9specifications: await getTranslatedValue(
              product.productdetail?.description9specifications,
              language
            ),
            value9specifications: await getTranslatedValue(
              product.productdetail?.value9specifications,
              language
            ),
            description10specifications: await getTranslatedValue(
              product.productdetail?.description10specifications,
              language
            ),
            value10specifications: await getTranslatedValue(
              product.productdetail?.value10specifications,
              language
            ),
            description11specifications: await getTranslatedValue(
              product.productdetail?.description11specifications,
              language
            ),
            value11specifications: await getTranslatedValue(
              product.productdetail?.value11specifications,
              language
            ),
            description12specifications: await getTranslatedValue(
              product.productdetail?.description12specifications,
              language
            ),
            value12specifications: await getTranslatedValue(
              product.productdetail?.value12specifications,
              language
            ),
            description13specifications: await getTranslatedValue(
              product.productdetail?.description13specifications,
              language
            ),
            value13specifications: await getTranslatedValue(
              product.productdetail?.value13specifications,
              language
            ),
            description14specifications: await getTranslatedValue(
              product.productdetail?.description14specifications,
              language
            ),
            value14specifications: await getTranslatedValue(
              product.productdetail?.value14specifications,
              language
            ),
            category: {
              ...product.productdetail?.category,
              name: await getTranslatedValue(
                product.productdetail?.category?.name,
                language
              ),
            },
            color1: {
              ...product.productdetail?.color1,
              name: await getTranslatedValue(
                product.productdetail?.color1?.name,
                language
              ),
            },
            color2: {
              ...product.productdetail?.color2,
              name: await getTranslatedValue(
                product.productdetail?.color2?.name,
                language
              ),
            },
            color3: {
              ...product.productdetail?.color3,
              name: await getTranslatedValue(
                product.productdetail?.color3?.name,
                language
              ),
            },
            color4: {
              ...product.productdetail?.color4,
              name: await getTranslatedValue(
                product.productdetail?.color4?.name,
                language
              ),
            },
            color5: {
              ...product.productdetail?.color5,
              name: await getTranslatedValue(
                product.productdetail?.color5?.name,
                language
              ),
            },
            size1: {
              ...product.productdetail?.size1,
              name: await getTranslatedValue(
                product.productdetail?.size1?.name,
                language
              ),
            },
            size2: {
              ...product.productdetail?.size2,
              name: await getTranslatedValue(
                product.productdetail?.size2?.name,
                language
              ),
            },
            size3: {
              ...product.productdetail?.size3,
              name: await getTranslatedValue(
                product.productdetail?.size3?.name,
                language
              ),
            },
            size4: {
              ...product.productdetail?.size4,
              name: await getTranslatedValue(
                product.productdetail?.size4?.name,
                language
              ),
            },
            size5: {
              ...product.productdetail?.size5,
              name: await getTranslatedValue(
                product.productdetail?.size5?.name,
                language
              ),
            },
          },
        };

        return translatedProduct;
      })
    );

    return NextResponse.json({
      translations,
      pagination: {
        currentPage: page,
        totalPages
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productGetMessage.internalError }),
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
  const productDeleteMessage = translateProductDelete(LanguageToUse);
  try {
    const body = await req.json();
    const productType = ProductType.PRODUCT;
    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: productDeleteMessage.userNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: productDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: productDeleteMessage.emptyIdsArray }),
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
        JSON.stringify({ error: productDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Fetch all product to delete, including their images
    const ProductToDelete = await prismadb.product.findMany({
      where: {
        productType: productType,
        id: {
          in: ids,
        },
      },
      include: {
        images: true,
        imagesalientfeatures: true,
        productdetail: true,
      },
    });

    // Create an array of changes for logging
    const changesArray = ProductToDelete.map((product) => ({
      name: product.name,
      heading: product.heading,
      description: product.description,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      valueImage: product.images.map((image) => image.url),
      valueImagesalientfeatures: product.imagesalientfeatures.map(
        (image) => image.url
      ),
      productdetail: product.productdetail.title,
    }));

    // Delete all the product in one operation
    await prismadb.product.deleteMany({
      where: {
        productType: productType,
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
            `DeleteName: ${change.name}, Heading: ${change}, Description: ${change.description},isFeatured: ${change.isFeatured}, isArchived: ${change.isArchived}, Image: ${change.valueImage}, Imagesalientfeatures: ${change.valueImagesalientfeatures}, ProductDetail: ${change.productdetail}`
        ),
        type: "DELETEMANY-ĐỒTHƯỜNGDÙNG-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: productDeleteMessage.deleteSuccess });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

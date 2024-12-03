import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { ProductType, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { translateText } from "@/translate/translate-client";
import { translateProductDelete, translateProductGet, translateProductPost } from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productPostMessage = translateProductPost(LanguageToUse)
  try {
    const user = await currentUser();
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
      return new NextResponse(JSON.stringify({ error: productPostMessage.nameRequired }), {
        status: 400,
      });
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
        JSON.stringify({ error: productPostMessage.imagesAlientFeaturesRequired }),
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

    const productType = ProductType.PRODUCT5;
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
        type: "CREATEỔKHÓA-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `${productPostMessage.internalError}5` }),
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
  const productGetMessage = translateProductGet(LanguageToUse)
  try {
    const { searchParams } = new URL(req.url);
    const isFeaturedParam = searchParams.get("isFeatured");
    const isFeatured =
      isFeaturedParam === null ? undefined : isFeaturedParam === "true";
    const productdetailId = searchParams.get("productdetailId") || undefined;
    const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language
    const productType = ProductType.PRODUCT5;
    const productType8 = ProductType.PRODUCT8;
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
          in: [productType, productType8],
        },
        productdetailId,
      },
      include: {
        images: true,
        comment: true,
        imagesalientfeatures: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    // Dịch tất cả các trường trong sản phẩm
    const translations = await Promise.all(
      products.map(async (product) => {
        const translatedProduct = {
          ...product,
          heading: await translateText(product.heading || "", language),
          description: await translateText(product.description || "", language),
          comment: await Promise.all(
            product.comment.map(async (item: any) => ({
              ...item,
              comment: await translateText(item.comment || "", language),
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

        return translatedProduct;
      })
    );

    return NextResponse.json(translations);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error:  `${productGetMessage.internalError}5` }),
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
  const productDeleteMessage = translateProductDelete(LanguageToUse)
  try {
    const body = await req.json();
    const productType = ProductType.PRODUCT5;

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
        type: "DELETEMANY-ỔKHÓA-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: productDeleteMessage.deleteSuccess });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `${productDeleteMessage.internalError}5` }),
      { status: 500 }
    );
  }
}

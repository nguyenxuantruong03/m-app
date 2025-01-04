import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { ProductType, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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
        JSON.stringify({ error: t("toastError.nameRequired") }),
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

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
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
        JSON.stringify({ error: t("toastError.product.chooseProductDetail") }),
        { status: 404 }
      );
    }

    const productType = ProductType.PRODUCT2;

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
        JSON.stringify({ error: t("toastError.product.headingExists") }),
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
      JSON.stringify({ error: t("toastError.product.internalErrorPostProduct") }),
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
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const { searchParams } = new URL(req.url);
    const isFeaturedParam = searchParams.get("isFeatured");
    const isFeatured =
      isFeaturedParam === null ? undefined : isFeaturedParam === "true";
    const productdetailId = searchParams.get("productdetailId") || undefined;
    
    const categoryIds = searchParams.get("categoryId")?.split(",") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    // Lấy giá trị page và limit từ query params, nếu không có thì trả về undefined
    const page = searchParams.has("page") ? parseInt(searchParams.get("page") as string, 10) : undefined;
    const limit = searchParams.has("limit") ? parseInt(searchParams.get("limit") as string, 10) : undefined;

    // Nếu cả page và limit đều có giá trị, tính offset
    const offset = page && limit ? (page - 1) * limit : undefined;

    const productType = ProductType.PRODUCT2;
    const productType0 = ProductType.PRODUCT;
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        isFeatured,
        isArchived: false,
        productType: {
          in: [productType, productType0],
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
    let productType7Queue = products.filter(p => p && p.productType === productType0);  // Explicit check for undefined

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
          in: [productType, productType0],
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

    return NextResponse.json({
      products: alternatingProducts,
      pagination: {
        currentPage: page,
        totalPages
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.product.internalErrorGetProduct") }),
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
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const productType = ProductType.PRODUCT2;
    const { ids } = body;

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

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 400 }
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
        type: "DELETEMANY-ỐNGNHỰA-PRODUCT",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: t("toastSuccess.deletionSuccess") });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.product.internalErrorDeleteProduct") }),
      { status: 500 }
    );
  }
}

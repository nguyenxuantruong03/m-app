import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { Image, Imagesalientfeatures, ProductDetail, ProductType, UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

type ProductValue = string | boolean | Date | string[] | number | Imagesalientfeatures[] | Image[] | ProductDetail | null | undefined;

interface ChangeRecord {
  oldValue: ProductValue;
  newValue: ProductValue;
}

export async function GET(
  req: Request,
  { params }: { params: { product2Id: string } }
) {
  const productType = ProductType.PRODUCT2;
  try {
    if (!params.product2Id) {
      return new NextResponse(
        JSON.stringify({ error: "Product2 id is required!" }),
        { status: 400 }
      );
    }

    const product = await prismadb.product.findUnique({
      where: {
        name: params.product2Id,
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
              }
            },
          }
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
              }
            },
          }
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
          }
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get product2." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { product2Id: string; storeId: string } }
) {
  const productType = ProductType.PRODUCT2;
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.product2Id) {
      return new NextResponse(
        JSON.stringify({ error: "Product2 id is required!" }),
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

    const existingProduct = await prismadb.product.findUnique({
      where: {
        id: params.product2Id,
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
        id: params.product2Id,
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
        type: "DELETEỐNGNHỰA-PRODUCT",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete product2." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { product2Id: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const productType = ProductType.PRODUCT2;
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

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
    }
    if (!heading) {
      return new NextResponse(
        JSON.stringify({ error: "Heading is required!" }),
        { status: 400 }
      );
    }
    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: "Description is required!" }),
        { status: 400 }
      );
    }
    if (!images || !images.length) {
      return new NextResponse(
        JSON.stringify({ error: "Images is required!" }),
        { status: 400 }
      );
    }
    if (!productdetailId) {
      return new NextResponse(
        JSON.stringify({ error: "ProductDetail is required!" }),
        { status: 400 }
      );
    }
    if (!imagesalientfeatures || !imagesalientfeatures.length) {
      return new NextResponse(
        JSON.stringify({ error: "Imagesalientfeatures is required!" }),
        { status: 400 }
      );
    }
    if (!params.product2Id) {
      return new NextResponse(
        JSON.stringify({ error: "Product2 id is required!" }),
        { status: 405 }
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

    const existingProduct = await prismadb.product.findUnique({
      where: {
        id: params.product2Id,
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
        id: params.product2Id,
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
        id: params.product2Id,
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
        type: "UPDATEỐNGNHỰA-PRODUCT",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch product2." }),
      { status: 500 }
    );
  }
}

import { translateText } from "@/translate/translate-client";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { translateFavoriteProductDeleteMany, translateFavoriteProductGet, translateFavoriteProductPost } from "@/translate/translate-api";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteProductPostMessage = translateFavoriteProductPost(LanguageToUse)

  const body = await req.json();
  const { id, productId, userId, selectedSize, selectedColor, productName } =
    body;

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductPostMessage.userIdNotFound }),
      { status: 403 }
    );
  }

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductPostMessage.favoriteIdNotFound }),
      { status: 403 }
    );
  }

  if (!productId) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductPostMessage.productIdRequired }),
      { status: 400 }
    );
  }

  if (!productName) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductPostMessage.productNameRequired }),
      { status: 400 }
    );
  }

  if (!selectedSize) {
    return new NextResponse(JSON.stringify({ error: favoriteProductPostMessage.sizeRequired }), {
      status: 400,
    });
  }

  if (!selectedColor) {
    return new NextResponse(JSON.stringify({ error: favoriteProductPostMessage.colorRequired }), {
      status: 400,
    });
  }

  try {
    const favoriteProduct = await prismadb.favoriteProduct.create({
      data: {
        id: id,
        productName,
        productId,
        userId,
        selectedSize,
        selectedColor,
      },
    });

    return NextResponse.json(favoriteProduct);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductPostMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteProductDeleteManyMessage = translateFavoriteProductDeleteMany(LanguageToUse)

  const body = await req.json();
  const { id, userId } = body;

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductDeleteManyMessage.userIdNotFound }),
      { status: 403 }
    );
  }

  if (!id) {
    return new NextResponse(JSON.stringify({ error: favoriteProductDeleteManyMessage.idNotFound }), {
      status: 403,
    });
  }

  try {
    const favoriteProduct = await prismadb.favoriteProduct.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return NextResponse.json(favoriteProduct);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductDeleteManyMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteProductGetMessage = translateFavoriteProductGet(LanguageToUse)
  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language
    const userId = searchParams.get("userId") || ""; // Mặc định là "vi" nếu không có language

    const favoriteProducts = await prismadb.favoriteProduct.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        product: {
          include: {
            images: true,
            comment: true,
            productdetail: {
              include: {
                size1: true,
                color1: true,
                size2: true,
                color2: true,
                size3: true,
                color3: true,
                size4: true,
                color4: true,
                size5: true,
                color5: true,
                category: true,
              },
            },
          },
        },
      },
    });

    // Dịch tất cả các trường trong sản phẩm
    const translations = await Promise.all(
      favoriteProducts.map(async (favoriteProduct) => {
        // Dịch các trường chung
        const translatedOrder = {
          ...favoriteProduct,
          product: {
            ...favoriteProduct.product,
            heading: await translateText(
              favoriteProduct.product?.heading || "",
              language
            ), // Dịch product.heading
            description: await translateText(
              favoriteProduct.product?.description || "",
              language
            ), // Dịch product.description
            productdetail: {
              ...favoriteProduct.product.productdetail,
              title: await translateText(
                favoriteProduct.product.productdetail?.title || "",
                language
              ),
              name1: await translateText(
                favoriteProduct.product.productdetail?.name1 || "",
                language
              ),
              name2: await translateText(
                favoriteProduct.product.productdetail?.name2 || "",
                language
              ),
              name3: await translateText(
                favoriteProduct.product.productdetail?.name3 || "",
                language
              ),
              name4: await translateText(
                favoriteProduct.product.productdetail?.name4 || "",
                language
              ),
              name5: await translateText(
                favoriteProduct.product.productdetail?.name5 || "",
                language
              ),
              promotionheading: await translateText(
                favoriteProduct.product.productdetail?.promotionheading || "",
                language
              ),
              promotiondescription: await translateText(
                favoriteProduct.product.productdetail?.promotiondescription ||
                  "",
                language
              ),
              descriptionsalientfeatures: await translateText(
                favoriteProduct.product.productdetail
                  ?.descriptionsalientfeatures || "",
                language
              ),
              description2salientfeatures: await translateText(
                favoriteProduct.product.productdetail
                  ?.description2salientfeatures || "",
                language
              ),
              contentsalientfeatures: await translateText(
                favoriteProduct.product.productdetail?.contentsalientfeatures ||
                  "",
                language
              ),
              descriptionspecifications: await translateText(
                favoriteProduct.product.productdetail
                  ?.descriptionspecifications || "",
                language
              ),
              valuespecifications: await translateText(
                favoriteProduct.product.productdetail?.valuespecifications ||
                  "",
                language
              ),
              description2specifications: await translateText(
                favoriteProduct.product.productdetail
                  ?.description2specifications || "",
                language
              ),
              value2specifications: await translateText(
                favoriteProduct.product.productdetail?.value2specifications ||
                  "",
                language
              ),
              category: {
                ...favoriteProduct.product.productdetail?.category,
                name: await translateText(
                  favoriteProduct.product.productdetail?.category?.name || "",
                  language
                ),
              },
              color1: {
                ...favoriteProduct.product.productdetail?.color1,
                name: await translateText(
                  favoriteProduct.product.productdetail?.color1?.name || "",
                  language
                ),
              },
              color2: {
                ...favoriteProduct.product.productdetail?.color2,
                name: await translateText(
                  favoriteProduct.product.productdetail?.color2?.name || "",
                  language
                ),
              },
              color3: {
                ...favoriteProduct.product.productdetail?.color3,
                name: await translateText(
                  favoriteProduct.product.productdetail?.color3?.name || "",
                  language
                ),
              },
              color4: {
                ...favoriteProduct.product.productdetail?.color4,
                name: await translateText(
                  favoriteProduct.product.productdetail?.color4?.name || "",
                  language
                ),
              },
              color5: {
                ...favoriteProduct.product.productdetail?.color5,
                name: await translateText(
                  favoriteProduct.product.productdetail?.color5?.name || "",
                  language
                ),
              },
              size1: {
                ...favoriteProduct.product.productdetail?.size1,
                name: await translateText(
                  favoriteProduct.product.productdetail?.size1?.name || "",
                  language
                ),
              },
              size2: {
                ...favoriteProduct.product.productdetail?.size2,
                name: await translateText(
                  favoriteProduct.product.productdetail?.size2?.name || "",
                  language
                ),
              },
              size3: {
                ...favoriteProduct.product.productdetail?.size3,
                name: await translateText(
                  favoriteProduct.product.productdetail?.size3?.name || "",
                  language
                ),
              },
              size4: {
                ...favoriteProduct.product.productdetail?.size4,
                name: await translateText(
                  favoriteProduct.product.productdetail?.size4?.name || "",
                  language
                ),
              },
              size5: {
                ...favoriteProduct.product.productdetail?.size5,
                name: await translateText(
                  favoriteProduct.product.productdetail?.size5?.name || "",
                  language
                ),
              },
            },
            comment: await Promise.all(
              favoriteProduct.product.comment.map(async (item: any) => ({
                ...item,
                comment: await translateText(item.comment || "", language),
              }))
            ),
          },
          user: {
            ...favoriteProduct.user,
            bio: await translateText(favoriteProduct.user.bio || "", language),
            issued: await translateText(
              favoriteProduct.user.issued || "",
              language
            ),
            gender: await translateText(
              favoriteProduct.user.gender || "",
              language
            ),
            degree: await translateText(
              favoriteProduct.user.degree || "",
              language
            ),
            maritalStatus: await translateText(
              favoriteProduct.user.maritalStatus || "",
              language
            ),
            workingTime: await translateText(
              favoriteProduct.user.workingTime || "",
              language
            ),
          },
        };

        return translatedOrder;
      })
    );

    return NextResponse.json(translations);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: favoriteProductGetMessage }),
      { status: 500 }
    );
  }
}

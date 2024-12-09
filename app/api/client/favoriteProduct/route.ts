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
        const translateField = async (field: any, language: string) => {
          if (language === "vi") return field; // Không dịch nếu ngôn ngữ là 'vi'
          try {
            return await translateText(field || "", language); // Dịch nếu có hàm translateText
          } catch {
            return field; // Trả về dữ liệu mặc định nếu lỗi
          }
        };
    
        const translatedOrder = {
          ...favoriteProduct,
          product: {
            ...favoriteProduct.product,
            heading: await translateField(favoriteProduct.product?.heading, language),
            description: await translateField(
              favoriteProduct.product?.description,
              language
            ),
            productdetail: {
              ...favoriteProduct.product.productdetail,
              title: await translateField(favoriteProduct.product.productdetail?.title, language),
              name1: await translateField(favoriteProduct.product.productdetail?.name1, language),
              name2: await translateField(favoriteProduct.product.productdetail?.name2, language),
              name3: await translateField(favoriteProduct.product.productdetail?.name3, language),
              name4: await translateField(favoriteProduct.product.productdetail?.name4, language),
              name5: await translateField(favoriteProduct.product.productdetail?.name5, language),
              promotionheading: await translateField(
                favoriteProduct.product.productdetail?.promotionheading,
                language
              ),
              promotiondescription: await translateField(
                favoriteProduct.product.productdetail?.promotiondescription,
                language
              ),
              descriptionsalientfeatures: await translateField(
                favoriteProduct.product.productdetail?.descriptionsalientfeatures,
                language
              ),
              description2salientfeatures: await translateField(
                favoriteProduct.product.productdetail?.description2salientfeatures,
                language
              ),
              contentsalientfeatures: await translateField(
                favoriteProduct.product.productdetail?.contentsalientfeatures,
                language
              ),
              descriptionspecifications: await translateField(
                favoriteProduct.product.productdetail?.descriptionspecifications,
                language
              ),
              valuespecifications: await translateField(
                favoriteProduct.product.productdetail?.valuespecifications,
                language
              ),
              description2specifications: await translateField(
                favoriteProduct.product.productdetail?.description2specifications,
                language
              ),
              value2specifications: await translateField(
                favoriteProduct.product.productdetail?.value2specifications,
                language
              ),
              description3specifications: await translateField(favoriteProduct.product.productdetail?.description3specifications, language),
                value3specifications: await translateField(favoriteProduct.product.productdetail?.value3specifications, language),
                description4specifications: await translateField(favoriteProduct.product.productdetail?.description4specifications, language),
                value4specifications: await translateField(favoriteProduct.product.productdetail?.value4specifications, language),
                description5specifications: await translateField(favoriteProduct.product.productdetail?.description5specifications, language),
                value5specifications: await translateField(favoriteProduct.product.productdetail?.value5specifications, language),
                description6specifications: await translateField(favoriteProduct.product.productdetail?.description6specifications, language),
                value6specifications: await translateField(favoriteProduct.product.productdetail?.value6specifications, language),
                description7specifications: await translateField(favoriteProduct.product.productdetail?.description7specifications, language),
                value7specifications: await translateField(favoriteProduct.product.productdetail?.value7specifications, language),
                description8specifications: await translateField(favoriteProduct.product.productdetail?.description8specifications, language),
                value8specifications: await translateField(favoriteProduct.product.productdetail?.value8specifications, language),
                description9specifications: await translateField(favoriteProduct.product.productdetail?.description9specifications, language),
                value9specifications: await translateField(favoriteProduct.product.productdetail?.value9specifications, language),
                description10specifications: await translateField(favoriteProduct.product.productdetail?.description10specifications, language),
                value10specifications: await translateField(favoriteProduct.product.productdetail?.value10specifications, language),
                description11specifications: await translateField(favoriteProduct.product.productdetail?.description11specifications, language),
                value11specifications: await translateField(favoriteProduct.product.productdetail?.value11specifications, language),
                description12specifications: await translateField(favoriteProduct.product.productdetail?.description12specifications, language),
                value12specifications: await translateField(favoriteProduct.product.productdetail?.value12specifications, language),
                description13specifications: await translateField(favoriteProduct.product.productdetail?.description13specifications, language),
                value13specifications: await translateField(favoriteProduct.product.productdetail?.value13specifications, language),
                description14specifications: await translateField(favoriteProduct.product.productdetail?.description14specifications, language),
                value14specifications: await translateField(favoriteProduct.product.productdetail?.value14specifications, language),
              category: {
                ...favoriteProduct.product.productdetail?.category,
                name: await translateField(
                  favoriteProduct.product.productdetail?.category?.name,
                  language
                ),
              },
              color1: {
                ...favoriteProduct.product.productdetail?.color1,
                name: await translateField(
                  favoriteProduct.product.productdetail?.color1?.name,
                  language
                ),
              },
              color2: {
                ...favoriteProduct.product.productdetail?.color2,
                name: await translateField(
                  favoriteProduct.product.productdetail?.color2?.name,
                  language
                ),
              },
              color3: {
                ...favoriteProduct.product.productdetail?.color3,
                name: await translateField(
                  favoriteProduct.product.productdetail?.color3?.name,
                  language
                ),
              },
              color4: {
                ...favoriteProduct.product.productdetail?.color4,
                name: await translateField(
                  favoriteProduct.product.productdetail?.color4?.name,
                  language
                ),
              },
              color5: {
                ...favoriteProduct.product.productdetail?.color5,
                name: await translateField(
                  favoriteProduct.product.productdetail?.color5?.name,
                  language
                ),
              },
              size1: {
                ...favoriteProduct.product.productdetail?.size1,
                name: await translateField(
                  favoriteProduct.product.productdetail?.size1?.name,
                  language
                ),
              },
              size2: {
                ...favoriteProduct.product.productdetail?.size2,
                name: await translateField(
                  favoriteProduct.product.productdetail?.size2?.name,
                  language
                ),
              },
              size3: {
                ...favoriteProduct.product.productdetail?.size3,
                name: await translateField(
                  favoriteProduct.product.productdetail?.size3?.name,
                  language
                ),
              },
              size4: {
                ...favoriteProduct.product.productdetail?.size4,
                name: await translateField(
                  favoriteProduct.product.productdetail?.size4?.name,
                  language
                ),
              },
              size5: {
                ...favoriteProduct.product.productdetail?.size5,
                name: await translateField(
                  favoriteProduct.product.productdetail?.size5?.name,
                  language
                ),
              },
            },
            comment: await Promise.all(
              favoriteProduct.product.comment.map(async (item) => ({
                ...item,
                comment: await translateField(item.comment, language),
              }))
            ),
          },
          user: {
            ...favoriteProduct.user,
            bio: await translateField(favoriteProduct.user?.bio, language),
            issued: await translateField(favoriteProduct.user?.issued, language),
            gender: await translateField(favoriteProduct.user?.gender, language),
            degree: await translateField(favoriteProduct.user?.degree, language),
            maritalStatus: await translateField(
              favoriteProduct.user?.maritalStatus,
              language
            ),
            workingTime: await translateField(
              favoriteProduct.user?.workingTime,
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

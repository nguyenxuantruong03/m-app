import { translateText } from "@/translate/translate-client";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { translateCartItemGet } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const cartItemGetMessage = translateCartItemGet(LanguageToUse)
  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language
    const userId = searchParams.get("userId") || ""; // Mặc định là "vi" nếu không có language

    const carts = await prismadb.cartItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        product: {
          include: {
            images: true,
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
      carts.map(async (cart) => {
        // Dịch các trường chung
        const translatedOrder = {
          ...cart,
          product: {
            ...cart.product,
            heading: await translateText(cart.product?.heading || "", language), // Dịch product.heading
            description: await translateText(
              cart.product?.description || "",
              language
            ), // Dịch product.description
            productdetail: {
              ...cart.product.productdetail,
              title: await translateText(
                cart.product.productdetail?.title || "",
                language
              ),
              name1: await translateText(
                cart.product.productdetail?.name1 || "",
                language
              ),
              name2: await translateText(
                cart.product.productdetail?.name2 || "",
                language
              ),
              name3: await translateText(
                cart.product.productdetail?.name3 || "",
                language
              ),
              name4: await translateText(
                cart.product.productdetail?.name4 || "",
                language
              ),
              name5: await translateText(
                cart.product.productdetail?.name5 || "",
                language
              ),
              promotionheading: await translateText(
                cart.product.productdetail?.promotionheading || "",
                language
              ),
              promotiondescription: await translateText(
                cart.product.productdetail?.promotiondescription || "",
                language
              ),
              descriptionsalientfeatures: await translateText(
                cart.product.productdetail?.descriptionsalientfeatures || "",
                language
              ),
              description2salientfeatures: await translateText(
                cart.product.productdetail?.description2salientfeatures || "",
                language
              ),
              contentsalientfeatures: await translateText(
                cart.product.productdetail?.contentsalientfeatures || "",
                language
              ),
              descriptionspecifications: await translateText(
                cart.product.productdetail?.descriptionspecifications || "",
                language
              ),
              valuespecifications: await translateText(
                cart.product.productdetail?.valuespecifications || "",
                language
              ),
              description2specifications: await translateText(
                cart.product.productdetail?.description2specifications || "",
                language
              ),
              value2specifications: await translateText(
                cart.product.productdetail?.value2specifications || "",
                language
              ),
              category: {
                ...cart.product.productdetail?.category,
                name: await translateText(
                  cart.product.productdetail?.category?.name || "",
                  language
                ),
              },
              color1: {
                ...cart.product.productdetail?.color1,
                name: await translateText(
                  cart.product.productdetail?.color1?.name || "",
                  language
                ),
              },
              color2: {
                ...cart.product.productdetail?.color2,
                name: await translateText(
                  cart.product.productdetail?.color2?.name || "",
                  language
                ),
              },
              color3: {
                ...cart.product.productdetail?.color3,
                name: await translateText(
                  cart.product.productdetail?.color3?.name || "",
                  language
                ),
              },
              color4: {
                ...cart.product.productdetail?.color4,
                name: await translateText(
                  cart.product.productdetail?.color4?.name || "",
                  language
                ),
              },
              color5: {
                ...cart.product.productdetail?.color5,
                name: await translateText(
                  cart.product.productdetail?.color5?.name || "",
                  language
                ),
              },
              size1: {
                ...cart.product.productdetail?.size1,
                name: await translateText(
                  cart.product.productdetail?.size1?.name || "",
                  language
                ),
              },
              size2: {
                ...cart.product.productdetail?.size2,
                name: await translateText(
                  cart.product.productdetail?.size2?.name || "",
                  language
                ),
              },
              size3: {
                ...cart.product.productdetail?.size3,
                name: await translateText(
                  cart.product.productdetail?.size3?.name || "",
                  language
                ),
              },
              size4: {
                ...cart.product.productdetail?.size4,
                name: await translateText(
                  cart.product.productdetail?.size4?.name || "",
                  language
                ),
              },
              size5: {
                ...cart.product.productdetail?.size5,
                name: await translateText(
                  cart.product.productdetail?.size5?.name || "",
                  language
                ),
              },
            },
          },
          user: {
            ...cart.user,
            bio: await translateText(cart.user.bio || "", language),
            issued: await translateText(cart.user.issued || "", language),
            gender: await translateText(cart.user.gender || "", language),
            degree: await translateText(cart.user.degree || "", language),
            maritalStatus: await translateText(
              cart.user.maritalStatus || "",
              language
            ),
            workingTime: await translateText(
              cart.user.workingTime || "",
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
      JSON.stringify({ error: cartItemGetMessage}),
      { status: 500 }
    );
  }
}

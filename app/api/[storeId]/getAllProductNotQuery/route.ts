import { translateText } from "@/translate/translate-client";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { translateGetProductNotQuery, translateProductNotQueryPatch } from "@/translate/translate-api";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productNotQueryMessage = translateGetProductNotQuery(LanguageToUse);

  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "vi"; // Lấy language từ query, mặc định là "vi"
  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: productNotQueryMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
      },
      select: {
        id: true,
        productType: true,
        images: true,
        isProductShowLive: true,
        isProductLivePin: true,
        heading: true,
        name: true,
        sold: true,
        timeSaleStart: true,
        timeSaleEnd: true,
        isSale: true,
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
          },
        };

        return translatedProduct;
      })
    );

    return NextResponse.json(translations);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productNotQueryMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productNotQueryPatchMessage = translateProductNotQueryPatch(LanguageToUse);
  try {
    const body = await req.json();
    const { id, isProductShowLive, isProductLivePin } = body;

    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: productNotQueryPatchMessage.productIdNotFound }),
        { status: 403 }
      );
    }

    // Nếu isProductLivePin được đặt là true, cần cập nhật tất cả sản phẩm khác thành false
    if (isProductLivePin) {
      await prismadb.product.updateMany({
        where: {
          id: {
            not: id, // Chỉ cập nhật các sản phẩm không phải là id hiện tại
          },
        },
        data: {
          isProductLivePin: false,
        },
      });
    }

    const product = await prismadb.product.update({
      where: { id },
      data: {
        isProductShowLive,
        isProductLivePin,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: productNotQueryPatchMessage.internalError }),
      { status: 500 }
    );
  }
}

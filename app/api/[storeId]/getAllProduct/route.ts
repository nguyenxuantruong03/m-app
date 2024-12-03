import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { translateText } from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import { translateProductGetAll } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const productGetAllMessage = translateProductGetAll(LanguageToUse);

  try {
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("isFeatured");
    const language = searchParams.get("language") || "vi"; // Lấy language từ query, mặc định là "vi"

    // Fetch danh sách sản phẩm từ Prisma
    const products = await prismadb.product.findMany({
      where: {
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
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
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: productGetAllMessage }),
      { status: 500 }
    );
  }
}

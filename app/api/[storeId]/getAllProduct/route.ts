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
    
    const getTranslatedValue = async (value:any, language: string) => {
      if (language === "vi" || !value) {
        return value;  // Trả về giá trị gốc nếu là ngôn ngữ tiếng Việt hoặc không có giá trị
      }
      const translated = await translateText(value, language);
      return translated || value;  // Nếu không có kết quả dịch, trả về giá trị gốc
    };
    
    const translations = await Promise.all(
      products.map(async (product) => {
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
            title: await getTranslatedValue(product.productdetail?.title, language),
            name1: await getTranslatedValue(product.productdetail?.name1, language),
            name2: await getTranslatedValue(product.productdetail?.name2, language),
            name3: await getTranslatedValue(product.productdetail?.name3, language),
            name4: await getTranslatedValue(product.productdetail?.name4, language),
            name5: await getTranslatedValue(product.productdetail?.name5, language),
            promotionheading: await getTranslatedValue(product.productdetail?.promotionheading, language),
            promotiondescription: await getTranslatedValue(product.productdetail?.promotiondescription, language),
            descriptionsalientfeatures: await getTranslatedValue(product.productdetail?.descriptionsalientfeatures, language),
            description2salientfeatures: await getTranslatedValue(product.productdetail?.description2salientfeatures, language),
            description3salientfeatures: await getTranslatedValue(product.productdetail?.description3salientfeatures, language),
            description4salientfeatures: await getTranslatedValue(product.productdetail?.description4salientfeatures, language),
            contentsalientfeatures: await getTranslatedValue(product.productdetail?.contentsalientfeatures, language),
            descriptionspecifications: await getTranslatedValue(product.productdetail?.descriptionspecifications, language),
            valuespecifications: await getTranslatedValue(product.productdetail?.valuespecifications, language),
            description2specifications: await getTranslatedValue(product.productdetail?.description2specifications, language),
            value2specifications: await getTranslatedValue(product.productdetail?.value2specifications, language),
            description3specifications: await getTranslatedValue(product.productdetail?.description3specifications, language),
            value3specifications: await getTranslatedValue(product.productdetail?.value3specifications, language),
            description4specifications: await getTranslatedValue(product.productdetail?.description4specifications, language),
            value4specifications: await getTranslatedValue(product.productdetail?.value4specifications, language),
            description5specifications: await getTranslatedValue(product.productdetail?.description5specifications, language),
            value5specifications: await getTranslatedValue(product.productdetail?.value5specifications, language),
            description6specifications: await getTranslatedValue(product.productdetail?.description6specifications, language),
            value6specifications: await getTranslatedValue(product.productdetail?.value6specifications, language),
            description7specifications: await getTranslatedValue(product.productdetail?.description7specifications, language),
            value7specifications: await getTranslatedValue(product.productdetail?.value7specifications, language),
            description8specifications: await getTranslatedValue(product.productdetail?.description8specifications, language),
            value8specifications: await getTranslatedValue(product.productdetail?.value8specifications, language),
            description9specifications: await getTranslatedValue(product.productdetail?.description9specifications, language),
            value9specifications: await getTranslatedValue(product.productdetail?.value9specifications, language),
            description10specifications: await getTranslatedValue(product.productdetail?.description10specifications, language),
            value10specifications: await getTranslatedValue(product.productdetail?.value10specifications, language),
            description11specifications: await getTranslatedValue(product.productdetail?.description11specifications, language),
            value11specifications: await getTranslatedValue(product.productdetail?.value11specifications, language),
            description12specifications: await getTranslatedValue(product.productdetail?.description12specifications, language),
            value12specifications: await getTranslatedValue(product.productdetail?.value12specifications, language),
            description13specifications: await getTranslatedValue(product.productdetail?.description13specifications, language),
            value13specifications: await getTranslatedValue(product.productdetail?.value13specifications, language),
            description14specifications: await getTranslatedValue(product.productdetail?.description14specifications, language),
            value14specifications: await getTranslatedValue(product.productdetail?.value14specifications, language),
            category: {
              ...product.productdetail?.category,
              name: await getTranslatedValue(product.productdetail?.category?.name, language),
            },
            color1: {
              ...product.productdetail?.color1,
              name: await getTranslatedValue(product.productdetail?.color1?.name, language),
            },
            color2: {
              ...product.productdetail?.color2,
              name: await getTranslatedValue(product.productdetail?.color2?.name, language),
            },
            color3: {
              ...product.productdetail?.color3,
              name: await getTranslatedValue(product.productdetail?.color3?.name, language),
            },
            color4: {
              ...product.productdetail?.color4,
              name: await getTranslatedValue(product.productdetail?.color4?.name, language),
            },
            color5: {
              ...product.productdetail?.color5,
              name: await getTranslatedValue(product.productdetail?.color5?.name, language),
            },
            size1: {
              ...product.productdetail?.size1,
              name: await getTranslatedValue(product.productdetail?.size1?.name, language),
            },
            size2: {
              ...product.productdetail?.size2,
              name: await getTranslatedValue(product.productdetail?.size2?.name, language),
            },
            size3: {
              ...product.productdetail?.size3,
              name: await getTranslatedValue(product.productdetail?.size3?.name, language),
            },
            size4: {
              ...product.productdetail?.size4,
              name: await getTranslatedValue(product.productdetail?.size4?.name, language),
            },
            size5: {
              ...product.productdetail?.size5,
              name: await getTranslatedValue(product.productdetail?.size5?.name, language),
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

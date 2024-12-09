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

    const translations = await Promise.all(
      carts.map(async (cart) => {
        const translateField = async (field: any, language: string) => {
          if (language === "vi") return field; // Không dịch nếu ngôn ngữ là 'vi'
          try {
            return await translateText(field || "", language); // Dịch nếu có hàm translateText
          } catch {
            return field; // Trả về dữ liệu mặc định nếu lỗi
          }
        };
    
        const translatedOrder = {
          ...cart,
          product: {
            ...cart.product,
            heading: await translateField(cart.product?.heading, language),
            description: await translateField(cart.product?.description, language),
            productdetail: {
              ...cart.product.productdetail,
              title: await translateField(cart.product.productdetail?.title, language),
              name1: await translateField(cart.product.productdetail?.name1, language),
              name2: await translateField(cart.product.productdetail?.name2, language),
              name3: await translateField(cart.product.productdetail?.name3, language),
              name4: await translateField(cart.product.productdetail?.name4, language),
              name5: await translateField(cart.product.productdetail?.name5, language),
              promotionheading: await translateField(
                cart.product.productdetail?.promotionheading,
                language
              ),
              promotiondescription: await translateField(
                cart.product.productdetail?.promotiondescription,
                language
              ),
              descriptionsalientfeatures: await translateField(
                cart.product.productdetail?.descriptionsalientfeatures,
                language
              ),
              description2salientfeatures: await translateField(
                cart.product.productdetail?.description2salientfeatures,
                language
              ),
              contentsalientfeatures: await translateField(
                cart.product.productdetail?.contentsalientfeatures,
                language
              ),
              descriptionspecifications: await translateField(
                cart.product.productdetail?.descriptionspecifications,
                language
              ),
              valuespecifications: await translateField(
                cart.product.productdetail?.valuespecifications,
                language
              ),
              description2specifications: await translateField(
                cart.product.productdetail?.description2specifications,
                language
              ),
              value2specifications: await translateField(
                cart.product.productdetail?.value2specifications,
                language
              ),
              description3specifications: await translateField(cart.product.productdetail?.description3specifications, language),
                value3specifications: await translateField(cart.product.productdetail?.value3specifications, language),
                description4specifications: await translateField(cart.product.productdetail?.description4specifications, language),
                value4specifications: await translateField(cart.product.productdetail?.value4specifications, language),
                description5specifications: await translateField(cart.product.productdetail?.description5specifications, language),
                value5specifications: await translateField(cart.product.productdetail?.value5specifications, language),
                description6specifications: await translateField(cart.product.productdetail?.description6specifications, language),
                value6specifications: await translateField(cart.product.productdetail?.value6specifications, language),
                description7specifications: await translateField(cart.product.productdetail?.description7specifications, language),
                value7specifications: await translateField(cart.product.productdetail?.value7specifications, language),
                description8specifications: await translateField(cart.product.productdetail?.description8specifications, language),
                value8specifications: await translateField(cart.product.productdetail?.value8specifications, language),
                description9specifications: await translateField(cart.product.productdetail?.description9specifications, language),
                value9specifications: await translateField(cart.product.productdetail?.value9specifications, language),
                description10specifications: await translateField(cart.product.productdetail?.description10specifications, language),
                value10specifications: await translateField(cart.product.productdetail?.value10specifications, language),
                description11specifications: await translateField(cart.product.productdetail?.description11specifications, language),
                value11specifications: await translateField(cart.product.productdetail?.value11specifications, language),
                description12specifications: await translateField(cart.product.productdetail?.description12specifications, language),
                value12specifications: await translateField(cart.product.productdetail?.value12specifications, language),
                description13specifications: await translateField(cart.product.productdetail?.description13specifications, language),
                value13specifications: await translateField(cart.product.productdetail?.value13specifications, language),
                description14specifications: await translateField(cart.product.productdetail?.description14specifications, language),
                value14specifications: await translateField(cart.product.productdetail?.value14specifications, language),
              category: {
                ...cart.product.productdetail?.category,
                name: await translateField(cart.product.productdetail?.category?.name, language),
              },
              color1: {
                ...cart.product.productdetail?.color1,
                name: await translateField(cart.product.productdetail?.color1?.name, language),
              },
              color2: {
                ...cart.product.productdetail?.color2,
                name: await translateField(cart.product.productdetail?.color2?.name, language),
              },
              color3: {
                ...cart.product.productdetail?.color3,
                name: await translateField(cart.product.productdetail?.color3?.name, language),
              },
              color4: {
                ...cart.product.productdetail?.color4,
                name: await translateField(cart.product.productdetail?.color4?.name, language),
              },
              color5: {
                ...cart.product.productdetail?.color5,
                name: await translateField(cart.product.productdetail?.color5?.name, language),
              },
              size1: {
                ...cart.product.productdetail?.size1,
                name: await translateField(cart.product.productdetail?.size1?.name, language),
              },
              size2: {
                ...cart.product.productdetail?.size2,
                name: await translateField(cart.product.productdetail?.size2?.name, language),
              },
              size3: {
                ...cart.product.productdetail?.size3,
                name: await translateField(cart.product.productdetail?.size3?.name, language),
              },
              size4: {
                ...cart.product.productdetail?.size4,
                name: await translateField(cart.product.productdetail?.size4?.name, language),
              },
              size5: {
                ...cart.product.productdetail?.size5,
                name: await translateField(cart.product.productdetail?.size5?.name, language),
              },
            },
          },
          user: {
            ...cart.user,
            bio: await translateField(cart.user?.bio, language),
            issued: await translateField(cart.user?.issued, language),
            gender: await translateField(cart.user?.gender, language),
            degree: await translateField(cart.user?.degree, language),
            maritalStatus: await translateField(cart.user?.maritalStatus, language),
            workingTime: await translateField(cart.user?.workingTime, language),
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

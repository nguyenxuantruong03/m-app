import { translateText } from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { translateWareHouseGet } from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const wareHouseGetMessage = translateWareHouseGet(LanguageToUse)
  try {
    const { searchParams } = new URL(req.url);
    // const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language
    const language = "vi"; // Mặc định là "vi" nếu không có language

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: wareHouseGetMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    const orders = await prismadb.order.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        orderItem: {
          include: {
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
        },
      },
    });

    // Hàm dịch một trường với kiểm tra ngôn ngữ
const translateField = async (field: any, language: string) => {
  if (language === "vi" || !field) return field; // Không dịch nếu ngôn ngữ là "vi" hoặc không có giá trị
  const translated = await translateText(field, language);
  return translated || field; // Trả về bản dịch nếu có, ngược lại giữ lại giá trị gốc
};

// Dịch tất cả các trường trong đơn hàng
const translations = await Promise.all(
  orders.map(async (order) => {
    const shipper = order.userIdShipper
      ? await prismadb.user.findUnique({
          where: { id: order.userIdShipper },
        })
      : null;

    // Dịch các trường chung
    const translatedOrder = {
      ...order,
      deliveryMethod: await translateField(order.deliveryMethod, language),
      orderItem: await Promise.all(
        order.orderItem.map(async (item) => {
          const translatedItem = {
            ...item,
            product: {
              ...item.product,
              heading: await translateField(item.product?.heading, language), // Dịch product.heading
              description: await translateField(item.product?.description, language), // Dịch product.description
              productdetail: {
                ...item.product.productdetail,
                title: await translateField(item.product.productdetail?.title, language),
                name1: await translateField(item.product.productdetail?.name1, language),
                name2: await translateField(item.product.productdetail?.name2, language),
                name3: await translateField(item.product.productdetail?.name3, language),
                name4: await translateField(item.product.productdetail?.name4, language),
                name5: await translateField(item.product.productdetail?.name5, language),
                promotionheading: await translateField(item.product.productdetail?.promotionheading, language),
                promotiondescription: await translateField(item.product.productdetail?.promotiondescription, language),
                descriptionsalientfeatures: await translateField(item.product.productdetail?.descriptionsalientfeatures, language),
                description2salientfeatures: await translateField(item.product.productdetail?.description2salientfeatures, language),
                description3salientfeatures: await translateField(item.product.productdetail?.description3salientfeatures, language),
                description4salientfeatures: await translateField(item.product.productdetail?.description4salientfeatures, language),
                contentsalientfeatures: await translateField(item.product.productdetail?.contentsalientfeatures, language),
                descriptionspecifications: await translateField(item.product.productdetail?.descriptionspecifications, language),
                valuespecifications: await translateField(item.product.productdetail?.valuespecifications, language),
                description2specifications: await translateField(item.product.productdetail?.description2specifications, language),
                value2specifications: await translateField(item.product.productdetail?.value2specifications, language),
                description3specifications: await translateField(item.product.productdetail?.description3specifications, language),
                value3specifications: await translateField(item.product.productdetail?.value3specifications, language),
                description4specifications: await translateField(item.product.productdetail?.description4specifications, language),
                value4specifications: await translateField(item.product.productdetail?.value4specifications, language),
                description5specifications: await translateField(item.product.productdetail?.description5specifications, language),
                value5specifications: await translateField(item.product.productdetail?.value5specifications, language),
                description6specifications: await translateField(item.product.productdetail?.description6specifications, language),
                value6specifications: await translateField(item.product.productdetail?.value6specifications, language),
                description7specifications: await translateField(item.product.productdetail?.description7specifications, language),
                value7specifications: await translateField(item.product.productdetail?.value7specifications, language),
                description8specifications: await translateField(item.product.productdetail?.description8specifications, language),
                value8specifications: await translateField(item.product.productdetail?.value8specifications, language),
                description9specifications: await translateField(item.product.productdetail?.description9specifications, language),
                value9specifications: await translateField(item.product.productdetail?.value9specifications, language),
                description10specifications: await translateField(item.product.productdetail?.description10specifications, language),
                value10specifications: await translateField(item.product.productdetail?.value10specifications, language),
                description11specifications: await translateField(item.product.productdetail?.description11specifications, language),
                value11specifications: await translateField(item.product.productdetail?.value11specifications, language),
                description12specifications: await translateField(item.product.productdetail?.description12specifications, language),
                value12specifications: await translateField(item.product.productdetail?.value12specifications, language),
                description13specifications: await translateField(item.product.productdetail?.description13specifications, language),
                value13specifications: await translateField(item.product.productdetail?.value13specifications, language),
                description14specifications: await translateField(item.product.productdetail?.description14specifications, language),
                value14specifications: await translateField(item.product.productdetail?.value14specifications, language),
                category: {
                  ...item.product.productdetail?.category,
                  name: await translateField(item.product.productdetail?.category?.name, language),
                },
                color1: {
                  ...item.product.productdetail?.color1,
                  name: await translateField(item.product.productdetail?.color1?.name, language),
                },
                color2: {
                  ...item.product.productdetail?.color2,
                  name: await translateField(item.product.productdetail?.color2?.name, language),
                },
                color3: {
                  ...item.product.productdetail?.color3,
                  name: await translateField(item.product.productdetail?.color3?.name, language),
                },
                color4: {
                  ...item.product.productdetail?.color4,
                  name: await translateField(item.product.productdetail?.color4?.name, language),
                },
                color5: {
                  ...item.product.productdetail?.color5,
                  name: await translateField(item.product.productdetail?.color5?.name, language),
                },
                size1: {
                  ...item.product.productdetail?.size1,
                  name: await translateField(item.product.productdetail?.size1?.name, language),
                },
                size2: {
                  ...item.product.productdetail?.size2,
                  name: await translateField(item.product.productdetail?.size2?.name, language),
                },
                size3: {
                  ...item.product.productdetail?.size3,
                  name: await translateField(item.product.productdetail?.size3?.name, language),
                },
                size4: {
                  ...item.product.productdetail?.size4,
                  name: await translateField(item.product.productdetail?.size4?.name, language),
                },
                size5: {
                  ...item.product.productdetail?.size5,
                  name: await translateField(item.product.productdetail?.size5?.name, language),
                },
              },
            },
          };
          return translatedItem;
        })
      ),
      shipper
    };

    return translatedOrder;
  })
);


    return NextResponse.json(translations);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: wareHouseGetMessage.internalError }),
      { status: 500 }
    );
  }
}

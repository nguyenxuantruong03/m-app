import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { StatusOrder } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const {
    productIds,
    pricesales,
    quantity,
    priceold,
    warranty,
    userId,
    sizes,
    colors,
  } = await req.json();

  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  if (!productIds || productIds.length === 0) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.checkout.productIdsRequired") }),
      { status: 400 }
    );
  }

  //Tìm kiếm tất cả product match với productId
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Trích xuất các kích thước và màu sắc dưới dạng mảng
  const colorsArray = colors;
  const sizesArray = sizes;
  const prices = pricesales;
  const quantities = quantity; // Mảng số lượng

  // Lấy tất cả chi tiết sản phẩm từ cơ sở dữ liệu
  const existingProduct = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    include: {
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
  });

  //------------Check sản phẩm xem còn hàng không------------------
  // Lấy dữ liệu số lượng dựa trên giá cao nhất
  const existingproducts = existingProduct.map((data) => {
    // Hàm tính giá tối đa dựa trên kích thước
    const getSizePrice = () => {
      let maxSizePrice = 0;

      // Duyệt qua từng kích thước và tính giá tối đa
      sizesArray.forEach((size: string) => {
        switch (size.trim()) {
          case data.productdetail.size5?.value:
            maxSizePrice = Math.max(
              maxSizePrice,
              Number(data.productdetail.price5) *
                ((100 - Number(data.productdetail.percentpromotion5)) / 100)
            );
            break;
          case data.productdetail.size4?.value:
            maxSizePrice = Math.max(
              maxSizePrice,
              Number(data.productdetail.price4) *
                ((100 - Number(data.productdetail.percentpromotion4)) / 100)
            );
            break;
          case data.productdetail.size3?.value:
            maxSizePrice = Math.max(
              maxSizePrice,
              Number(data.productdetail.price3) *
                ((100 - Number(data.productdetail.percentpromotion3)) / 100)
            );
            break;
          case data.productdetail.size2?.value:
            maxSizePrice = Math.max(
              maxSizePrice,
              Number(data.productdetail.price2) *
                ((100 - Number(data.productdetail.percentpromotion2)) / 100)
            );
            break;
          default:
            maxSizePrice = Math.max(
              maxSizePrice,
              Number(data.productdetail.price1) *
                ((100 - Number(data.productdetail.percentpromotion1)) / 100)
            );
            break;
        }
      });
      return maxSizePrice;
    };

    // Hàm tính giá tối đa dựa trên màu sắc
    const getColorPrice = () => {
      let maxColorPrice = 0;

      // Duyệt qua từng màu sắc và tính giá tối đa
      colorsArray.forEach((color: string) => {
        switch (color.trim()) {
          case data.productdetail.color5?.value:
            maxColorPrice = Math.max(
              maxColorPrice,
              Number(data.productdetail.price5) *
                ((100 - Number(data.productdetail.percentpromotion5)) / 100)
            );
            break;
          case data.productdetail.color4?.value:
            maxColorPrice = Math.max(
              maxColorPrice,
              Number(data.productdetail.price4) *
                ((100 - Number(data.productdetail.percentpromotion4)) / 100)
            );
            break;
          case data.productdetail.color3?.value:
            maxColorPrice = Math.max(
              maxColorPrice,
              Number(data.productdetail.price3) *
                ((100 - Number(data.productdetail.percentpromotion3)) / 100)
            );
            break;
          case data.productdetail.color2?.value:
            maxColorPrice = Math.max(
              maxColorPrice,
              Number(data.productdetail.price2) *
                ((100 - Number(data.productdetail.percentpromotion2)) / 100)
            );
            break;
          default:
            maxColorPrice = Math.max(
              maxColorPrice,
              Number(data.productdetail.price1) *
                ((100 - Number(data.productdetail.percentpromotion1)) / 100)
            );
            break;
        }
      });
      return maxColorPrice;
    };

    const sizePrice = getSizePrice();
    const colorPrice = getColorPrice();
    const highestPrice = Math.max(sizePrice, colorPrice);

    let quantityData;
    // Xác định trường số lượng dựa trên giá cao nhất
    switch (highestPrice) {
      case Number(data.productdetail.price5) *
        ((100 - Number(data.productdetail.percentpromotion5)) / 100):
        quantityData = data.productdetail.quantity5;
        break;
      case Number(data.productdetail.price4) *
        ((100 - Number(data.productdetail.percentpromotion4)) / 100):
        quantityData = data.productdetail.quantity4;
        break;
      case Number(data.productdetail.price3) *
        ((100 - Number(data.productdetail.percentpromotion3)) / 100):
        quantityData = data.productdetail.quantity3;
        break;
      case Number(data.productdetail.price2) *
        ((100 - Number(data.productdetail.percentpromotion2)) / 100):
        quantityData = data.productdetail.quantity2;
        break;
      case Number(data.productdetail.price1) *
        ((100 - Number(data.productdetail.percentpromotion1)) / 100):
        quantityData = data.productdetail.quantity1;
        break;
      default:
        break;
    }

    return {
      productId: data.id,
      productHeading: data.heading,
      quantityData: quantityData || 0,
    };
  });

  if (prices) {
    const outOfStockProducts = [];

    for (const {
      productId,
      quantityData,
      productHeading,
    } of existingproducts) {
      // Nếu số lượng bằng 0, thêm tên sản phẩm vào danh sách hết hàng
      if (quantityData === 0) {
        outOfStockProducts.push(productHeading);
      } else {
        // Bước 1: Lấy chi tiết sản phẩm hiện có bao gồm trường `sold`
        const existingProduct = await prismadb.product.findUnique({
          where: { id: productId },
        });

        if (existingProduct) {
          // Xử lý số lượng cho từng sản phẩm
          for (let i = 0; i < quantities.length; i++) {
            const quantityBuy = quantities[i];
            // Tính toán số lượng mới và đảm bảo không âm
            const newQuantity = quantityData - quantityBuy;
            if (newQuantity < 0) {
              outOfStockProducts.push(productHeading);
              break;
            }
          }
        }
      }
    }

    // Nếu có sản phẩm hết hàng, trả về lỗi tổng hợp
    if (outOfStockProducts.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: `${t("toastError.checkout.insufficientQuantity")}: ${outOfStockProducts.join(
            ", "
          )}`,
        }),
        { status: 403 }
      );
    }
  }

  // productIds.length
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const productQuantities: string[] = [];
  // Assume products is an array of product objects
  products.map((product) => {
    productQuantities.push(`${t("toastError.checkout.product")}:${product.heading}`);
  });
  line_items.push({
    quantity: 1,
    price_data: {
      currency: "VND",
      product_data: {
        name: productQuantities.toString(),
        description: `${t("toastError.checkout.insuranceAmount")}: ${formatter.format(
          warranty
        )}, ${t("toastError.checkout.amountNotOnSale")}: ${formatter.format(priceold)}`,
      },
      unit_amount: pricesales,
    },
  });

  const order = await prismadb.order.create({
    data: {
      status: StatusOrder.Cho_xac_nhan,
      deliveryMethod: "online",
      storeId: params.storeId,
      isPaid: false,
      userId: userId || "",
      orderItem: {
        create: productIds.map((productId: string, index: number) => ({
          product: {
            connect: {
              id: productId,
            },
          },
          pricesales: pricesales,
          quantity: quantity[index].toString(),
          priceold: priceold,
          warranty: warranty,
          size: sizes[index],
          color: colors[index],
        })),
      },
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    allow_promotion_codes: true,
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment-success?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment-fail?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}

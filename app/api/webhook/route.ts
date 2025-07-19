import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { Resend } from "resend";
import twilio from "twilio";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { StatusOrder } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import vi from 'date-fns/locale/vi';
import en from 'date-fns/locale/en-US';
import { createTranslator } from "next-intl";

const locales = {
  vi: vi,
  en: en
};

export async function POST(req: Request) {
  const user = await currentUser();
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.webhookError") }),
      {
        status: 400,
      }
    );
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;
  const addressComponents = [
    address?.line1 ? `Địa chỉ 1: ${address.line1}` : null,
    address?.line2 ? `Địa chỉ 2: ${address.line2}` : null,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const nonNullAddressComponents = addressComponents.filter(
    (c) => c !== null && c !== undefined
  );

  const addressString = nonNullAddressComponents.join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        status: StatusOrder.Soan_hang,
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
        email: session?.customer_details?.email || "",
      },
      include: {
        orderItem: true,
      },
    });

    const productIds = order.orderItem.map(
      (orderItemm) => orderItemm.productId
    );

    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: false,
      },
    });

    // Trích xuất các kích thước và màu sắc dưới dạng mảng
    const colorsArray = order.orderItem.map((item) => item.color);
    const sizesArray = order.orderItem.map((item) => item.size);
    const prices = order.orderItem.map((item) => item.pricesales);
    const quantities = order.orderItem.map((item) => Number(item.quantity)); // Mảng số lượng

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

    // Lấy dữ liệu số lượng dựa trên giá cao nhất
    const products = existingProduct.map((data) => {
      // Hàm tính giá tối đa dựa trên kích thước
      const getSizePrice = () => {
        let maxSizePrice = 0;

        // Duyệt qua từng kích thước và tính giá tối đa
        sizesArray.forEach((size) => {
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
        colorsArray.forEach((color) => {
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

      let quantityField;
      let quantityData;
      // Xác định trường số lượng dựa trên giá cao nhất
      switch (highestPrice) {
        case Number(data.productdetail.price5) *
          ((100 - Number(data.productdetail.percentpromotion5)) / 100):
          quantityField = "quantity5";
          quantityData = data.productdetail.quantity5;
          break;
        case Number(data.productdetail.price4) *
          ((100 - Number(data.productdetail.percentpromotion4)) / 100):
          quantityField = "quantity4";
          quantityData = data.productdetail.quantity4;
          break;
        case Number(data.productdetail.price3) *
          ((100 - Number(data.productdetail.percentpromotion3)) / 100):
          quantityField = "quantity3";
          quantityData = data.productdetail.quantity3;
          break;
        case Number(data.productdetail.price2) *
          ((100 - Number(data.productdetail.percentpromotion2)) / 100):
          quantityField = "quantity2";
          quantityData = data.productdetail.quantity2;
          break;
        case Number(data.productdetail.price1) *
          ((100 - Number(data.productdetail.percentpromotion1)) / 100):
          quantityField = "quantity1";
          quantityData = data.productdetail.quantity1;
          break;
        default:
          break;
      }

      // Nếu số lượng bằng 0, ném lỗi
      if (quantityData === 0) {
        throw new Error(t("product.errorProductId", { id: data.id }));
      }

      return {
        productId: data.id,
        quantityField: quantityField as string,
        quantityData: quantityData || 0,
      };
    });

    if (prices) {
      for (const { productId, quantityField, quantityData } of products) {
        // Bước 1: Lấy chi tiết sản phẩm hiện có bao gồm trường `sold`
        const existingProduct = await prismadb.product.findUnique({
          where: { id: productId },
        });

        if (existingProduct) {
          const existingSold = existingProduct.sold || 0;

          // Xử lý số lượng cho từng sản phẩm
          for (let i = 0; i < quantities.length; i++) {
            const quantityBuy = quantities[i]; // Số lượng của từng sản phẩm
            const updatedSold = existingSold + quantityBuy;

            // Tính toán số lượng mới và đảm bảo không âm
            const newQuantity = quantityData - quantityBuy;
            if (newQuantity < 0) {
              throw new Error(
                t("product.errorProductNegative", {
                  productId: productId,
                  quantityData: quantityData,
                  quantityBuy: quantityBuy,
                })
              );
            }

            // Cập nhật sản phẩm với số lượng mới và số lượng đã bán
            await prismadb.product.update({
              where: { id: productId },
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
              data: {
                productdetail: {
                  update: {
                    [quantityField]: newQuantity,
                  },
                },
                sold: updatedSold,
              },
            });
          }
        }
      }
    }

      //------------------ Dùng để sent Email đến người dùng --------------------------
      // Fetch the product details and order items
      const orderItems = await prismadb.orderItem.findMany({
        where: { orderId: order.id },
        include: {
          product: true,
        },
      });

      // Generate the table rows
      let totalPrice = 0;
      const tableRows = orderItems.map((item, index) => {
        const productName = item.product.name;
        const price = Number(item.pricesales);
        const quantity = Number(item.quantity);
        const warranty = Number(item.warranty);
        totalPrice += price * Number(item.quantity) + warranty;

        return `<tr>
      <td>${index + 1}</td>
      <td>${productName}</td>
      <td>${quantity}</td>
      <td>${formatter.format(warranty) || 0}</td>
      <td>${formatter.format(price)}</td>
    </tr>`;
      });

      // Add the total row
      tableRows.push(`<tr>
    <td colspan="4">${
      order.isPaid
        ? `<p style="font-weight: 700; color: #16a34a;">${t("webhook.paid")}</p>`
        : `<p style="font-weight: 700; color: #dc2626;">${t("webhook.amountToPay")}</p>`
    }</td>
  <td>${formatter.format(totalPrice)}</td>
  </tr>`);

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);

      const formatDate = format(
        currentDate,
        "E '-' dd/MM/yyyy '-' HH:mm:ss a",
        {
          locale: locales[languageToUse as keyof typeof locales]
        }
      );

      const sentEmailUserHTML = `
   <div>
    <div style="display: flex; align-items: center; justify-content: center;">
       <svg style="color: #16a34a;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
      <path d="M20 6 9 17l-5-5"/>
    </svg>
      <p style="text-align: center; font-weight:700; margin-left:4px; color:#16a34a;">${t("webhook.orderSuccess")}</p>
    </div>

  <p>${t("webhook.thankYou")} <span style="font-weight: 700;">${
    order.name
  }</span> ${t("webhook.trustMessage")} <span style="font-weight: 700;">${
        order.id
      }</span>.</p>
  ${
    order.address &&
    order.address !== "Trống" &&
    `<p style="margin-bottom: 15px;">${t("webhook.deliveryAddress")} <span style="font-weight: 700;">${addressString}</span> ${t("webhook.deliveryTimeframe")} <span style="font-weight: 700;">${t("webhook.estimatedDelivery")} ${formatDate}</span>.</p>`
  }
</div>

<table border="1" cellpadding="5" cellspacing="0" style="width: 100%;">
  <thead>
    <tr>
      <th style="background-color: #FFCC00; padding: 5px;">ID</th>
      <th style="background-color: #FFCC00; padding: 5px;">Tên sản phẩm</th>
      <th style="background-color: #FFCC00; padding: 5px;">Số lượng</th>
      <th style="background-color: #FFCC00; padding: 5px;">Bảo hành</th>
      <th style="background-color: #FFCC00; padding: 5px;">Giá tiền</th>
    </tr>
  </thead>
  <tbody>
    ${tableRows.join("")}
  </tbody>
</table>

<div style="margin-top: 12px;">
  ${t("webhook.trackOrder")} <span style="font-weight: 700;">${t("webhook.shippingOrder")}</span> ${t("webhook.applyTrackingCode")}.
</div>

<p style="margin-top: 25px; margin-bottom: 20px;">${t("webhook.honorMessage")}</p>

<div style="margin-top: 5px; display: flex; justify-content: center; align-items: center;">
<a href="${
        process.env.NEXT_PUBLIC_URL
      }" style="text-decoration: none; color: inherit; cursor: pointer;" target="_blank">
  <button style="padding: 12px; border-radius: 5px; background: transparent;">
  ${t("webhook.continueShopping")}
  </button>
</a>
  <a href="${
    process.env.NEXT_PUBLIC_URL
  }/warehouse/package-product" style="text-decoration: none; color: #dc2626; cursor: pointer;" target="_blank">
  <button style="padding: 12px; margin-left: 10px; border-radius: 5px; border: 1px solid #dc2626; background: transparent;">
  ${t("webhook.detailOrder")}
  </button>
  </a>
</div>
  `;

      const resend = new Resend("re_RCTEzcfc_3Eo7RyscVyHChCuzhtukuVkB");
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const messagefrom = process.env.TWILIO_PHONE_NUMBER;
      const client = twilio(accountSid, authToken);

      await resend.emails.send({
        from: "mail@vlxdxuantruong.email",
        to: [order?.email || ""],
        subject: t("webhook.orderCompleted"),
        html: `
        ${sentEmailUserHTML}
        
      `,
      });
      // // Resend SMS
      // await client.messages.create({
      //   body: t("webhook.resendSMSBody"),
      //   from: messagefrom,
      //   to: session?.customer_details?.phone || "",
      // });
    
  }
  return new NextResponse(null, { status: 200 });
}

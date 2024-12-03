import prismadb from "@/lib/prismadb";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";
import { formatter } from "@/lib/utils";
import viLocale from "date-fns/locale/vi";
import { format } from "date-fns";
import { StatusOrder } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import {
  translateCheckOutCashPost,
  translateOrderErrorPatch,
} from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const checkOutCashPostMessage = translateCheckOutCashPost(LanguageToUse);
  try {
    const body = await req.json();
    const { encryptedData } = body;

    // Decrypt the data using AES
    const secretKey = process.env.NEXT_PUBLIC_CRYPTO_PAYMENTCASH_KEY; // Use the same secret key as on the client side
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      secretKey
    ).toString(CryptoJS.enc.Utf8);

    const parsedData = JSON.parse(decryptedData);
    const {
      email,
      fullname,
      phoneNumber,
      gender,
      address,
      addressOther,
      note,
      deliveryOption,
      pricesales,
      productIds,
      sizes,
      colors,
      quantities,
      userId,
      priceold,
      warranty,
      requestId,
    } = parsedData;

    // Trích xuất các kích thước và màu sắc dưới dạng mảng
    const colorsArray = colors;
    const sizesArray = sizes;
    const prices = pricesales;
    const quantitiesArray = quantities; // Mảng số lượng

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
      let quantityField;

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

      return {
        productId: data.id,
        productHeading: data.heading,
        quantityField: quantityField as string,
        quantityData: quantityData || 0,
      };
    });

    if (prices) {
      const outOfStockProducts = [];

      for (const {
        productId,
        quantityData,
        productHeading,
        quantityField,
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
            const existingSold = existingProduct.sold || 0;
            // Xử lý số lượng cho từng sản phẩm
            for (let i = 0; i < quantities.length; i++) {
              const quantityBuy = quantities[i];
              const updatedSold = existingSold + quantityBuy;
              // Tính toán số lượng mới và đảm bảo không âm
              const newQuantity = quantityData - quantityBuy;
              if (newQuantity < 0) {
                outOfStockProducts.push(productHeading);
                break;
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

      // Nếu có sản phẩm hết hàng, trả về lỗi tổng hợp
      if (outOfStockProducts.length > 0) {
        return new NextResponse(
          JSON.stringify({
            error: `${
              checkOutCashPostMessage.insufficientQuantity
            }: ${outOfStockProducts.join(", ")}`,
          }),
          { status: 403 }
        );
      }
    }

    const statisDelivery =
      deliveryOption === "pickup"
        ? StatusOrder.Nhan_tai_cua_hang
        : StatusOrder.Cho_xac_nhan;

    const order = await prismadb.order.create({
      data: {
        id: requestId,
        status: statisDelivery,
        storeId: params.storeId,
        isPaid: false,
        userId: userId || "",
        email: email,
        name: fullname,
        note: note,
        gender: gender,
        address: address || "",
        addressOther: addressOther,
        phone: phoneNumber,
        deliveryMethod: deliveryOption,
        orderItem: {
          create: productIds.map((productId: string, index: number) => ({
            product: {
              connect: {
                id: productId,
              },
            },
            pricesales: pricesales,
            quantity: quantities[index].toString(),
            priceold: priceold,
            warranty: warranty,
            size: sizes[index],
            color: colors[index],
          })),
        },
      },
    });

    // Fetch the product details and order items
    const orderItems = await prismadb.orderItem.findMany({
      where: { orderId: requestId },
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
    <td colspan="4"><strong>${checkOutCashPostMessage.totalAmount}</strong></td>
    <td>${formatter.format(totalPrice)}</td>
  </tr>`);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);

    const formatDate = format(currentDate, "E '-' dd/MM/yyyy '-' HH:mm:ss a", {
      locale: viLocale,
    });

    const sentEmailUserHTML = `
   <div>
    <div style="display: flex; align-items: center; justify-content: center;">
       <svg style="color: #16a34a;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
      <path d="M20 6 9 17l-5-5"/>
    </svg>
      <p style="text-align: center; font-weight:700; margin-left:4px; color:#16a34a;">${
        checkOutCashPostMessage.orderSuccess
      }</p>
    </div>

  <p>${checkOutCashPostMessage.thankYou} <span style="font-weight: 700;">${
      order.name
    }</span> ${checkOutCashPostMessage.orderInfo} <span style="font-weight: 700;">${
      order.id
    }</span>.</p>
  ${
    order.address && order.address !== "Trống"
      ? `<p style="margin-bottom: 15px;">${checkOutCashPostMessage.deliveryInfo} <span style="font-weight: 700;">${order.address}</span> ${checkOutCashPostMessage.deliveryTime} <span style="font-weight: 700;">${checkOutCashPostMessage.estimatedArrival} ${formatDate}</span>.</p>`
      : `<p style="margin-bottom: 15px;">${checkOutCashPostMessage.shopPrepare}</p>`
  }
</div>

<table border="1" cellpadding="5" cellspacing="0" style="width: 100%;">
  <thead>
    <tr>
      <th style="background-color: #FFCC00; padding: 5px;">${
        checkOutCashPostMessage.orderId
      }</th>
      <th style="background-color: #FFCC00; padding: 5px;">${
        checkOutCashPostMessage.productName
      }</th>
      <th style="background-color: #FFCC00; padding: 5px;">${
        checkOutCashPostMessage.quantity
      }</th>
      <th style="background-color: #FFCC00; padding: 5px;">${
        checkOutCashPostMessage.warranty
      }</th>
      <th style="background-color: #FFCC00; padding: 5px;">${
        checkOutCashPostMessage.price
      }</th>
    </tr>
  </thead>
  <tbody>
    ${tableRows.join("")}
  </tbody>
</table>

<div style="margin-top: 12px;">
  ${checkOutCashPostMessage.trackOrder} <span style="font-weight: 700;">${
      checkOutCashPostMessage.shippingInfo
    }</span> ${checkOutCashPostMessage.shippingInstructions}
</div>

<p style="margin-top: 25px; margin-bottom: 20px;">${
      checkOutCashPostMessage.customerService
    }</p>

<div style="margin-top: 5px; display: flex; justify-content: center; align-items: center;">
<a href="${
      process.env.NEXT_PUBLIC_URL
    }" style="text-decoration: none; color: inherit; cursor: pointer;" target="_blank">
  <button style="padding: 12px; border-radius: 5px; background: transparent;">
  ${checkOutCashPostMessage.continueShopping}
  </button>
</a>
  <a href="${
    process.env.NEXT_PUBLIC_URL
  }/warehouse/package-product" style="text-decoration: none; color: #dc2626; cursor: pointer;" target="_blank">
  <button style="padding: 12px; margin-left: 10px; border-radius: 5px; border: 1px solid #dc2626; background: transparent;">
  ${checkOutCashPostMessage.orderDetails}
  </button>
  </a>
</div>
  `;

    try {
      const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const messagefrom = process.env.TWILIO_PHONE_NUMBER;
      const client = twilio(accountSid, authToken);

      // Resend email with the table
      await resend.emails.send({
        from: "mail@vlxdxuantruong.email",
        to: [order?.email || ""],
        subject: `${checkOutCashPostMessage.orderCompleted}`,
        html: `
        ${sentEmailUserHTML}
        
      `,
      });

      // Resend SMS - Phone
      // await client.messages.create({
      //   body: "Đơn hàng đặt thành công. Cám ơn bạn đã đặt hàng. Nếu có thắc mắc gọi đến 0352261103.",
      //   from: messagefrom,
      //   to: order?.phone || "",
      // });
    } catch (error) {
      console.error(checkOutCashPostMessage.emailError);
    }

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: checkOutCashPostMessage.checkoutError }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const checkOutCashPatchMessage = translateOrderErrorPatch(LanguageToUse);
  try {
    const body = await req.json();
    const { responseIdOrderCurrent } = body;

    const orders = await prismadb.order.findUnique({
      where: {
        id: responseIdOrderCurrent,
      },
      include: {
        orderItem: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: checkOutCashPatchMessage }),
      { status: 500 }
    );
  }
}

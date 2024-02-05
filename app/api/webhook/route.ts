import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { Resend } from "resend";
import twilio from "twilio";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;
  const addressComponents = [
    address?.line1,
    address?.line2,
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

    // Resend email
      try {
        const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

        await resend.emails.send({
          from: "nxt159753@gmail.com",
          to: [session?.customer_details?.email || ""],
          subject: "Order Completed",
          text: "Thank you for your order! Your order has been completed.",
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
    
    // Send SMS
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const messagefrom = process.env.TWILIO_PHONE_NUMBER
    const client = twilio(accountSid, authToken);
        try {
        await client.messages.create({
            body: "Đơn hàng đặt thành công. Quý khách sẽ nhận hàng sau 1-2h nếu xa sẽ lâu hơn. Nếu có thắc mắc gọi đến 0352261103.",
            from: messagefrom,
            to: session?.customer_details?.phone || "",
          });
        } catch (error) {
          console.error("Error sending SMS:", error);
        }
    }
  return new NextResponse(null, { status: 200 });
}

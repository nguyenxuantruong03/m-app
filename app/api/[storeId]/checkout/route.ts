import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

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
  const { productIds,pricesales,quantity,priceold,warranty } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
  // productIds.length
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const productQuantities: string[] = [];
  // Assume products is an array of product objects
  products.map((product) => {
      productQuantities.push(`Sản phẩm:${product.heading}`);
  });
  line_items.push({
    quantity: 1,
    price_data: {
      currency: 'VND',
      product_data: {
        name: productQuantities.toString(),
        description: `Số tiền bảo hiểm là : ${formatter.format(warranty)}, Số tiền chưa sale là : ${formatter.format(priceold)}`,

      },
      unit_amount: pricesales,
    },
  });
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItem: {
        create: productIds.map((productId: string,index:any) => ({
          product: {
            connect: {
              id: productId,
            },
          },
          pricesales:pricesales,
          quantity:quantity[index].toString(),
          priceold:priceold,
          warranty:warranty,
        }))
      }
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    allow_promotion_codes: true,
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    },
  });

  return NextResponse.json({ url: session.url }, {
    headers: corsHeaders
  });
};

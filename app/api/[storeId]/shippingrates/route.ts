import { stripe } from "@/lib/stripe";

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { TaxBehavior, Unit, UserRole,ShippingTaxcode } from "@prisma/client";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const {
      name,
      taxcode,
      taxbehavior,
      amount,
      unitmin,
      unitmax,
      valuemax,
      valuemin,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name || !params.storeId) {
      return new NextResponse("Invalid parameters", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    // Tạo coupon bằng Stripe
    const shippingRates = await stripe.shippingRates.create({
      display_name: name,
      type: 'fixed_amount',
      fixed_amount: {
        amount: amount,
        currency: 'vnd',
      },
      tax_code: taxcode,
      delivery_estimate:{
        maximum:{
          unit: unitmax,
          value: valuemax
        },
        minimum:{
          unit: unitmin,
          value: valuemin
        }
      },
      tax_behavior: taxbehavior,
    });

    // Lưu thông tin coupon vào cơ sở dữ liệu của bạn
    const createdCoupon = await prismadb.shippingRates.create({
      data: {
        id: shippingRates.id,
        name: shippingRates.display_name || "",
        amount: shippingRates.fixed_amount?.amount || 0,
        taxcode: shippingRates.tax_code as ShippingTaxcode, 
        unitmax: shippingRates.delivery_estimate?.maximum?.unit as Unit,
        valuemax: shippingRates.delivery_estimate?.maximum?.value || 0,
        unitmin: shippingRates.delivery_estimate?.minimum?.unit as Unit,
        valuemin: shippingRates.delivery_estimate?.minimum?.value || 0,
        taxbehavior: shippingRates.tax_behavior as TaxBehavior,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(createdCoupon);
  } catch (error) {
    console.log("[SHIPPINGRATES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const getshippingRates = await prismadb.shippingRates.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(getshippingRates);
  } catch (error) {
    console.log("[SHIPPINGRATES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

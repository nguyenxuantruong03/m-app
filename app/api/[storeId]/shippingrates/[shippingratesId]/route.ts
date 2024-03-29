import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function GET(
  req: Request,
  { params }: { params: { shippingratesId: string } }
) {
  try {
    if (!params.shippingratesId) {
      return new NextResponse("shipping Rates id is required", { status: 400 });
    }

    const shippingRates = await prismadb.shippingRates.findUnique({
      where: {
        id: params.shippingratesId,
      },
    });

    return NextResponse.json(shippingRates);
  } catch (error) {
    console.log("[SHIPPINGRATES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { shippingratesId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const {
      name,
      taxbehavior,
      amount,
      unitmin,
      unitmax,
      valuemax,
      valuemin,
      active,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.storeId) {
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

    // Cập nhật thông tin tương ứng trên Stripe
    await stripe.shippingRates.update(params.shippingratesId, {
      active: active,
      tax_behavior: taxbehavior,
    });

    const shippingRateupdate = await prismadb.shippingRates.update({
      where: {
        id: params.shippingratesId,
      },
      data: {
        name,
        taxbehavior,
        amount,
        unitmin,
        unitmax,
        valuemax,
        valuemin,
        active,
      },
    });

    return NextResponse.json(shippingRateupdate);
  } catch (error) {
    console.log("[SHIPPINGRATES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

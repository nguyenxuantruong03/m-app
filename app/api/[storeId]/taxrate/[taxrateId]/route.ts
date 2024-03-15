import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function GET(
  req: Request,
  { params }: { params: { taxrateId: string } }
) {
  try {
    if (!params.taxrateId) {
      return new NextResponse("TexRate id is required", { status: 400 });
    }

    const product = await prismadb.taxRate.findUnique({
      where: {
        id: params.taxrateId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[TAXRATE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { taxrateId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { name, description, percentage, inclusive, active, taxtype } = body;

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

    // Cập nhật thông tin tương ứng trên Stripe
    await stripe.taxRates.update(params.taxrateId, {
      display_name: name,
      description: description,
      tax_type: taxtype,
      active: active,
    });

    const couponupdate = await prismadb.taxRate.update({
      where: {
        id: params.taxrateId,
      },
      data: {
        name,
        inclusive,
        active,
        percentage,
        taxtype,
        description,
      },
    });

    return NextResponse.json(couponupdate);
  } catch (error) {
    console.log("[TAXRATE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

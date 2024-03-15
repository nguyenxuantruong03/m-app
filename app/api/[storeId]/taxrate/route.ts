import { stripe } from "@/lib/stripe";

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { TaxType, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { name, description, percentage, inclusive, active, taxtype } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name || !percentage || !params.storeId) {
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
    const taxRate = await stripe.taxRates.create({
      display_name: name,
      description: description,
      percentage: percentage,
      inclusive: inclusive,
      country: "VN",
      active: active,
      tax_type: taxtype,
    });

    // Lưu thông tin coupon vào cơ sở dữ liệu của bạn
    const createdCoupon = await prismadb.taxRate.create({
      data: {
        id: taxRate.id,
        name: taxRate.display_name,
        description: taxRate.description || "",
        percentage: taxRate.percentage,
        inclusive: taxRate.inclusive,
        active: taxRate.active,
        taxtype: taxRate.tax_type as TaxType,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(createdCoupon);
  } catch (error) {
    console.log("[TAXRATE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const active = searchParams.get("active");
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const gettaxRate = await prismadb.taxRate.findMany({
      where: {
        storeId: params.storeId,
        active: active ? true : undefined,
        inclusive: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(gettaxRate);
  } catch (error) {
    console.log("[TAXRATE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

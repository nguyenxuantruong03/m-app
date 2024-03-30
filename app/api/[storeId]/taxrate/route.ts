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
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: "Name is required!" }),
        { status: 400 }
      );
    }

    if ( !percentage) {
      return new NextResponse(
        JSON.stringify({ error: "Percentage is required!" }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
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
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
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
    return new NextResponse(
      JSON.stringify({ error: "Internal error post taxrate." }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const gettaxRate = await prismadb.taxRate.findMany();

    return NextResponse.json(gettaxRate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get taxrate." }),
      { status: 500 }
    );
  }
}

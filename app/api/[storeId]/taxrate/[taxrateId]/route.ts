import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function GET(
  req: Request,
  { params }: { params: { taxrateId: string } }
) {
  try {
    if (!params.taxrateId) {
      return new NextResponse(
        JSON.stringify({ error: "TaxRate id is required!" }),
        { status: 400 }
      );
    }

    const taxRate = await prismadb.taxRate.findUnique({
      where: {
        id: params.taxrateId,
      },
    });

    return NextResponse.json(taxRate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get taxrate." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taxrateId: string, storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.taxrateId) {
      return new NextResponse(
        JSON.stringify({ error: "Size id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      }
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
        { status: 403 }
      );
    }

    const taxRate = await prismadb.taxRate.delete({
      where: {
        id: params.taxrateId,
      }
    });
  
    return NextResponse.json(taxRate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete taxRate." }),
      { status: 500 }
    );
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { taxrateId: string; storeId: string } }
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

    if (!params.taxrateId) {
      return new NextResponse(
        JSON.stringify({ error: "Taxrate id is required!" }),
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

    // Cập nhật thông tin tương ứng trên Stripe
    await stripe.taxRates.update(params.taxrateId, {
      display_name: name,
      description: description,
      tax_type: taxtype,
      active: active,
    });

    const taxRateupdate = await prismadb.taxRate.update({
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

    return NextResponse.json(taxRateupdate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch taxrate." }),
      { status: 500 }
    );
  }
}

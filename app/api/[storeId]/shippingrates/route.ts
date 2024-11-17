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
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN && userId.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền tạo mới shipping rate!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: "Name is required!" }),
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
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
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

    const sentShippingRates = {
      name: createdCoupon?.name,
      amount: createdCoupon.amount,
      taxcode: createdCoupon.taxcode,
      unitmax: createdCoupon.unitmax,
      valuemax: createdCoupon.valuemax,
      unitmin: createdCoupon.unitmin,
      valuemin: createdCoupon.valuemin,
      taxbehavior: createdCoupon.taxbehavior,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentShippingRates.name}, Amount: ${sentShippingRates.amount}, Taxcode: ${sentShippingRates.taxcode}, Unitmax: ${sentShippingRates.unitmax}, Valuemax: ${sentShippingRates.valuemax}, Unitmin: ${sentShippingRates.unitmin}, Valuemin: ${sentShippingRates.valuemin}, Taxbehavior: ${sentShippingRates.taxbehavior}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATESHIPPINGRATES",
        newChange: changes,
        user: userId?.email || "",
      },
    });

    return NextResponse.json(createdCoupon);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post shippingrates." }),
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
    return new NextResponse(
      JSON.stringify({ error: "Internal error get shippingrates." }),
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { ids } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN && userId.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền xóa shipping rate!" }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Mảng IDs không được trống!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    // Fetch all cartegories to delete, including their images
    const ShipingRateToDelete = await prismadb.shippingRates.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = ShipingRateToDelete.map(item => ({
      name: item.name,
      taxcode: item.taxbehavior,
      taxbehavior: item.taxbehavior,
      amount: item.amount,
      valuemin: item.valuemin,
      unitmin: item.unitmin,
      valuemax: item.valuemax,
      unitmax: item.unitmax,
      active: item.active,
    }));

    // Delete all the cartegories in one operation
    await prismadb.shippingRates.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Log the changes in a single database operation
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changesArray.map(change => `DeleteName: ${change.name}, DeleteTaxcode: ${change.taxcode}, DeleteTaxbehavior: ${change.taxbehavior}, DeleteAmount: ${change.amount}, DeleteValuemin: ${change.valuemin}, DeleteUnitmin: ${change.unitmin}, DeleteValuemax: ${change.valuemax}, DeleteUnitmax: ${change.unitmax}, DeleteActive: ${change.active}`),
        type: "DELETEMANY-SHIPPINGRATES",
        user: userId?.email || "",
      },
    });

    return NextResponse.json({ message: "Xóa thành công!" });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete category." }),
      { status: 500 }
    );
  }
}
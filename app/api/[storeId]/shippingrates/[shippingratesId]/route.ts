import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

type ShippingRateValue = string | number |  Date | boolean | undefined | null;

interface ChangeRecord {
  oldValue: ShippingRateValue;
  newValue: ShippingRateValue;
}

export async function GET(
  req: Request,
  { params }: { params: { shippingratesId: string } }
) {
  try {
    if (!params.shippingratesId) {
      return new NextResponse(
        JSON.stringify({ error: "Shipping Rates id is required!" }),
        { status: 400 }
      );
    }

    const shippingRates = await prismadb.shippingRates.findUnique({
      where: {
        id: params.shippingratesId,
      },
    });

    return NextResponse.json(shippingRates);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get shippingrates." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { shippingratesId: string; storeId: string } }
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

    if (!params.shippingratesId) {
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
      },
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

    const shippingRates = await prismadb.shippingRates.delete({
      where: {
        id: params.shippingratesId,
      },
    });

    const sentShippingRates = {
      name: shippingRates?.name,
      amount: shippingRates.amount,
      taxcode: shippingRates.taxcode,
      unitmax: shippingRates.unitmax,
      valuemax: shippingRates.valuemax,
      unitmin: shippingRates.unitmin,
      valuemin: shippingRates.valuemin,
      taxbehavior: shippingRates.taxbehavior,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentShippingRates.name}, Amount: ${sentShippingRates.amount}, Taxcode: ${sentShippingRates.taxcode}, Unitmax: ${sentShippingRates.unitmax}, Valuemax: ${sentShippingRates.valuemax}, Unitmin: ${sentShippingRates.unitmin}, Valuemin: ${sentShippingRates.valuemin}, Taxbehavior: ${sentShippingRates.taxbehavior}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETESHIPPINGRATES",
        delete: changes,
        user: userId?.email || "",
      },
    });

    return NextResponse.json(shippingRates);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete shippingRates." }),
      { status: 500 }
    );
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
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if(!name){
      return new NextResponse(
        JSON.stringify({ error: "Name is required!" }),
        { status: 400 }
      );
    }

    if(!taxbehavior){
      return new NextResponse(
        JSON.stringify({ error: "Taxbehavior is required!" }),
        { status: 400 }
      );
    }

    if(!amount){
      return new NextResponse(
        JSON.stringify({ error: "Amount is required!" }),
        { status: 400 }
      );
    }

    if(!unitmin){
      return new NextResponse(
        JSON.stringify({ error: "Unit min is required!" }),
        { status: 400 }
      );
    }

    if(!valuemin){
      return new NextResponse(
        JSON.stringify({ error: "Value min is required!" }),
        { status: 400 }
      );
    }

    if(!unitmax){
      return new NextResponse(
        JSON.stringify({ error: "Unit max required!" }),
        { status: 400 }
      );
    }

    if(!valuemax){
      return new NextResponse(
        JSON.stringify({ error: "Value max is required!" }),
        { status: 400 }
      );
    }

    if (!params.shippingratesId) {
      return new NextResponse(
        JSON.stringify({ error: "Shipping Rates id is required!" }),
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

    const existingShippingRates = await prismadb.shippingRates.findUnique({
      where: {
        id: params.shippingratesId,
      },
    });

    // Cập nhật thông tin tương ứng trên Stripe
    await stripe.shippingRates.update(params.shippingratesId, {
      active: active,
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

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingShippingRates) {
      if (
        existingShippingRates.hasOwnProperty(key) &&
        shippingRateupdate.hasOwnProperty(key)
      ) {
        if (
          existingShippingRates[key as keyof typeof existingShippingRates] !==
          shippingRateupdate[key as keyof typeof shippingRateupdate]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue:
                existingShippingRates[
                  key as keyof typeof existingShippingRates
                ],
              newValue:
                shippingRateupdate[key as keyof typeof shippingRateupdate],
            };
          }
        }
      }
    }

    //Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
    const oldChanges = Object.keys(changes).map((key) => {
      return `${key}: { Old: '${changes[key].oldValue}'}`;
    });
    const newChanges = Object.keys(changes).map((key) => {
      return `${key}: { New: '${changes[key].newValue}'}`;
    });

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        oldChange: oldChanges,
        newChange: newChanges,
        type: "UPDATESHIPPINGRATES",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(shippingRateupdate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch shippingrates." }),
      { status: 500 }
    );
  }
}

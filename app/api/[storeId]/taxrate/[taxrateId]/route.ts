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
  { params }: { params: { taxrateId: string; storeId: string } }
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

    const taxRate = await prismadb.taxRate.delete({
      where: {
        id: params.taxrateId,
      },
    });

    const sentTaxRate = {
      name: taxRate?.name,
      description: taxRate?.description,
      percentage: taxRate?.percentage,
      inclusive: taxRate?.inclusive,
      active: taxRate?.active,
      taxtype: taxRate?.taxtype,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentTaxRate.name}, Description: ${sentTaxRate.description}, Percentage: ${sentTaxRate.percentage}, Inclusive: ${sentTaxRate.inclusive}, Active: ${sentTaxRate.active}, Taxtype: ${sentTaxRate.taxtype}, `,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETETAXRATE",
        delete: changes,
        user: userId?.email || "",
      },
    });

    return NextResponse.json(taxRate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete taxRate." }),
      { status: 500 }
    );
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
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse(JSON.stringify({ error: "Description is required!" }), {
        status: 400,
      });
    }

    if (!percentage) {
      return new NextResponse(JSON.stringify({ error: "Percentage is required!" }), {
        status: 400,
      });
    }

    if (!inclusive) {
      return new NextResponse(JSON.stringify({ error: "Inclusive is required!" }), {
        status: 400,
      });
    }

    if (!active) {
      return new NextResponse(JSON.stringify({ error: "Active is required!" }), {
        status: 400,
      });
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

    const existingTaxRate = await prismadb.taxRate.findUnique({
      where: {
        id: params.taxrateId,
      },
    });

    // Cập nhật thông tin tương ứng trên Stripe
    await stripe.taxRates.update(params.taxrateId, {
      display_name: name,
      description: description,
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

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: { [key: string]: { oldValue: any; newValue: any } } = {};
    for (const key in existingTaxRate) {
      if (
        existingTaxRate.hasOwnProperty(key) &&
        taxRateupdate.hasOwnProperty(key)
      ) {
        if (
          existingTaxRate[key as keyof typeof existingTaxRate] !==
          taxRateupdate[key as keyof typeof taxRateupdate]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingTaxRate[key as keyof typeof existingTaxRate],
              newValue: taxRateupdate[key as keyof typeof taxRateupdate],
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
        type: "UPDATETAXRATE",
        user: userId?.email || "",
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

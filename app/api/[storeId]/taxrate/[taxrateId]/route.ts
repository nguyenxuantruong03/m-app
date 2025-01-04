import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { createTranslator } from "next-intl";

type TaxRateValue = string | number | Date | boolean | undefined | null;

interface ChangeRecord {
  oldValue: TaxRateValue;
  newValue: TaxRateValue;
}

export async function GET(
  req: Request,
  { params }: { params: { taxrateId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!params.taxrateId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.taxrate.taxRateIdRequired") }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied")  }),
        { status: 403 }
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
      JSON.stringify({ error: t("toastError.taxrate.internalErrorGetTaxrate") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taxrateId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!params.taxrateId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.taxrate.taxRateIdRequired") }),
        { status: 400 }
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
        user: user?.email || "",
      },
    });

    return NextResponse.json(taxRate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.taxrate.internalErrorDelete") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { taxrateId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();
    const { name, description, percentage, inclusive, active, taxtype } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: t("toastError.name") }), {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse(JSON.stringify({ error: t("toastError.description") }), {
        status: 400,
      });
    }

    if (!percentage) {
      return new NextResponse(JSON.stringify({ error: t("toastError.taxrate.percentageRequired") }), {
        status: 400,
      });
    }

    if (!inclusive) {
      return new NextResponse(JSON.stringify({ error: t("toastError.taxrate.inclusiveRequired") }), {
        status: 400,
      });
    }

    if (!active) {
      return new NextResponse(JSON.stringify({ error: t("toastError.taxrate.activeRequired") }), {
        status: 400,
      });
    }

    if (!params.taxrateId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.taxrate.taxRateIdRequired") }),
        { status: 400 }
      );
    }

    // Kiểm tra xem tên taxRate mới có trùng với bản ghi nào trong store này không, ngoại trừ taxrateId hiện tại
    const duplicateTaxRate = await prismadb.taxRate.findFirst({
      where: {
        name: name,
        storeId: params.storeId,
        NOT: {
          id: params.taxrateId,  // Loại trừ taxrateId hiện tại
        },
      },
    });

    if (duplicateTaxRate) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.taxrate.taxrateAlreadyExists") }),
        { status: 400 }
      );
    }

    const existingTaxRate = await prismadb.taxRate.findUnique({
      where: {
        id: params.taxrateId,
      },
    });

    if (!existingTaxRate) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.taxrate.taxRateNotFound") }),
        { status: 404 }
      );
    }

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
    const changes: Record<string, ChangeRecord> = {};
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
        user: user?.email || "",
      },
    });

    return NextResponse.json(taxRateupdate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.taxrate.internalErrorPatchTaxrate") }),
      { status: 500 }
    );
  }
}

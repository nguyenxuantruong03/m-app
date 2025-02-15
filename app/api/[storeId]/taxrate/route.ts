import { stripe } from "@/lib/stripe";

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { TaxType, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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
      return new NextResponse(
        JSON.stringify({ error: t("toastError.name") }),
        { status: 400 }
      );
    }

    if (!percentage) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.taxrate.percentageRequired") }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    // Kiểm tra xem tên taxRate có trùng với bất kỳ bản ghi nào trong store này không
    const duplicateTaxRate = await prismadb.taxRate.findFirst({
      where: {
        name: name,
        storeId: params.storeId,
      },
    });

    if (duplicateTaxRate) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.taxrate.taxrateAlreadyExists"),
        }),
        { status: 400 }
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

    const sentTaxRate = {
      name: createdCoupon?.name,
      description: createdCoupon?.description,
      percentage: createdCoupon?.percentage,
      inclusive: createdCoupon?.inclusive,
      active: createdCoupon?.active,
      taxtype: createdCoupon?.taxtype,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentTaxRate.name}, Description: ${sentTaxRate.description}, Percentage: ${sentTaxRate.percentage}, Inclusive: ${sentTaxRate.inclusive}, Active: ${sentTaxRate.active}, Taxtype: ${sentTaxRate.taxtype}, `,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATETAXRATE",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(createdCoupon);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.taxrate.internalErrorPostTaxrate") }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    const gettaxRate = await prismadb.taxRate.findMany();

    return NextResponse.json(gettaxRate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.taxrate.internalErrorGetTaxrate") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { ids } = body;

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

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.idsArrayNotEmpty") }),
        { status: 400 }
      );
    }

    // Fetch all taxRate to delete, including their images
    const TaxRateToDelete = await prismadb.taxRate.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = TaxRateToDelete.map((item) => ({
      name: item.name,
      description: item.description,
      percentage: item.percentage,
      inclusive: item.inclusive,
      active: item.active,
      taxtype: item.taxtype,
    }));

    // Delete all the taxRate in one operation
    await prismadb.taxRate.deleteMany({
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
        delete: changesArray.map(
          (change) =>
            `DeleteName: ${change.name}, DeleteDescription: ${change.description}, DeletePercentage: ${change.percentage}, DeleteInclusive: ${change.inclusive}, DeleteActive: ${change.active}, DeleteTaxtype: ${change.taxtype}, `
        ),
        type: "DELETEMANY-TAXRATE",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: t("toastSuccess.deletionSuccess") });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.taxrate.internalErrorDelete") }),
      { status: 500 }
    );
  }
}

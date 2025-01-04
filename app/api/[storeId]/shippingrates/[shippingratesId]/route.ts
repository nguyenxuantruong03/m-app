import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { createTranslator } from "next-intl";

type ShippingRateValue = string | number |  Date | boolean | undefined | null;

interface ChangeRecord {
  oldValue: ShippingRateValue;
  newValue: ShippingRateValue;
}

export async function GET(
  req: Request,
  { params }: { params: { shippingratesId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!params.shippingratesId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.shippingRateIdRequired") }),
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
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
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
      JSON.stringify({ error: t("toastError.shippingrate.internalErrorGetShippingRate") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { shippingratesId: string; storeId: string } }
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

    if (!params.shippingratesId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.shippingRateIdRequired") }),
        { status: 400 }
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
        user: user?.email || "",
      },
    });

    return NextResponse.json(shippingRates);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.shippingrate.internalErrorDeleteShippingRate") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { shippingratesId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
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

    if(!name){
      return new NextResponse(
        JSON.stringify({ error: t("toastError.name") }),
        { status: 400 }
      );
    }

    if(!taxbehavior){
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.taxBehaviorRequired") }),
        { status: 400 }
      );
    }

    if(!amount){
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.amountRequired") }),
        { status: 400 }
      );
    }

    if(!unitmin){
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.unitMinRequired") }),
        { status: 400 }
      );
    }

    if(!valuemin){
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.valueMinRequired") }),
        { status: 400 }
      );
    }

    if(!unitmax){
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.unitMaxRequired") }),
        { status: 400 }
      );
    }

    if(!valuemax){
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.valueMaxRequired") }),
        { status: 400 }
      );
    }

    if (!params.shippingratesId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.shippingRateIdRequired") }),
        { status: 400 }
      );
    }

    const existingShippingRates = await prismadb.shippingRates.findUnique({
      where: {
        id: params.shippingratesId,
      },
    });

    if (!existingShippingRates) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.shippingrate.shippingRateNotFound") }),
        { status: 404 }
      );
    }

        // Kiểm tra xem có shipping rate nào khác với name trùng
        const shippingRateWithSameName = await prismadb.shippingRates.findFirst({
          where: {
            name: name,
            storeId: params.storeId,  // Chỉ tìm trong store hiện tại
            NOT: {
              id: params.shippingratesId,  // Loại bỏ bản ghi với id hiện tại
            },
          },
        });
    
        if (shippingRateWithSameName) {
          return new NextResponse(
            JSON.stringify({
              error: t("toastError.shippingrate.shippingRateAlreadyExists")
            }),
            { status: 400 }
          );
        }

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
        user: user?.email || "",
      },
    });

    return NextResponse.json(shippingRateupdate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.shippingrate.internalErrorPatchShippingRate") }),
      { status: 500 }
    );
  }
}

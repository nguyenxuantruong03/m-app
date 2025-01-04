import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { ImageBillboard, UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";

// Update the BillboardValue type to include the new types
type BillboardValue =
  | string
  | number
  | boolean
  | string[]
  | Date
  | ImageBillboard[]
  | null
  | undefined;

// Define the type for change records
interface ChangeRecord {
  oldValue: BillboardValue;
  newValue: BillboardValue;
}

export async function GET(
  req: Request,
  { params }: { params: { imagebillboardId: string } }
) {
  const user = await currentUser();
  //language
   const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!params.imagebillboardId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.billboardID") }),
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

    const billboard = await prismadb.imageBillboard.findUnique({
      where: {
        id: params.imagebillboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.billboard.intternalErrorGetBillboard") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { imagebillboardId: string; storeId: string } }
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

    if (!params.imagebillboardId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.billboardID") }),
        { status: 400 }
      );
    }

    const existingBillboard = await prismadb.imageBillboard.findUnique({
      where: {
        id: params.imagebillboardId,
      },
    });

    const imageBillboardData = await prismadb.imageBillboard.findMany();

    let billboard;
    if (imageBillboardData.some(billboard => billboard.id === params.imagebillboardId)) {
      billboard = await prismadb.imageBillboard.delete({
        where: {
          id: params.imagebillboardId,
        },
      });
    }  else {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.billboardNotFound") }),
        { status: 404 }
      );
    }

    const sentBillboard = {
      label: billboard?.label,
      description: billboard?.description,
      valueImage: existingBillboard?.url,
    };

    // Log sự thay đổi của sentBillboard
    const changes = [
      `DeleteLabel: ${sentBillboard.label}, ImageBillboard: ${sentBillboard.valueImage}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changes,
        type: "DELETEIMAGEBILLBOARD",
        user: user?.email || "",
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.billboard.intternalErrorDeleteBillboard") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { imagebillboardId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
   const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { label, url, description, link } = body;

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

    if (!label) {
      return new NextResponse(JSON.stringify({ error: t("toastError.label") }), {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.description") }),
        { status: 400 }
      );
    }

    if (!url) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.imageBillboard") }),
        { status: 400 }
      );
    }

    if (!link) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.linkRequired")}),
        { status: 400 }
      );
    }

    if (!params.imagebillboardId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.billboardID") }),
        { status: 400 }
      );
    }

    // Kiểm tra tồn tại trong bảng imageBillboard
    const existingBillboard = await prismadb.imageBillboard.findUnique({
      where: {
        id: params.imagebillboardId,
      }
    });

    if (!existingBillboard) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.billboardNotFound") }),
        { status: 404 }
      );
    }

    // Kiểm tra xem label mới có trùng với label đã tồn tại ngoài trừ billboard hiện tại không
    const labelExists = await prismadb.imageBillboard.findFirst({
      where: {
        label: label,
        NOT: {
          id: params.imagebillboardId,
        },
      },
    });

    if (labelExists) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.labelAlreadyExists") }),
        { status: 400 }
      );
    }

    // Update existing billboard
    const updatedBillboard = await prismadb.imageBillboard.update({
      where: {
        id: params.imagebillboardId,
      },
      data: {
        url: url,
        label: label,
        description: description,
        link: link
      },
    });

    // Xác định bản ghi ban đầu
    const originalBillboard = existingBillboard;

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const ignoredFields = ["createdAt", "updatedAt"];
    const changes: Record<string, ChangeRecord> = {};
    for (const key in originalBillboard) {
      if (
        originalBillboard.hasOwnProperty(key) &&
        updatedBillboard[key as keyof typeof updatedBillboard] !== undefined &&
        originalBillboard[key as keyof typeof originalBillboard] !==
        updatedBillboard[key as keyof typeof updatedBillboard]
      ) {
        // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
        if (!ignoredFields.includes(key)) {
          changes[key] = {
            oldValue: originalBillboard[key as keyof typeof originalBillboard],
            newValue: updatedBillboard[key as keyof typeof updatedBillboard],
          };
        }
      }
    }

    // Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
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
        type: "UPDATEIMAGEBILLBOARD",
        user: user?.email || "",
      },
    });

    return NextResponse.json(updatedBillboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.billboard.intternalErrorPatchBillboard") }),
      { status: 500 }
    );
  }
}

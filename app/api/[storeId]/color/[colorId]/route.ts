import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

type ColorValue = string | Date | undefined;

interface ChangeRecord {
  oldValue: ColorValue;
  newValue: ColorValue;
}

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!params.colorId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.colorRequired") }),
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

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.color.internalErrorGetColor") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
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

    if (!params.colorId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.color.colorIdRequired") }),
        { status: 400 }
      );
    }

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    const sentColor = {
      name: color?.name,
      value: color.value,
    };

    // Log sự thay đổi của sentVeirifi
    const changes = [
      `DeleteName: ${sentColor.name}, value: ${sentColor.value}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETECOLOR",
        delete: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.color.internalErrorDeleteColor") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();
    const { name, value } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound")}),
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
        {
          status: 400,
        }
      );
    }

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.colorRequired") }),
        {
          status: 400,
        }
      );
    }

    if (!params.colorId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.color.colorIdRequired") }),
        { status: 400 }
      );
    }

    // Kiểm tra nếu có màu khác với tên trùng tên mới nhưng id khác
    const existingColorWithSameName = await prismadb.color.findFirst({
      where: {
        name,
        storeId: params.storeId,
        NOT: { id: params.colorId }, // Loại trừ màu với id hiện tại
      },
    });

    if (existingColorWithSameName) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.color.colorExists") }),
        { status: 400 }
      );
    }

    const existingColor = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    // Kiểm tra nếu không tìm thấy color
    if (!existingColor) {
      return new NextResponse(JSON.stringify({ error: t("toastError.color.colorNotFound") }), {
        status: 404,
      });
    }

    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingColor) {
      if (existingColor.hasOwnProperty(key) && color.hasOwnProperty(key)) {
        if (
          existingColor[key as keyof typeof existingColor] !==
          color[key as keyof typeof color]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingColor[key as keyof typeof existingColor],
              newValue: color[key as keyof typeof color],
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
        type: "UPDATECOLOR",
        user: user?.email || "",
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.color.internalErrorPatchColor") }),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";

type SizeValue = string | Date | undefined;

interface ChangeRecord {
  oldValue: SizeValue;
  newValue: SizeValue;
}

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!params.sizeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.size.sizeAlreadyExists") }),
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

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.size.internalErrorGetSize") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
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

    if (!params.sizeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.size.sizeIdRequired") }),
        { status: 400 }
      );
    }

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    const sentSize = {
      name: size?.name,
      value: size.value,
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentSize.name}, Value: ${sentSize.value}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETESIZE",
        delete: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.size.internalErrorDeleteSize") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
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
        JSON.stringify({ error: t("toastError.name")}),
        {
          status: 400,
        }
      );
    }

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.size.valueRequired") }),
        {
          status: 400,
        }
      );
    }

    if (!params.sizeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.size.sizeIdRequired") }),
        { status: 400 }
      );
    }

    const existingSize = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    if (!existingSize) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.size.sizeNotFound") }),
        { status: 404 }
      );
    }

    // Kiểm tra tên mới có trùng với bất kỳ size nào khác trong cùng storeId không (ngoại trừ size hiện tại)
    const duplicateSize = await prismadb.size.findFirst({
      where: {
        name: name,
        storeId: params.storeId,
        NOT: {
          id: params.sizeId, // Loại bỏ size hiện tại khỏi kiểm tra
        },
      },
    });

    if (duplicateSize) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.size.sizeAlreadyExists"),
        }),
        { status: 400 }
      );
    }

    const size = await prismadb.size.update({
      where: {
        id: params.sizeId,
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
    for (const key in existingSize) {
      if (existingSize.hasOwnProperty(key) && size.hasOwnProperty(key)) {
        if (
          existingSize[key as keyof typeof existingSize] !==
          size[key as keyof typeof size]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingSize[key as keyof typeof existingSize],
              newValue: size[key as keyof typeof size],
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
        type: "UPDATESIZE",
        user: user?.email || "",
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.size.internalErrorPatchSize") }),
      { status: 500 }
    );
  }
}

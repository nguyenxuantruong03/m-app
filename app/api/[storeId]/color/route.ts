import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
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
        JSON.stringify({ error: t("toastError.nameRequired") }),
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

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    // Kiểm tra nếu đã có màu với tên và giá trị giống nhau
    const existingColor = await prismadb.color.findFirst({
      where: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    if (existingColor) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.color.colorExists") }),
        { status: 400 }
      );
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    const sentColor = {
      name: color?.name,
      value: color.value,
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentColor.name}, Value: ${sentColor.value}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATE-COLOR",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.color.internalErrorPostColor")}),
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

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.color.internalErrorGetColor") }),
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

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.idsArrayNotEmpty") }),
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
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 405 }
      );
    }

    // Fetch all color to delete, including their images
    const ColorToDelete = await prismadb.color.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = ColorToDelete.map((color) => ({
      name: color.name,
      value: color.value,
    }));

    // Delete all the color in one operation
    await prismadb.color.deleteMany({
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
          (change) => `DeleteName: ${change.name}, Value: ${change.value}`
        ),
        type: "DELETEMANYCOLOR",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: t("toastSuccess.deletionSuccess") });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.color.internalErrorDeleteColor") }),
      { status: 500 }
    );
  }
}

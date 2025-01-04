import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  const body = await req.json();
  const { label, imagebillboard, description } = body;
  
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

    if (!label) {
      return new NextResponse(JSON.stringify({ error: t("toastError.label") }), {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.description") }),
        {
          status: 400,
        }
      );
    }

    if (!imagebillboard || !imagebillboard.length) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.imageBillboard")}),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    // Kiểm tra xem label mới có bị trùng với label cũ không
    const existingBillboard = await prismadb.billboard.findFirst({
      where: {
        storeId: params.storeId,
        label: label,
      },
    });

    if (existingBillboard) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.labelAlreadyExists") }),
        { status: 400 }
      );
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        description,
        imagebillboard: {
          createMany: {
            data: [...imagebillboard.map((image: { url: string }) => image)],
          },
        },
        storeId: params.storeId,
      },
    });

    const sentBillboard = {
      label: billboard?.label,
      description: billboard?.description,
      imagebillboard: imagebillboard.map((image: { url: string }) => image.url),
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Label: ${sentBillboard.label}, ImageBillboard: ${sentBillboard.imagebillboard} description: ${sentBillboard.description}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: changes,
        type: "CREATEBILLBOARD",
        user: user?.email || "",
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.billboard.intternalErrorPostBillboard") }),
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

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        imagebillboard: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.billboard.intternalErrorGetBillboard") }),
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

    if (user.role !== UserRole.ADMIN) {
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

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    // Fetch all billboards to delete, including their images
    const billboardsToDelete = await prismadb.billboard.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        imagebillboard: true,
      },
    });

    // Create an array of changes for logging
    const changesArray = billboardsToDelete.map((billboard) => ({
      label: billboard.label,
      description: billboard.description,
      valueImage: billboard.imagebillboard.map((image) => image.url),
    }));

    // Delete all the billboards in one operation
    await prismadb.billboard.deleteMany({
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
            `DeleteLabel: ${change.label}, ImageBillboard: ${change.valueImage}, Descriotion: ${change.description}`
        ),
        type: "DELETEMANYBILLBOARD",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: t("toastSuccess.deletionSuccess") });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.billboard.intternalErrorDeleteBillboard") }),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";


export async function GET(
  req: Request,
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

    const billboards = await prismadb.imageBillboard.findMany({
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

    // Fetch all billboards to delete from both tables
    const imageBillboardsToDelete = await prismadb.imageBillboard.findMany({
      where: {
        id: {
          in: ids,
        },
      }
    });

    // Create an array of changes for logging
    const changesArray = [
      ...imageBillboardsToDelete.map(billboard => ({
        label: billboard.label,
        description: billboard.description,
        valueImage: billboard.url,
      })),
    ];

    // Delete all the billboards in both tables
    await prismadb.imageBillboard.deleteMany({
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
        delete: changesArray.map(change => `DeleteLabel: ${change.label}, ImageBillboard: ${change.valueImage}, Description: ${change.description}`),
        type: "DELETEMANYIMAGEBILLBOARD",
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

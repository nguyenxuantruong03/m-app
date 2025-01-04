import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function PATCH(
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
    const { name } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        {
          status: 403,
        }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 405 }
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

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorPatchStore") }),
      {
        status: 500,
      }
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
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        {
          status: 403,
        }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t('toastError.permissionDenied') }),
        { status: 405 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
        { status: 400 }
      );
    }

    // Kiểm tra tổng số cửa hàng hiện tại
    const totalStores = await prismadb.store.count();
    if (totalStores <= 1) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.cannotDeleteStore") }),
        { status: 400 }
      );
    }

    const store = await prismadb.store.delete({
      where: {
        id: params.storeId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorDeleteStore") }),
      {
        status: 500,
      }
    );
  }
}

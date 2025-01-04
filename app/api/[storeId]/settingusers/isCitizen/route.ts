import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  const body = await req.json();
  const { userId } = body;

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

  try {
    const banuser = await prismadb.user.update({
      where: { id: userId },
      data: {
        isCitizen: true,
      },
    });
    return NextResponse.json(banuser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.user.internalErrorCitizen") }),
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  
  const body = await req.json();
  const { userId } = body;

  if (!user) {
    return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
      status: 400,
    });
  }

  if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.permissionDenied") }),
      { status: 403 }
    );
  }

  try {
    const banuser = await prismadb.user.update({
      where: { id: userId },
      data: {
        isCitizen: false,
      },
    });
    return NextResponse.json(banuser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.user.internalErrorCitizen") }),
      {
        status: 500,
      }
    );
  }
}

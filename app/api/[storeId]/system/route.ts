import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";

export async function GET() {
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

    const system = await prismadb.size.findMany();

    return NextResponse.json(system);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.system.internalErrorGetSystem") }),
      { status: 500 }
    );
  }
}

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { translateSystemGet } from "@/translate/translate-api";

export async function GET() {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const systemGetMessage = translateSystemGet(LanguageToUse);
  try {

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: systemGetMessage.userNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: systemGetMessage.permissionDenied }),
        { status: 403 }
      );
    }

    const system = await prismadb.size.findMany();

    return NextResponse.json(system);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: systemGetMessage.internalError }),
      { status: 500 }
    );
  }
}

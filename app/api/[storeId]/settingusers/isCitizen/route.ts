import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateSettingUserIsCitizen } from "@/translate/translate-api";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const settingUserIsCitizenMessage = translateSettingUserIsCitizen(LanguageToUse)

  const body = await req.json();
  const { userId } = body;

  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: settingUserIsCitizenMessage.userIdNotFound }),
      { status: 403 }
    );
  }

  if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
    return new NextResponse(
      JSON.stringify({ error: settingUserIsCitizenMessage.permissionDenied }),
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
      JSON.stringify({ error: settingUserIsCitizenMessage.internalError }),
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const settingUserIsCitizenMessage = translateSettingUserIsCitizen(LanguageToUse)
  
  const body = await req.json();
  const { userId } = body;

  if (!user) {
    return new NextResponse(JSON.stringify({ error: settingUserIsCitizenMessage.userIdNotFound }), {
      status: 400,
    });
  }

  if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
    return new NextResponse(
      JSON.stringify({ error: settingUserIsCitizenMessage.permissionDenied }),
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
      JSON.stringify({ error: settingUserIsCitizenMessage.internalError }),
      {
        status: 500,
      }
    );
  }
}

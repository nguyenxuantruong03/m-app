import { sendUnBanUser } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";

type SettingUserUnbanValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | null
  | undefined;

interface ChangeRecord {
  oldValue: SettingUserUnbanValue;
  newValue: SettingUserUnbanValue;
}

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

  const body = await req.json();
  const { userId } = body;

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

    const existingUser = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser?.ban && !existingUser?.isbanforever) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.userNotBanned") }),
        {
          status: 404,
        }
      );
    }

    if (user?.id === userId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.user.cannotUnbanSelf")
        }),
        { status: 400 }
      );
    }

    const unbanUser = await prismadb.user.update({
      where: { id: userId },
      data: {
        ban: false,
        resendCount: 0,
        resendTokenVerify: 0,
        resendEmailResetPassword: 0,
        resendTokenResetPassword: 0,
        resendBanUserNotStart: 0,
        resendUnBanUser: 0,
        banExpires: null,
        isbanforever: false,
      },
    });

    await sendUnBanUser(languageToUse, unbanUser.email, unbanUser.name);
    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingUser) {
      if (existingUser.hasOwnProperty(key) && unbanUser.hasOwnProperty(key)) {
        if (
          existingUser[key as keyof typeof existingUser] !==
          unbanUser[key as keyof typeof unbanUser]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingUser[key as keyof typeof existingUser],
              newValue: unbanUser[key as keyof typeof unbanUser],
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
        type: "UPDATEUNBANUSER",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(unbanUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: t("toastError.user.internalErrorUnbanUser")
      }),
      { status: 500 }
    );
  }
}

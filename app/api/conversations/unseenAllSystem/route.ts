import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const currentuser = await currentUser()
  const userId = process.env.NEXT_PUBLIC_USERID_SYSTEM;
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });
  const languageToUse = currentuser?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {

    if (!currentuser?.id || !currentuser?.email) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 403,
      });
    }

    const unseenAllSystemMessages = await prismadb.message.findMany({
      where: {
        AND: [
          {
            senderId: {
              not: user?.id, // Loại bỏ tin nhắn do chính user gửi
            },
          },
          {
            NOT: {
              seenIds: {
                has: user?.id, // Chỉ lấy tin nhắn mà seenIds không chứa user.id
              },
            },
          },
        ],
      },
    });

    return NextResponse.json(unseenAllSystemMessages);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: t("toastError.intternalErrorGetUnseenAll") }), {
      status: 500,
    });
  }
}

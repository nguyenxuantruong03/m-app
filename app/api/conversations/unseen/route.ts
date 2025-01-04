import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!user?.id || !user?.email) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 403,
      });
    }

    const unseenMessages = await prismadb.message.findMany({
      where: {
        NOT: {
          senderId: user.id, // Loại bỏ tin nhắn do người dùng hiện tại gửi
        },
        AND: [
          {
            NOT: {
              seenIds: {
                has: user.id, // Chỉ lấy tin nhắn chưa được xem
              },
            },
          },
        ],
      },
    });

    return NextResponse.json(unseenMessages);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: t("toastError.intternalErrorGetUnseen") }), {
      status: 500,
    });
  }
}

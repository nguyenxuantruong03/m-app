import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";
import { createTranslator } from "next-intl";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { conversationId } = params;
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  
  try {
    if (!user?.id) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 403,
      });
    }

    const existingConversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!existingConversation) {
      return new NextResponse(JSON.stringify({ error: t("toastError.existingConversationNotFound") }), {
        status: 400,
      });
    }

    // Transaction để xóa message và conversation
    const deletedData = await prismadb.$transaction([
      prismadb.message.deleteMany({
        where: {
          conversationId: conversationId,
        },
      }),
      prismadb.conversation.deleteMany({
        where: {
          id: conversationId,
          userIds: {
            hasSome: [user.id],
          },
        },
      }),
    ]);

    /* Đoạn mã này đang lặp qua mảng `users` của đối tượng `currentConversation` và
     kích hoạt sự kiện Pusher cho mỗi người dùng có địa chỉ email. Sự kiện được kích hoạt là
     `conversation:remove` và dữ liệu được gửi cùng với sự kiện là `currentConversation`
     sự vật. Mã này có khả năng được sử dụng để thông báo cho người dùng có địa chỉ email rằng một cuộc trò chuyện đã
     đã bị xóa. */
    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation
        );
      }
    });

    return NextResponse.json(deletedData);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: t("toastError.intternalErrorDeleteConversation") }), {
      status: 500,
    });
  }
}

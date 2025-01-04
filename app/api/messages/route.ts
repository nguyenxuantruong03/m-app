import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const users = await currentUser();
  const body = await request.json();
  const { message, image, conversationId } = body;
  const languageToUse = users?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!users?.id || !users?.email) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 403,
      });
    }

    // Tạo một tin nhắn mới
    const newMessage = await prismadb.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: users.id,
          },
        },
        seen: {
          connect: {
            id: users.id, // Tin nhắn này được đánh dấu "đã xem" bởi người dùng hiện tại
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    // Cập nhật trạng thái "seen" cho tất cả tin nhắn chưa được đọc trong cuộc hội thoại
    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse(JSON.stringify({ error: t("toastError.conversationIdRequired") }), {
        status: 400,
      });
    }

    // Lọc các tin nhắn chưa được xem
    const unreadMessages = conversation.messages.filter(
      (message) => !message.seenIds.includes(users.id || "")
    );

    // Nếu có tin nhắn chưa được xem, cập nhật `seenIds`
    if (unreadMessages.length > 0) {
      await prismadb.message.updateMany({
        where: {
          id: { in: unreadMessages.map(message => message.id) }
        },
        data: {
          seenIds: {
            push: users.id // Add the current user's ID to the seenIds array
          }
        }
      });
  
    }

    // Cập nhật cuộc hội thoại với tin nhắn cuối cùng
    const updatedConversation = await prismadb.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    // Trigger sự kiện "messages:new" cho tất cả người dùng trong cuộc hội thoại
    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    // Lấy tin nhắn cuối cùng
    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    // Gửi thông báo "conversation:update" cho tất cả người dùng
    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });

      // Trigger sự kiện "messages:unseen" cho những người dùng khác người gửi
      if (user.email !== users.email) {
        pusherServer.trigger(user.email!, "messages:unseenNewMessage", {
          conversationId: conversationId,
          message: newMessage,
        });
      }
    });

    // Get all unread messages after create message
    const unseenMessages = await prismadb.message.findMany({
      where: {
        NOT: {
          senderId: users.id, // Loại bỏ tin nhắn do người dùng hiện tại gửi
        },
        AND: [
          {
            seenIds: {
              // Kiểm tra tin nhắn chưa được xem bởi người dùng hiện tại
              has: users.id,  // Sửa lại logic nếu người dùng chưa xem
            },
          },
          {
            NOT: {
              seenIds: {
                has: users.id,  // Điều kiện tin nhắn chưa được xem
              },
            },
          },
        ],
      },
      select: {
        id: true,
        conversationId: true,
        body: true,
        createdAt: true,
        senderId: true,
        seenIds: true,
      },
    });

    await pusherServer.trigger(users.email, 'messages:unseen', unseenMessages);

    return NextResponse.json(newMessage);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: t("toastError.internalErrorGetMessage") }), {
      status: 500,
    });
  }
}



export async function PATCH(request: Request) {
  const users = await currentUser()
  const languageToUse = users?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  const body = await request.json()
  const { conversationId } = body
  
  try {
    if (!users) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 403,
      });
    }

    const messages = await prismadb.message.findMany({
      where: {
        conversationId: conversationId
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });


    return NextResponse.json(messages)
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: t("toastError.internalErrorGetMessage") }), {
      status: 500,
    });
  }
}


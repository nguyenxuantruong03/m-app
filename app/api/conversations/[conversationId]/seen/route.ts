import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server"

interface IParams {
  conversationId?: string
}

export async function POST(resques: Request, { params }: { params: IParams }) {
  try {
    const user = await currentUser();
    const { conversationId } = params;

    if (!user?.id || !user?.email) {
      return new NextResponse('Unauthorized ', { status: 401 });
    }

    // Find the existing conversation
    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true,
            sender: true
          }
        },
        users: true
      }
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Find all unread messages in the conversation
    const unreadMessages = conversation.messages.filter(
      message => !message.seenIds.includes(user.id || "")
    );

    if (unreadMessages.length === 0) {
      return NextResponse.json(conversation);
    }

     // Lọc những tin nhắn chưa chứa user.id trong seenIds
    const messagesToUpdate = unreadMessages.filter(
      message => !message.seenIds.includes(user.id || "")
    );

    if (messagesToUpdate.length > 0) {
      // Kiểm tra trước khi cập nhật để tránh việc thêm user.id 2 lần
      const updatedMessages = messagesToUpdate.map((message) => {
        if (!message.seenIds.includes(user.id || "")) {
          return {
            ...message,
            seenIds: [...message.seenIds, user.id] // Thêm user.id vào nếu chưa có
          };
        }
        return message;
      });

      // Cập nhật seenIds cho tin nhắn chưa được xem
      await prismadb.message.updateMany({
        where: {
          id: { in: updatedMessages.map(message => message.id) },
        },
        data: {
          seenIds: {
            push: user.id,
          },
        },
      });

      // Trigger updates cho các tin nhắn đã được cập nhật
      await pusherServer.trigger(user.email, 'conversation:update', {
        id: conversationId,
        messages: updatedMessages,
      });

      await pusherServer.trigger(conversationId!, 'message:update', updatedMessages);
    }

    // Get all unread messages after updating the seen status
    const unseenMessages = await prismadb.message.findMany({
      where: {
        NOT: {
          senderId: user.id, // Loại bỏ tin nhắn do người dùng hiện tại gửi
        },
        AND: [
          {
            seenIds: {
              // Kiểm tra tin nhắn chưa được xem bởi người dùng hiện tại
              has: user.id,  // Sửa lại logic nếu người dùng chưa xem
            },
          },
          {
            NOT: {
              seenIds: {
                has: user.id,  // Điều kiện tin nhắn chưa được xem
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

    // Send the updated unseen messages via Pusher
    await pusherServer.trigger(user.email, 'messages:unseen', unseenMessages);

    return NextResponse.json(messagesToUpdate);
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGE_SEEN');
    return new NextResponse("Internal Error", { status: 500 });
  }
}

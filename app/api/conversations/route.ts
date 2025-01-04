import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";
import { createTranslator } from "next-intl";

export async function POST(request: Request) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  const body = await request.json();
  const { userId } = body;
  try {
    if (!user?.id || !user?.email) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 403,
      });
    }
    /* Mã này đang truy vấn ORM của Prisma để tìm các cuộc hội thoại hiện có giữa người dùng 
    hiện tại và người dùng khác với `userId` đã cho. Tính năng này tìm kiếm các cuộc hội thoại
      trong đó thuộc tính mảng `userIds` chứa cả `user.id` và `userId`, bất kể thứ tự của chúng. 
      Các kết quả được lưu trữ trong biến `currentConversations`. */
    const exisitingConversations = await prismadb.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [user.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, user.id],
            },
          },
        ],
      },
    });
    const singleConversation = exisitingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    /* Mã này đang kiểm tra xem có cuộc trò chuyện nào đang tồn tại giữa người dùng hiện tại và người dùng có `userId` 
      được cung cấp trong yêu cầu hay không. Nó thực hiện điều này bằng cách truy vấn ORM Prisma cho các cuộc hội thoại 
      trong đó mảng `userIds` chứa cả `user.id` và `userId`, bất kể thứ tự của chúng. Nếu có một cuộc hội thoại hiện có, 
      nó sẽ trả về phản hồi JSON với cuộc hội thoại đó. Biến `singleConversation` được sử dụng để lưu trữ cuộc hội thoại đầu tiên 
      trong mảng `exisitingConversations` và nếu nó tồn tại, nó sẽ trả về một phản hồi JSON với cuộc hội thoại đó. */
    const newConversation = await prismadb.conversation.create({
      data: {
        userId: user.id,
        users: {
          connect: [{ id: user.id }, { id: userId }],
        },
        userIds: [user.id, userId],
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });
    /* Mã này đang tạo một cuộc hội thoại mới giữa hai người dùng trong cơ sở dữ liệu Prisma. Đầu tiên, nó kết nối người dùng hiện 
      tại và người dùng có `userId` được cung cấp với cuộc hội thoại bằng cách đặt thuộc tính `users` trong đối tượng `data` và sử dụng 
      phương thức `connect` để ánh xạ các giá trị `id` của họ. Sau đó, nó đặt thuộc tính `include` thành `true` để bao gồm thuộc tính `users` 
      trong phản hồi. Cuối cùng, nó trả về phản hồi JSON với cuộc trò chuyện mới được tạo. */
    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.intternalErrorPostConversation") }),
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request: Request) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  const body = await request.json();
  const { conversationId } = body;
  try {
    if (!user?.id || !user?.email) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 403,
      });
    }

    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(conversation);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: t("toastError.intternalErrorPatchConversation") }), {
      status: 500,
    });
  }
}

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const userId = process.env.NEXT_PUBLIC_USERID_SYSTEM;
    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user?.id || !user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const unseenAllSystemMessages = await prismadb.message.findMany({
      where: {
        AND: [
          {
            senderId: {
              not: user.id, // Loại bỏ tin nhắn do chính user gửi
            },
          },
          {
            NOT: {
              seenIds: {
                has: user.id, // Chỉ lấy tin nhắn mà seenIds không chứa user.id
              },
            },
          },
        ],
      },
    });

    return NextResponse.json(unseenAllSystemMessages);
  } catch (error: any) {
    return new NextResponse("InternalError", { status: 500 });
  }
}

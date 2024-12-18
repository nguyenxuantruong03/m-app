import { currentUser } from "@/lib/auth"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const user = await currentUser()

    if (!user?.id || !user?.email) {
      return new Response("Unauthorized", { status: 401 })
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
    
    return NextResponse.json(unseenMessages)
  } catch (error: any) {
    return new NextResponse("InternalError", { status: 500 })
  }
}
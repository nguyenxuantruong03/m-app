import { currentUser } from "@/lib/auth"
import prismadb from "@/lib/prismadb"

const getConversations = async () => {
  const user = await currentUser()
  if (!user?.id) {
    return []
  }
  try {
    const conversations = await prismadb.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc"
      },
      where: {
        userIds: {
          has: user.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    })
    return conversations
  } catch (error: any) {
    return []
  }
}
export default getConversations

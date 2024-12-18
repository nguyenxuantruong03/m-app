import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";

const getConversationById = async (conversationId:string)=>{
  try {
    const user = await currentUser();
    if(!user?.email){
      return null;
    }
    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId
      },
      include:{
        users: true
      }
    })
    return conversation;
  }catch(error: any){
    return null;
  }
}
export default getConversationById
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";

interface IParams{
  conversationId?: string;
}

export async function DELETE(request:Request,{params}:{params:IParams}){
  try{
    const {conversationId} = params;
    const user = await currentUser();

    if(!user?.id ){
      return new NextResponse('Unauthorized',{status: 401})
    }

    const existingConversation = await prismadb.conversation.findUnique({
      where:{
        id:conversationId,
      },
      include:{
        users: true
      }
    })
    if(!existingConversation){
      return new NextResponse('Invalid Id',{status:400})
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
    existingConversation.users.forEach((user)=>{
      if(user.email){
        pusherServer.trigger(user.email,'conversation:remove',existingConversation)
      }
    })

    return NextResponse.json(deletedData)
  }catch(error: any){
    console.log(error,'ERROR_CONVERSATION_DELETE')
    return new NextResponse('Internal error', {status: 500})
  }
}
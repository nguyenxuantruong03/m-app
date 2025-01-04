
import Header from "./components/Header"
import Body from "./components/Body"
import Form from "./components/Form"
import EmptyState from "../components/EmptyState"
import getConversationById from "@/actions/getConversationById"
import getMessages from "@/actions/getMessages"
import { currentUser } from "@/lib/auth"
import { notFound } from "next/navigation"

interface IParams {
  conversationId: string
}
/* `{params}: {params: IParams}` là một cú pháp phá hủy được sử dụng để trích xuất 
thuộc tính `params` từ đối tượng được truyền dưới dạng đối số cho hàm `ConversationId`. 
Nó cũng chỉ định loại của thuộc tính `params` thành `IParams`. Cú pháp này được 
sử dụng để đảm bảo rằng đối tượng `params` có hình dạng và thuộc tính chính xác. */
const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const user = await currentUser()

  if (
    !(
      user &&
      user.role === "ADMIN" &&
      user.email === process.env.NEXT_PUBLIC_EMAIL_SYSTEM &&
      user.id === process.env.NEXT_PUBLIC_USERID_SYSTEM
    )
  ) {
    return notFound();
  }
  

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return ( 
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation}/>
        <Body initialMessages={messages}/>
        <Form />
      </div>
    </div>
  );
}
export default ConversationId

import { currentUser } from "@/lib/auth";
import ConversationList from "./components/ConversationList";
import Sidebar from "./components/sidebar/Sidebar";
import getConversations from "@/actions/getConversations";
import { notFound } from "next/navigation";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const currentUsers = await currentUser()

  if (
    !(currentUsers &&
      currentUsers.role === "ADMIN" &&
      currentUsers.email === process.env.NEXT_PUBLIC_EMAIL_SYSTEM &&
      currentUsers.id === process.env.NEXT_PUBLIC_USERID_SYSTEM)
  ) {
    return notFound();
  }
  

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations}/>
        {children}
      </div>
    </Sidebar>
  );
}

import getUser from "@/actions/getUser";
import UserList from "./components/UserList";
import Sidebar from "../conversations/components/sidebar/Sidebar";
import { currentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUser();
  const user = await currentUser();

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
  
  

  return (
    <Sidebar>
      <div className=" h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}

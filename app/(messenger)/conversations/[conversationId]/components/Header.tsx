"use client";

import { useMemo } from "react";
import Link from "next/link";

import { Conversation, User } from "@prisma/client";
import ProfileDrawer from "./ProfileDrawer";
import useActiveList from "@/hooks/useActiveList";
import useOtherUser from "@/hooks/useOtherUser";
import { ChevronLeft } from "lucide-react";
import AvatarBoxChat from "@/components/AvatarBoxChat";
import { translateStatusMessages } from "@/translate/translate-client";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  currentUser: any
  language: string
}

const Header: React.FC<HeaderProps> = ({ conversation,currentUser,language }) => {
  const otherUser = useOtherUser(conversation);

  const statusMessage = translateStatusMessages(language);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    return isActive ? statusMessage.active : statusMessage.offline;
  }, [isActive]);
  return (
    <>
      <div
        className="bg-white dark:bg-slate-700
     w-full 
     flex 
     border-b-[1px] 
     sm:px-4 
     py-3 
     px-4 
     lg:px-6 
     justify-between 
     items-center 
     shadow-sm"
      >
        <div className="flex gap-3 items-center">
          <Link
            className="
      lg:hidden
      block
      text-sky-500
      hover:text-sky-600
      transition
      cursor-pointer
      "
            href="/conversations"
          >
            <ChevronLeft size={32} />
          </Link>
          <AvatarBoxChat user={otherUser} />
          <div className="flex flex-col">
            <div className="text-slate-700 dark:text-slate-200">
              {conversation.name || otherUser.name}
            </div>
            <div
              className={`text-sm 
          font-light ${isActive ? "text-green-500" : "text-amber-500"}`}
            >
              {statusText}
            </div>
          </div>
        </div>
        <ProfileDrawer
        currentUser= {currentUser}
        data={conversation}
        language={language}
      />
      </div>
    </>
  );
};
export default Header;

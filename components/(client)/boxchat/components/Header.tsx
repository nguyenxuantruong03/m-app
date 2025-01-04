"use client";

import { useMemo } from "react";
import { Conversation, User } from "@prisma/client";
import { X } from "lucide-react";
import Avatar from "../../../AvatarBoxChat";
import useOtherUser from "@/hooks/useOtherUser";
import useActiveList from "@/hooks/useActiveList";
import { useTranslations } from "next-intl";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ conversation, onClose }) => {
  const t = useTranslations()
  const otherUser = useOtherUser(conversation);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    return isActive ? t("message.active") : t("message.offline");
  }, [isActive]);
  return (
    <div
      className="flex justify-between sm:px-4 
     py-3 
     px-4 
     lg:px-6 bg-slate-200 dark:bg-slate-700 rounded-t-md shadow-sm"
    >
      <div
        className="
     w-full 
     flex 
     justify-between 
     items-center 
     "
      >
        <div className="flex gap-3 items-center">
          <Avatar user={otherUser} />
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
      </div>

      <X
        className="w-7 h-7 p-1 text-slate-700 dark:text-slate-200 hover:bg-[rgba(0,0,0,0.05)] rounded-full cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};
export default Header;

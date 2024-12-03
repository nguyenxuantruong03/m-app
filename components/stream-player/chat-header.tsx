"use client";

import { translateStreamChat } from "@/translate/translate-client";
import { Skeleton } from "../ui/skeleton";
import { ChatToggle } from "./chat-toggle";
import { VariantToggle } from "./variant-toggle";

interface ChatHeaderProps{
  languageToUse: string;
}

export const ChatHeader = ({languageToUse}:ChatHeaderProps) => {
  //language
  const streamChatMessage = translateStreamChat(languageToUse)
  return (
    <div className="relative p-3 border-b">
      <div className="absolute left-2 top-2 hidden lg:block">
        <ChatToggle languageToUse={languageToUse}/>
      </div>
      <p className="font-semibold text-primary text-center">{streamChatMessage}</p>
      <div className="absolute right-2 top-2">
        <VariantToggle languageToUse={languageToUse}/>
      </div>
    </div>
  );
};

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="absolute h-6 w-6 left-3 top-3" />
      <Skeleton className="w-28 h-6 mx-auto" />
    </div>
  );
};

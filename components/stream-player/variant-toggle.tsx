"use client";

import { MessageSquare, Users } from "lucide-react";
import { Button } from "../ui/button";
import { ChatVariant, useChatSidebar } from "@/hooks/stream/use-chat-sidebar";
import { Hint } from "../ui/hint";
import { translateCommunity, translateGoBackToChat } from "@/translate/translate-client";

interface VariantToggleProps{
  languageToUse: string;
}

export const VariantToggle = ({languageToUse}:VariantToggleProps) => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  //languages
  const communityMessage = translateCommunity(languageToUse)
  const gobacktoChatMessage = translateGoBackToChat(languageToUse)

  const label = isChat ? communityMessage : gobacktoChatMessage;

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 text-gray-300 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};

"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "../ui/button";
import { useChatSidebar } from "@/hooks/stream/use-chat-sidebar";
import { Hint } from "../ui/hint";
import { translateCollapse, translateExpand } from "@/translate/translate-client";

interface ChatToggleProps{
  languageToUse: string
}

export const ChatToggle = ({languageToUse}:ChatToggleProps) => {
  const { collapsed, onExpand, onCollapsed } = useChatSidebar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapsed();
    }
  };

  //languages
  const expandMessage = translateExpand(languageToUse)
  const collapseMessage = translateCollapse(languageToUse)

  const label = collapsed ? expandMessage : collapseMessage;

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4 text-gray-300" />
      </Button>
    </Hint>
  );
};

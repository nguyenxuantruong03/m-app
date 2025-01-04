"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "../ui/button";
import { useChatSidebar } from "@/hooks/stream/use-chat-sidebar";
import { Hint } from "../ui/hint";
import { useTranslations } from "next-intl";


export const ChatToggle = () => {
  const t = useTranslations()
  const { collapsed, onExpand, onCollapsed } = useChatSidebar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapsed();
    }
  };

  const label = collapsed ? t("action.expand") : t("action.collapse");

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

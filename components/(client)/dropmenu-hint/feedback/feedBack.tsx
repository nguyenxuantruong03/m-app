"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  BotMessageSquare,
  MessageSquareReply,
  ArrowRight,
} from "lucide-react";
import { Hint } from "@/components/ui/hint";
import { useTranslations } from "next-intl";

interface FeedBackProps {
  setIsAISheetOpen: Dispatch<SetStateAction<boolean>>;
  setIsFeedbackSheetOpen: Dispatch<SetStateAction<boolean>>;
  compareTime: boolean;
  loadingLanguage: boolean;
  loading: boolean;
}

export default function FeedBack({
  setIsAISheetOpen,
  setIsFeedbackSheetOpen,
  compareTime,
  loadingLanguage,
  loading,
}: FeedBackProps) {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="destructive" disabled={loading || loadingLanguage}>
            <Hint label={t("feedback.feedback")}>
              {isOpen ? <ArrowRight /> : <MessageSquare />}
            </Hint>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="left"
          className="flex item-center space-x-2 justify-center min-w-0"
        >
          <DropdownMenuItem onClick={() => setIsAISheetOpen(true)}>
            {/* Open AI Assistant Sheet */}
            <Hint label={t("feedback.aiAssistant")}>
              <BotMessageSquare />
            </Hint>
          </DropdownMenuItem>
          {compareTime && (
            <DropdownMenuItem onClick={() => setIsFeedbackSheetOpen(true)}>
              {/* Open Feedback Sheet */}
              <Hint label={t("feedback.rating")}>
                <MessageSquareReply />
              </Hint>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

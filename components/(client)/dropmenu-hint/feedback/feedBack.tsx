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
import {
  translateAIAssistant,
  translateFeedback,
  translateRating,
} from "@/translate/translate-client";

interface FeedBackProps {
  setIsAISheetOpen: Dispatch<SetStateAction<boolean>>;
  setIsFeedbackSheetOpen: Dispatch<SetStateAction<boolean>>;
  compareTime: boolean;
  loadingLanguage: boolean;
  loading: boolean;
  languageToUse: string;
}

export default function FeedBack({
  setIsAISheetOpen,
  setIsFeedbackSheetOpen,
  compareTime,
  loadingLanguage,
  loading,
  languageToUse,
}: FeedBackProps) {
  const [isOpen, setIsOpen] = useState(false);

  //language
  const feedbackMessage = translateFeedback(languageToUse);
  const aiAssistantMessage = translateAIAssistant(languageToUse);
  const ratingMessage = translateRating(languageToUse);

  return (
    <div>
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="destructive" disabled={loading || loadingLanguage} className="z-[99999999]">
            <Hint label={feedbackMessage}>
              {isOpen ? <ArrowRight /> : <MessageSquare />}
            </Hint>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="left"
          className="flex item-center space-x-2 justify-center min-w-0"
        >
          <DropdownMenuItem onClick={() => setIsAISheetOpen(true)} className="z-[99999999]">
            {/* Open AI Assistant Sheet */}
            <Hint label={aiAssistantMessage}>
              <BotMessageSquare />
            </Hint>
          </DropdownMenuItem>
          {compareTime && (
            <DropdownMenuItem onClick={() => setIsFeedbackSheetOpen(true)} className="z-[99999999]">
              {/* Open Feedback Sheet */}
              <Hint label={ratingMessage}>
                <MessageSquareReply />
              </Hint>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

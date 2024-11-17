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
  ArrowRight ,
} from "lucide-react";
import { Hint } from "@/components/ui/hint";

interface FeedBackProps{
  setIsAISheetOpen: Dispatch<SetStateAction<boolean>>
  setIsFeedbackSheetOpen: Dispatch<SetStateAction<boolean>>
  compareTime:boolean;
}

export default function FeedBack({setIsAISheetOpen,setIsFeedbackSheetOpen,compareTime} : FeedBackProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Hint label="Feedback">
            {isOpen ? <ArrowRight  /> : <MessageSquare />}
            </Hint>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="left"
          className="flex item-center space-x-2 justify-center min-w-0"
        >
          <DropdownMenuItem onClick={() => setIsAISheetOpen(true)}>
            {/* Open AI Assistant Sheet */}
            <Hint label="Trợ lý AI">
              <BotMessageSquare />
            </Hint>
          </DropdownMenuItem>
        {
          compareTime && (
          <DropdownMenuItem onClick={() => setIsFeedbackSheetOpen(true)}>
            {/* Open Feedback Sheet */}
            <Hint label="FeedBack">
              <MessageSquareReply />
            </Hint>
          </DropdownMenuItem>
          )
        }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

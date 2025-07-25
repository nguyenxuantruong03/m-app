"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { ChatInfo } from "./chat-info";
import ShoppingCardInLive from "./shopping-cart";
import { SendHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  timeDelay: number;
}

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
  timeDelay,
}: ChatFormProps) => {
  const t = useTranslations();
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isFollowersOnlyAndNoteFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNoteFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
      }, timeDelay);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <div className="w-full">
        <div className="flex items-center space-x-2 relative">
          <ShoppingCardInLive />
          <form onSubmit={handleSubmit}>
            <Input
              onChange={(e) => onChange(e.target.value)}
              value={value}
              disabled={isDisabled}
              placeholder={t("profile.send")}
              className={cn(
                "border-white/10 pr-10 dark:text-slate-200",
                (isFollowersOnly || isDelayed) && "rounded-b-none border-b-0"
              )}
            />
            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-200 bg-opacity-20"
              type="submit"
              variant="none"
              size="sm"
              disabled={isDisabled}
            >
              <SendHorizontal className="text-yellow-500 w-5 h-5" />
            </Button>
          </form>
        </div>
        <ChatInfo
          timeDelay={timeDelay}
          isDelayed={isDelayed}
          isFollowersOnly={isFollowersOnly}
        />
      </div>
    </div>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};

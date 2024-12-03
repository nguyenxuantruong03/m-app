import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "../ui/hint";
import { translateFollowersAndSlowMode, translateFollowersOnly, translateFollowersOnlyChat, translateMessageDelay, translateSlowMode } from "@/translate/translate-client";


interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
  timeDelay: number;
  languageToUse: string
}

export const ChatInfo = ({ isDelayed, isFollowersOnly,timeDelay,languageToUse }: ChatInfoProps) => {
  const delayInSeconds = timeDelay / 1000;

  //languages
  const followersOnlyChatMessage = translateFollowersOnlyChat(languageToUse)
  const chatDelayMessage = translateMessageDelay(languageToUse, delayInSeconds)
  const followerOnlyMessage = translateFollowersOnly(languageToUse)
  const slowModeMessage = translateSlowMode(languageToUse)
  const followerAndSlowModeMessage = translateFollowersAndSlowMode(languageToUse)

  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return followersOnlyChatMessage;
    }

    if (isDelayed && !isFollowersOnly) {
      return chatDelayMessage;
    }

    if (isDelayed && isFollowersOnly) {
      return `${followersOnlyChatMessage}. ${chatDelayMessage}`;
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return followerOnlyMessage;
    }

    if (isDelayed && !isFollowersOnly) {
      return slowModeMessage;
    }

    if (isDelayed && isFollowersOnly) {
      return followerAndSlowModeMessage;
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-b-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4 text-gray-300" />
      </Hint>
      <p className="text-xs font-semibold break-words">{label}</p>
    </div>
  );
};

import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "../ui/hint";
import { useTranslations } from "next-intl";


interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
  timeDelay: number;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly,timeDelay }: ChatInfoProps) => {
  const t = useTranslations()
  const delayInSeconds = timeDelay / 1000;

  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return t("profile.followersOnlyChat");
    }

    if (isDelayed && !isFollowersOnly) {
      return t("profile.chatDelay",{delayInSeconds: delayInSeconds});
    }

    if (isDelayed && isFollowersOnly) {
      return `${t("profile.followersOnlyChat")}. ${t("profile.chatDelay",{delayInSeconds: delayInSeconds})}`;
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return t("profile.followerOnly");
    }

    if (isDelayed && !isFollowersOnly) {
      return t("profile.slowMode");
    }

    if (isDelayed && isFollowersOnly) {
      return t("profile.followerAndSlowMode");
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

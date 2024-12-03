"use client";

import { translateAbout, translateFollower, translateFollowers, translateMystery } from "@/translate/translate-client";
import { VerifiedMark } from "../verified-mark";
import { BioModal } from "./bio-modal";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
  role: string;
  isCitizen: boolean;
  languageToUse: string;
}

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
  role,
  isCitizen,
  languageToUse
}: AboutCardProps) => {
  const hostAsView = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsView;

  //languages
  const followerMessage = translateFollower(languageToUse)
  const followersMessage = translateFollowers(languageToUse)
  const aboutMessage = translateAbout(languageToUse)
  const mysteryMessage = translateMystery(languageToUse)

  const followedByLabel = followedByCount === 1 ? followerMessage : followersMessage;
  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl dark:text-slate-200">
            {aboutMessage} {hostName}
            <VerifiedMark role={role} isCitizen={isCitizen}/>
          </div>
          {isHost && (<BioModal initialValue={bio} languageToUse={languageToUse}/>)}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>
          {followedByLabel}
        </div>
        <p className="w-full text-sm break-words max-w-xs md:max-w-7xl dark:text-slate-200">
          {bio || mysteryMessage}
        </p>
      </div>
    </div>
  );
};

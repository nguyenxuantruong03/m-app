"use client";

import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { VerifiedMark } from "../verified-mark";
import { UserIcon } from "lucide-react";
import { Actions, ActionSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";
import CircleAvatar, { UserAvatarSkeleton } from "../ui/circle-avatar";

interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  name: string;
  isCitizen: boolean;
  role: string;
  frameAvatar: string;
}

export const Header = ({
  imageUrl,
  hostName,
  hostIdentity,
  viewerIdentity,
  isFollowing,
  name,
  isCitizen,
  role,
  frameAvatar
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className={`flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-center justify-between px-4 ${isLive ? "ml-4" : "ml-9"}`}>
      <div className={`flex items-center gap-x-3 ${isLive && "ml-5"}`}>
        <CircleAvatar
            size="lg"
            nameuser={hostName}
            srcAvatar={imageUrl}
            srcFrame={frameAvatar}
            isLive={isLive}
            role={role}
            isCitizen={isCitizen}
            hideCitizenandBadge={true}
            notLink={true}
            isSizeLg={true}
          />
        <div className={`space-y-1 ml-6`}>
          <div className="flex items-center gap-x-1">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark isCitizen={isCitizen} role={role}/>
          </div>
          <p className="text-sm font-semibold break-words max-w-[14rem] md:max-w-lg 2xl:max-w-7xl">{name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>
      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <ActionSkeleton />
    </div>
  );
};

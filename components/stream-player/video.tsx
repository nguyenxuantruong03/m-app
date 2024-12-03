"use client";

import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { Skeleton } from "../ui/skeleton";
import { VerifiedMark } from "../verified-mark";
import { cn } from "@/lib/utils";
import "./video.css";
import Link from "next/link";
import CircleAvatar from "../ui/circle-avatar";
import {
  translateClickToSeeLive,
  translateFollower,
  translateFollowers,
} from "@/translate/translate-client";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
  name?: string;
  followedByCount?: number;
  imageUrl?: string;
  isLive?: boolean;
  isCitizen?: boolean;
  role?: string;
  showInfo?: boolean;
  showExtension?: boolean;
  frameAvatar: string;
  languageToUse: string;
}

export const Video = ({
  hostName,
  hostIdentity,
  name,
  followedByCount,
  imageUrl,
  isLive,
  isCitizen,
  role,
  showInfo = false,
  showExtension = true,
  frameAvatar,
  languageToUse,
}: VideoProps) => {
  //languages
  const followerMessage = translateFollower(languageToUse);
  const followersMessage = translateFollowers(languageToUse);
  const clickToSeeMessage = translateClickToSeeLive(languageToUse);

  const followedByLabel =
    followedByCount === 1 ? followerMessage : followersMessage;
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = (
      <OfflineVideo nameuser={hostName} languageToUse={languageToUse} />
    );
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = (
      <LiveVideo
        participant={participant}
        showExtension={showExtension}
        nameuser={hostName}
        languageToUse={languageToUse}
      />
    );
  }

  return (
    <div
      className={cn(
        "aspect-video border-b group relative",
        showInfo ? "shadow-md border border-gray-300" : ""
      )}
    >
      {content}

      {showInfo && (
        <Link href={`/live/${hostName}`} className="z-[9999]">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-sky-900 px-4 py-1 space-y-2 max-w-[300px] hidden md:block">
            <span className="bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] font-semibold tracking-wide ml-8">
              LIVE
            </span>
            <p className="text-white text-xl font-bold break-words ml-8">
              {name}
            </p>
            <div className="flex items-center gap-x-3">
              <CircleAvatar
                size="default"
                nameuser={hostName}
                srcAvatar={imageUrl}
                srcFrame={frameAvatar || ""}
                role={role}
                isCitizen={isCitizen || undefined}
                isLive={isLive}
                notLink={true}
                isVideoCustom={true}
                hideCitizenandBadge={true}
              />
              <div className="space-y-1 ml-5">
                <div className="flex items-center gap-x-2">
                  <h2 className="text-lg font-semibold text-white truncate max-w-[11rem]">
                    {hostName}
                  </h2>
                  <VerifiedMark isCitizen={isCitizen} role={role} />
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-white mr-1">
                    {followedByCount}
                  </span>
                  <span className="text-slate-900">{followedByLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-9 transform -translate-y-1/2 flex h-12 w-full items-center justify-center px-4">
            <div className="p-3 border border-[#dc2626] rounded-xl flex space-x-2">
              <div className="loading-wave">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
              </div>
              <span className="text-[#dc2626]">{clickToSeeMessage}</span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-slate-900">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};

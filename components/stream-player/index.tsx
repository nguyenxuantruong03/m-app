"use client";
import { LiveKitRoom } from "@livekit/components-react";

import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/hooks/stream/use-chat-sidebar";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";
import { ImageCredential } from "@prisma/client";

type CustomStream = {
  id: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  timeDelay: number;
  thumbnailUrl: string | null;
  name: string;
};

type CustomUser = {
  id: string;
  nameuser: string;
  bio: string | null;
  stream: CustomStream | null;
  isCitizen: boolean;
  role: string;
  imageUrl: string;
  _count: {
    followedBy: number;
  };
  imageCredential: ImageCredential[];
  frameAvatar: string;
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  const chatComponent = (
    <Chat
      viewerName={name}
      hostName={user.nameuser}
      hostIdentity={user.id}
      isFollowing={isFollowing}
      timeDelay={stream.timeDelay}
      isChatEnabled={stream.isChatEnabled}
      isChatDelayed={stream.isChatDelayed}
      isChatFollowersOnly={stream.isChatFollowersOnly}
    />
  );

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video
            hostName={user.nameuser}
            hostIdentity={user.id}
            isCitizen={user.isCitizen}
            role={user.role}
            frameAvatar={user.frameAvatar}
          />
          <div className="block lg:hidden">
            <div className={cn("col-span-1", collapsed && "hidden")}>
              {chatComponent}
            </div>
          </div>
          <Header
            hostName={user.nameuser}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageCredential[0].url || user.imageUrl || ""}
            isFollowing={isFollowing}
            name={stream.name}
            isCitizen={user.isCitizen}
            role={user.role}
            frameAvatar={user.frameAvatar}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={user.nameuser}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
            isCitizen={user.isCitizen}
            role={user.role}
          />
        </div>
        <div className="hidden lg:block">
          <div className={cn("col-span-1", collapsed && "hidden")}>
            {chatComponent}
          </div>
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  const chatSkeleton = <ChatSkeleton />;
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <div className="col-span-1 bg-background block lg:hidden">
          {chatSkeleton}
        </div>
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background hidden lg:block">
        {chatSkeleton}
      </div>
    </div>
  );
};

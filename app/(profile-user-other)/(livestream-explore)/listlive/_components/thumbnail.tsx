import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";
import CircleAvatar from "@/components/ui/circle-avatar";

interface ThumbnailProps {
  src: string | null;
  fallback: string;
  isLive: boolean;
  nameuser: string;
  srcFrame?: string;
  role?: string
  isCitizen?: boolean
}

export const Thumbnail = ({
  src,
  fallback,
  isLive,
  nameuser,
  srcFrame,
  role,
  isCitizen
}: ThumbnailProps) => {
  let content;

  if (!src && !fallback) {
    content = (
      <div className="bg-blue-700 flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
        <CircleAvatar
            size="lg"
            nameuser={nameuser}
            srcAvatar={fallback}
            srcFrame={srcFrame}
            isLive={isLive}
            role={role}
            isCitizen={isCitizen}
            hideCitizenandBadge={true}
          />
      </div>
    );
  }else if (!src) {
    content = (
      <div className="flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
        <Image
          src={fallback}
          fill
          alt="Thumbnail"
          className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
        />
      </div>
    );
    // If there is a thumbnail, we'll show it.
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
      />
    );
  }

  // If the stream is live, we'll show the live badge.
  return (
    <>
      {src && fallback ? (
        <>
          <div className="group aspect-video relative rounded-md cursor-pointer">
            {/* Blur background image */}
            {src && (
              <div className="absolute inset-0 rounded-md overflow-hidden">
                <Image
                  src={fallback}
                  alt="Blurred Background"
                  fill
                  className="object-cover filter blur"
                />
              </div>
            )}

            {/* Main content */}
            {content}

            {/* Live badge */}
            {isLive && src && (
              <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                <LiveBadge />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="group aspect-video relative rounded-md cursor-pointer">
            <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
            {content}
            {isLive && src && (
              <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                <LiveBadge />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

// This is the skeleton that will be shown while the thumbnail is loading.
export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

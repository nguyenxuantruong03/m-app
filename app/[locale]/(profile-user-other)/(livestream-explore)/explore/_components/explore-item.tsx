"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Radio, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SortItem from "./sort-item";
import ExploreCard from "./explore-card";
import FormPostExplore from "./form-post-explore";
import { Video } from "@/components/stream-player/video";
import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { ImageCredential, UserRole } from "@prisma/client";
import CircleAvatar from "@/components/ui/circle-avatar";
import { useSidebar } from "@/hooks/stream/use-sidebar";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type CustomUser = {
  id: string;
  name: string;
  nameuser: string;
  image: string;
  isCitizen: boolean;
  role: UserRole;
  frameAvatar: string;
  imageCredential: ImageCredential[];
  _count: {
    followedBy: number;
  };
};

interface StreamPlayerProps {
  user: CustomUser;
  id: string;
  name: string;
  isLive: boolean;
}

interface ExploreCardProps {
  streams: any;
  review: any;
}

const ExploreItem = ({ streams, review }: ExploreCardProps) => {
  const { hideAll } = useSidebar((state) => state);
  const user = useCurrentUser();
  const t = useTranslations()
  const [openPost, setOpenPost] = useState(false);
  const [sortedPostReview, setSortedPostReview] = useState<any[]>(review);
  const [sortCriteria, setSortCriteria] = useState<string>("newest"); // Default to newest
  const [isMounted, setIsMounted] = useState(false);
  const isLive = streams.some((stream: any) => stream?.isLive === true);

  //language
  const { token, name, identity } = useViewerToken(user?.id || "");

  useEffect(() => {
    // Sort posts when criteria changes
    const sortPosts = () => {
      let sortedArray = [...review]; // Make a copy of the original array

      switch (sortCriteria) {
        case "newest":
          sortedArray.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedArray.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "trending":
          sortedArray.sort((a, b) => {
            const totalEmojiA = Array.isArray(a.emoji)
              ? a.emoji
                  .map(
                    (item: any) =>
                      (item?.emojilengthLove || 0) +
                      (item?.emojilengthHaha || 0) +
                      (item?.emojilengthWow || 0) +
                      (item?.emojilengthAngry || 0) +
                      (item?.emojilengthLike || 0) +
                      (item?.emojilengthSad || 0)
                  )
                  .reduce((sum: number, current: number) => sum + current, 0)
              : 0;

            const totalEmojiB = Array.isArray(b.emoji)
              ? b.emoji
                  .map(
                    (item: any) =>
                      (item?.emojilengthLove || 0) +
                      (item?.emojilengthHaha || 0) +
                      (item?.emojilengthWow || 0) +
                      (item?.emojilengthAngry || 0) +
                      (item?.emojilengthLike || 0) +
                      (item?.emojilengthSad || 0)
                  )
                  .reduce((sum: number, current: number) => sum + current, 0)
              : 0;

            return totalEmojiB - totalEmojiA; // Sort by total emoji reactions
          });
          break;
        default:
          break;
      }

      setSortedPostReview(sortedArray);
    };

    sortPosts();
  }, [review, sortCriteria]);

  useEffect(() => {
    if (openPost) {
      document.body.style.overflow = "hidden"; // Ngăn chặn cuộn
    } else {
      document.body.style.overflow = "auto"; // Khôi phục cuộn
    }

    // Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openPost]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "md:max-w-7xl mx-auto py-5 px-2",
        hideAll ? "max-w-sm" : "max-w-xs"
      )}
    >
      {openPost && (
        <>
          <div onClick={() => setOpenPost(false)} className="fixed inset-0 bg-black/80 h-full w-full z-[99999998] flex items-center justify-center">
            <div className="h-[400px] md:h-[500px] overflow-y-auto w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-[99999999]">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground break-all line-clamp-2 text-white">
                  {t("profile.cretaePost")}
                </span>
                <span
                  onClick={() => setOpenPost(false)}
                  className="cursor-pointer rounded-sm hover:rounded-full hover:bg-gray-500 hover:bg-opacity-50 p-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none "
                >
                  <X className="h-5 w-5 text-slate-200" />
                </span>
              </div>
              <FormPostExplore
                setOpen={setOpenPost}
                reviews={review}
                userId={user?.id}
              />
            </div>
          </div>
        </>
      )}

      <div className="max-w-3xl mx-auto mt-5 pb-5 space-y-5">
        {user?.id && (
          <div className="bg-slate-900 rounded-md text-slate-200 p-2 md:p-4 mt-5 lg:mt-0 ">
            <div
              className={`flex items-center space-x-2 ${
                user?.isLive ? "ml-9" : ""
              }`}
            >
              {user?.isLive ? (
                <Link href={`/live/${user.nameuser}`}>
                  <CircleAvatar
                    nameuser={user.nameuser || ""}
                    srcAvatar={
                      (user.imageCredential && user.imageCredential.length > 0
                        ? user.imageCredential
                        : user.image) || ""
                    }
                    isLive={user.isLive}
                    srcFrame={user.frameAvatar || ""}
                    role={user.role}
                    isCitizen={user.isCitizen || undefined}
                    isCustomItemCard={true}
                  />
                </Link>
              ) : (
                <Link href={`/me/${user.nameuser}`}>
                  <CircleAvatar
                    nameuser={user.nameuser || ""}
                    srcAvatar={
                      (user.imageCredential && user.imageCredential.length > 0
                        ? user.imageCredential
                        : user.image) || ""
                    }
                    isLive={user.isLive}
                    srcFrame={user.frameAvatar || ""}
                    role={user.role}
                    isCitizen={user.isCitizen || undefined}
                    isCustomItemCard={true}
                  />
                </Link>
              )}
              <div
                className="w-3/5 bg-gray-300 rounded-full text-slate-900 hover:bg-white hover:bg-opacity-70 p-2 md:p-3 cursor-pointer"
                onClick={() => setOpenPost(true)}
              >
                {t("profile.whatAreYouThinking")}
              </div>
            </div>
            <Separator className="my-4 bg-gray-300 bg-opacity-30" />
            <Link
              href="listlive"
              className="flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-30 text-gray-300 text-lg rounded-md p-1 relative"
            >
              <div className="relative">
                <Radio className="h-7 w-7 mr-1 text-red-500" />
                {isLive && (
                  <>
                    {/* Ping animation element positioned at the top right */}
                    <span className="animate-ping absolute top-0 right-0 inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75" />
                    {/* Static colored circle positioned at the top right */}
                    <span className="absolute top-0 right-0.5 inline-flex rounded-full h-2 w-2 bg-yellow-500" />
                  </>
                )}
              </div>
              {t("profile.liveVideo")}
            </Link>
          </div>
        )}

        {streams.map((stream: StreamPlayerProps) => {
          return (
            <>
              {stream.isLive && (
                <div key={stream.id} className="my-4">
                  <LiveKitRoom
                    token={token}
                    serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                    className="h-full"
                  >
                    <Video
                      hostName={stream.user.nameuser || ""}
                      hostIdentity={stream.user.id}
                      name={stream.name}
                      followedByCount={stream.user._count.followedBy}
                      imageUrl={
                        stream.user.imageCredential[0]?.url ||
                        stream.user.image ||
                        ""
                      }
                      frameAvatar={stream.user.frameAvatar}
                      isLive={stream.isLive}
                      isCitizen={stream.user.isCitizen}
                      role={stream.user.role}
                      showInfo={true}
                      showExtension={false}
                    />
                  </LiveKitRoom>
                </div>
              )}
            </>
          );
        })}

        <div className="space-y-5">
          <ExploreCard review={sortedPostReview} user={user} />
        </div>

        {streams.length <= 0 && sortedPostReview.length <= 0 && (
          <div className="text-center text-gray-400 font-semibold text-xl ">
            {t("profile.noPost")}
          </div>
        )}
      </div>

      <SortItem
        setSortCriteria={setSortCriteria}
      />
    </div>
  );
};

export default ExploreItem;
"use client";
import { Radio, X } from "lucide-react";
import { useState, useEffect } from "react";
import FormPost from "./form-post";
import PostCard from "./post-card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import CircleAvatar from "@/components/ui/circle-avatar";
import SortItem from "@/app/[locale]/(profile-user-other)/(livestream-explore)/explore/_components/sort-item";
import { useTranslations } from "next-intl";

interface ArticleUserProps {
  self: any;
  showFunction?: boolean;
  user: any;
  avatarImage: string;
  streams?: any;
  languageToUse: string
}

const ArticleUser = ({
  self,
  showFunction = true,
  user,
  avatarImage,
  streams,
  languageToUse
}: ArticleUserProps) => {
  const t = useTranslations()
  const [openPost, setOpenPost] = useState(false);
  const [sortedPostReview, setSortedPostReview] = useState<any[]>(self.review);
  const [sortCriteria, setSortCriteria] = useState<string>("newest"); // Default to newest
  const isLive = streams?.some((stream: any) => stream?.isLive === true);

  useEffect(() => {
    // Sort posts when criteria changes
    const sortPosts = () => {
      let sortedArray = [...self.review]; // Make a copy of the original array

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
  }, [self.review, sortCriteria]);

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

  return (
    <>
      {showFunction && (
        <>
          {openPost && (
            <>
              <div className="fixed inset-0 bg-black/80 h-full w-full z-[999998] flex items-center justify-center">
                <div className="h-[400px] md:h-[500px] overflow-y-auto w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-[999999]">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground break-all line-clamp-2 text-white">
                      {t("profile.createPost")}
                    </span>
                    <span
                      onClick={() => setOpenPost(false)}
                      className="cursor-pointer rounded-sm hover:rounded-full hover:bg-gray-500 hover:bg-opacity-50 p-3 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none "
                    >
                      <X className="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <FormPost
                    setOpen={setOpenPost}
                    self={self}
                    userId={user?.id}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}

      <div className="space-y-5">
        {self.id === user?.id && showFunction && (
          <div className="bg-slate-900 rounded-md text-white p-3 mt-5 lg:mt-0 ">
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
                <Link href={`/user/${user.nameuser}`}>
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
                className="w-full bg-gray-300 rounded-full text-slate-900 hover:bg-white hover:bg-opacity-70 p-3 cursor-pointer"
                onClick={() => setOpenPost(true)}
              >
                {t("profile.whatAreYouThinking")}
              </div>
            </div>
            <Separator className="my-4 bg-gray-300 bg-opacity-30" />
            <div className="flex items-center justify-center">
              <Link
                href="listlive"
                className="flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-30 text-gray-300 text-lg rounded-md p-1 relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
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
                {t("profile.liveStream")}
              </Link>

              <SortItem
                setSortCriteria={setSortCriteria}
              />
            </div>
          </div>
        )}

        <PostCard
          postFilter={sortedPostReview}
          self={self}
          avatarImage={avatarImage}
          user={user}
          showFunction={showFunction}
          languageToUse={languageToUse}
        />
      </div>
    </>
  );
};

export default ArticleUser;

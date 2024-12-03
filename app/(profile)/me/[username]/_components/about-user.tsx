"use client";

import ImageCellOne from "@/components/image-cell-one";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, MinusCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/stream/follow";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { onBlock } from "@/actions/stream/block";
import {
  getToastError,
  translateBlock,
  translateBlockedUser,
  translateFollow,
  translateFollower,
  translateFollowers,
  translateNowFollowing,
  translateUnfollow,
  translateUnfollowedUser,
} from "@/translate/translate-client";

interface AboutUserProps {
  self: any;
  isFollowing: boolean;
  user: any;
  avatarImage: string;
  languageToUse: string;
}

export const AboutUser = ({
  self,
  isFollowing,
  user,
  avatarImage,
  languageToUse,
}: AboutUserProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!user) {
    throw new Error("Not found user!");
  }
  const toastErrorMessage = getToastError(languageToUse);
  const blockUserMessage = translateBlockedUser(languageToUse, self.name);
  const blockMessage = translateBlock(languageToUse);
  const followerMessage = translateFollower(languageToUse);
  const followersMessage = translateFollowers(languageToUse);
  const unFollowMessage = translateUnfollow(languageToUse);
  const followMessage = translateFollow(languageToUse);

  const followedByLabel =
    self._count.followedBy === 1 ? followerMessage : followersMessage;

  const handleBlock = () => {
    startTransition(() => {
      onBlock(self.id)
        .then(() => toast.success(blockUserMessage))
        .catch(() => toast.error(toastErrorMessage));
    });
  };

  const handleFollow = () => {
    startTransition(() => {
      onFollow(self.id,languageToUse)
        .then((data) =>
          toast.success(
            translateNowFollowing(languageToUse, data.following.nameuser)
          )
        )
        .catch(() => toast.error(toastErrorMessage));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(self.id,languageToUse)
        .then((data) =>
          toast.success(
            translateUnfollowedUser(languageToUse, data.following.nameuser)
          )
        )
        .catch(() => toast.error(toastErrorMessage));
    });
  };

  const toggleFollow = () => {
    if (!user) {
      return router.push("/sign-in");
    }

    if (self.id === user?.id) return;

    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col xl:flex-row items-center xl:justify-between">
      <div className="flex flex-col xl:flex-row items-center xl:space-x-5 justify-center">
        {avatarImage ? (
          <ImageCellOne
            user={user}
            self={self}
            imageUrl={avatarImage}
            widthImage={120}
            heightImage={120}
            showUpload={true}
            classNames="border-2 border-slate-300"
            languageToUse={languageToUse}
          />
        ) : (
          <Image
            src="/avatar/avatar-default.jpg"
            width={120}
            height={120}
            alt="404"
            className="rounded-full"
          />
        )}
        <div className="text-center xl:text-left">
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-200">
            {self.name}
          </p>
          <p className="text-sm text-muted-foreground space-x-1">
            <span className="font-semibold text-primary text-gray-600 dark:text-slate-400">
              {self._count.followedBy}
            </span>
            <span className="text-gray-600 dark:text-slate-400">
              {followedByLabel}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3 justify-center mt-4 xl:mt-0">
        {self.id !== user?.id && (
          <>
            <Button
              disabled={isPending || self.id === user?.id}
              onClick={toggleFollow}
              variant="primary"
              size="sm"
              className="w-full lg:w-auto text-white"
            >
              <Heart
                className={cn(
                  "h-4 w-4 mr-2",
                  isFollowing ? "fill-red-500 text-red-500" : "fill-none"
                )}
              />
              {isFollowing ? unFollowMessage : followMessage}
            </Button>

            <Button
              variant="secondary"
              disabled={isPending}
              onClick={handleBlock}
              className="w-full lg:w-auto"
            >
              <MinusCircle className="w-4 h-4 text-muted-foreground mr-2" />{" "}
              {blockMessage}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

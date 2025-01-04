"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { notFound, useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/stream/follow";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { Skeleton } from "../ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTranslations } from "next-intl";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
  languageToUse: string
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
  languageToUse
}: ActionsProps) => {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const userId = useCurrentUser();

  if(!userId){
    notFound()
  }

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity,languageToUse)
        .then((data) =>
          toast.success(`${t("profile.followings")} ${data.following.nameuser}`)
        )
        .catch(() => toast.error(t("toastError.somethingWentWrong")));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity,languageToUse)
        .then((data) =>
          toast.success(`${t("profile.unFollowed")} ${data.following.nameuser}`)
        )
        .catch(() => toast.error(t("toastError.somethingWentWrong")));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <>
      {hostIdentity !== userId.id && (
        <Button
          disabled={isPending || isHost}
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
          {isFollowing ? t("profile.unFollow") : t("profile.follow")}
        </Button>
      )}
    </>
  );
};

export const ActionSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};

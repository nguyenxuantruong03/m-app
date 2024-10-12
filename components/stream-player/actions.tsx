"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/stream/follow";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { Skeleton } from "../ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const userId = useCurrentUser();

  if(!userId){
    throw new Error("Not found user!")
  }

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.nameuser}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.nameuser}`)
        )
        .catch(() => toast.error("Something went wrong"));
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
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </>
  );
};

export const ActionSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};

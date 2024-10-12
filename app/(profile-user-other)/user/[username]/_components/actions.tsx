"use client";

import { onBlock } from "@/actions/stream/block";
import { onFollow, onUnfollow } from "@/actions/stream/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "react-hot-toast";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.nameuser}`)
        )
        .catch(() => toast.error("Something went wrong! "));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.nameuser}`)
        )
        .catch(() => toast.error("Something went wrong! "));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => {
          if (data) {
            toast.success(`Blocked the user ${data.blocked.nameuser}`);
          } else {
            toast.error("Something went wrong! ");
          }
        })
        .catch(() => toast.error("Something went wrong! "));
    });
  };

  return (
    <>
      <Button onClick={onClick} disabled={isPending} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlock}>Block</Button>
    </>
  );
};

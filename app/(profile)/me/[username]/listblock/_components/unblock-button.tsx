"use client";

import { onUnBlock } from "@/actions/stream/block";
import { Button } from "@/components/ui/button";
import {
  getToastError,
  translateUnblock,
  translateUserUnblocked,
} from "@/translate/translate-client";
import { useTransition } from "react";
import { toast } from "react-hot-toast";

interface UnblockButtonProps {
  userId: string;
  languageToUse: string;
}

export const UnblockButton = ({
  userId,
  languageToUse,
}: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  //language
  const toastErrorMessage = getToastError(languageToUse);
  const unBlockMessage = translateUnblock(languageToUse);

  const onClick = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((result) =>
          toast.success(
            translateUserUnblocked(languageToUse, result.blocked.nameuser)
          )
        )
        .catch(() => toast.error(toastErrorMessage));
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      {unBlockMessage}
    </Button>
  );
};

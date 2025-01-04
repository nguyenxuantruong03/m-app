"use client";

import { onUnBlock } from "@/actions/stream/block";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "react-hot-toast";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({
  userId,
}: UnblockButtonProps) => {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((result) =>
          toast.success(
            t("profile.userUnblocked", {username: result.blocked.nameuser})
          )
        )
        .catch(() => toast.error(t("toastError.somethingWentWrong")));
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
      {t("profile.unBlock")}
    </Button>
  );
};

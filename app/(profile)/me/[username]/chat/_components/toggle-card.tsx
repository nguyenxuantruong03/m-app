"use client";
import { toast } from "react-hot-toast";
import { useTransition } from "react";

import { updateStream } from "@/actions/stream/stream";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getToastError,
  translateChatSettingUpdated,
} from "@/translate/translate-client";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
  languageToUse: string;
}

export const ToggleCard = ({
  field,
  label,
  value = false,
  languageToUse,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  //language
  const toastErrorMessage = getToastError(languageToUse);
  const chatSettingUpdatedMessage = translateChatSettingUpdated(languageToUse);

  const onChange = async () => {
    startTransition(() => {
      updateStream({ [field]: !value },languageToUse)
        .then(() => toast.success(chatSettingUpdatedMessage))
        .catch(() => toast.error(toastErrorMessage));
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            onCheckedChange={onChange}
            checked={value}
            disabled={isPending}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};

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
import FormDelay from "./form-delay";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
  languageToUse: string;
  timeDelay?: number;
}

export const ToggleCard = ({
  field,
  label,
  value = false,
  timeDelay,
  languageToUse,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  //language
  const toastErrorMessage = getToastError(languageToUse);
  const chatSettingUpdatedMessage = translateChatSettingUpdated(languageToUse);

  const onChange = async () => {
    startTransition(() => {
      updateStream({ [field]: !value }, languageToUse)
        .then(() => toast.success(chatSettingUpdatedMessage))
        .catch(() => toast.error(toastErrorMessage));
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0 text-slate-900 dark:text-slate-200">
          {label}
        </p>
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
      {field === "isChatDelayed" && (
        <FormDelay data={timeDelay || 3} languageToUse={languageToUse} />
      )}
    </div>
  );
};

interface ToggleCardSkeletonProps {
  isChatDelay?: boolean;
}

export const ToggleCardSkeleton = ({
  isChatDelay = false,
}: ToggleCardSkeletonProps) => {
  return (
    <>
      {isChatDelay ? (
        <div className="rounded-xl bg-gray-300 bg-opacity-70 dark:bg-opacity-10 p-6 space-y-2">
          <div className="flex items-center justify-between gap-x-3 lg:gap-x-10 w-full">
            <Skeleton className="w-[200px] h-[30px]" />
            <Skeleton className="w-[20px] h-[20px]" />
          </div>
          <Skeleton className="w-[100px] h-[20px]" />
        </div>
      ) : (
        <div className="rounded-xl bg-gray-300 bg-opacity-70 dark:bg-opacity-10 p-6">
          <div className="flex items-center justify-between gap-x-3 lg:gap-x-10 w-full">
            <Skeleton className="w-[200px] h-[30px]" />
            <Skeleton className="w-[20px] h-[20px]" />
          </div>
        </div>
      )}
    </>
  );
};

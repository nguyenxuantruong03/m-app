"use client";
import { toast } from "react-hot-toast";
import { useTransition } from "react";

import { updateStream } from "@/actions/stream/stream";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import FormDelay from "./form-delay";
import { useTranslations } from "next-intl";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
  timeDelay?: number;
  languageToUse: string
}

export const ToggleCard = ({
  field,
  label,
  value = false,
  timeDelay,
  languageToUse
}: ToggleCardProps) => {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition();

  const onChange = async () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success(t("profile.chatSettingUpdated")))
        .catch(() => toast.error(t("toastError.somethingWentWrong")));
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
        <FormDelay data={timeDelay || 3} />
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

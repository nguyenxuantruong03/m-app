"use client";
import { useTransition } from "react";

import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { updateInfoDetail } from "@/actions/client/info-detail";
import toast from "react-hot-toast";
import { Hint } from "@/components/ui/hint";
import { useTranslations } from "next-intl";

type FieldTypes =
  | "isEmail"
  | "isGender"
  | "isPhone"
  | "isDateofBirth"
  | "isAddress"
  | "isAdressOther"
  | "isFavorite"
  | "isSocial"
  | "isCreatedAt";

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
  data: boolean;
}

export const ToggleCard = ({
  field,
  label,
  value = false,
  data,
}: ToggleCardProps) => {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition();

  const onChange = async () => {
    startTransition(() => {
      updateInfoDetail({ [field]: !value })
        .then(() => toast.success(t("profile.settingUpdated")))
        .catch(() => toast.error(t("toastError.somethingWentWrong")));
    });
  };
  return (
    <div className="rounded-xl p-6 bg-slate-900 bg-opacity-30">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          {!data ? (
            <>
              <Hint label={t("profile.fillInfoBeforePublic")}>
                <Switch
                  onCheckedChange={onChange}
                  checked={value}
                  disabled={isPending || data === false}
                >
                  {value ? "On" : "Off"}
                </Switch>
              </Hint>
            </>
          ) : (
            <Switch
              onCheckedChange={onChange}
              checked={value}
              disabled={isPending}
            >
              {value ? "On" : "Off"}
            </Switch>
          )}
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};

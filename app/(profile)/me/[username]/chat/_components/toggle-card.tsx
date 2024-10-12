"use client";
import {toast} from "react-hot-toast"
import { useTransition } from "react";

import { updateStream } from "@/actions/stream/stream";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";


type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
}

export const ToggleCard = ({
  field,
  label,
  value = false,
}: ToggleCardProps) => {

  const [isPending, startTransition] = useTransition()

  const onChange = async () =>{
    startTransition(() =>{
      updateStream({[field] : !value})
      .then(() => toast.success("Chat setting updated!"))
      .catch(() => toast.error("Something went wrong!"))
    })
  }
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch onCheckedChange={onChange} checked={value} disabled={isPending}>
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () =>{
  return (
    <Skeleton className="rounded-xl p-10 w-full"/>
  )
}
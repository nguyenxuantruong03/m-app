"use client"
import Link from "next/link";
import { Thumbnail, ThumbnailSkeleton } from "./thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageCredential } from "@/types/type";
import CircleAvatar, { UserAvatarSkeleton } from "@/components/ui/circle-avatar";
import {useState,useEffect} from "react"

interface ResultCardProps {
  data: {
    id: string;
    user: {
      id: string;
      nameuser: string | null;
      isCitizen: boolean | null;
      role: string;
      image: string | null;
      frameAvatar: string | null;
      imageCredential?: ImageCredential[]; // Optional since it might be undefined
    };
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Link href={`/live/${data.user.nameuser}`}>
      <div className="h-full w-full space-y-2">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={
            data.user.image ||
            (data.user.imageCredential && data.user.imageCredential.length > 0
              ? data.user.imageCredential[0]?.url
              : "") // Check if imageCredential is defined and has items
          }
          isLive={data.isLive}
          nameuser={data.user.nameuser || ""}
          srcFrame={data.user.frameAvatar || ""}
          role={data.user.role}
          isCitizen={data.user.isCitizen || undefined}
        />
        <div className={`flex gap-x-3 items-center ${data.isLive ? "ml-4" : ""}`}>
          <CircleAvatar
            nameuser={data.user.nameuser || ""}
            srcAvatar={
              (data.user.imageCredential && data.user.imageCredential.length > 0
                ? data.user.imageCredential[0]?.url
                : data.user.image) || ""
            }
            isLive={data.isLive}
            srcFrame={data.user.frameAvatar || ""}
            role={data.user.role}
            isCitizen={data.user.isCitizen || undefined}
            isResultCustom={true}
          />
          <div className={`flex flex-col text-sm ${data.isLive ? "ml-5" : ""}`}>
            <p className="trancate max-w-[12rem] overflow-hidden text-ellipsis whitespace-nowrap font-semibold hover:text-blue-500">
              {data.name}
            </p>
            <p className="trancate max-w-[12rem] overflow-hidden text-ellipsis whitespace-nowrap">{data.user.nameuser}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-2">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};

"use client";

import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { InfoModal } from "./info-modal";
import { translateEditStreamInfo, translateMaximizeVisibility, translateName, translateThumbnail } from "@/translate/translate-client";

interface InfoCardProps {
  name: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
  languageToUse: string;
}

export const InfoCard = ({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
  languageToUse
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  //language
  const editStreamInfoMessage = translateEditStreamInfo(languageToUse)
  const maximizeVisibilityMessage = translateMaximizeVisibility(languageToUse)
  const nameMessage = translateName(languageToUse)
  const thumbnailMessage = translateThumbnail(languageToUse)

  if (!isHost) return null;
  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize dark:text-slate-200">
              {editStreamInfoMessage}
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              {maximizeVisibilityMessage}
            </p>
          </div>
          <InfoModal 
          initialName={name}
          initialThumbnailUrl={thumbnailUrl}
          languageToUse={languageToUse}
          />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">{nameMessage}</h3>
            <p className="text-sm font-semibold dark:text-slate-200">{name}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">{thumbnailMessage}</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image fill src={thumbnailUrl} alt={name} className="object-cover"/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

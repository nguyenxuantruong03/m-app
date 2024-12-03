"use client";

import { toast } from "react-hot-toast";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";

import { onBlock } from "@/actions/stream/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "../ui/button";
import { Hint } from "../ui/hint";
import { getToastError, translateBlock, translateBlockedBy } from "@/translate/translate-client";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
  languageToUse: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
  languageToUse
}: CommunityItemProps) => {
  const [isPending,startTransition] = useTransition()

    const color = stringToColor(participantName || "")
    const isSelf = participantName === viewerName;
    const isHost = viewerName == hostName

    //language
    const toastErrorMessage = getToastError(languageToUse)
    const blockedByMessage = translateBlockedBy(languageToUse)
    const blockMessage = translateBlock(languageToUse)

    const handleBlock = () =>{
      if(!participantName || isSelf || !isHost) return

      startTransition(() =>{
        onBlock(participantIdentity)
        .then(() => toast.success(`${blockedByMessage} ${participantName}`))
        .catch(() => toast.error(toastErrorMessage))
      })
    }

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{color: color}}>
        {participantName}
      </p>
      {isHost && !isSelf && (
        <Hint label={blockMessage}>
          <Button 
          variant="ghost"
          disabled={isPending}
          onClick={handleBlock}
          className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="w-4 h-4 text-gray-300"/>
          </Button>
        </Hint>
      )}
    </div>
  );
};

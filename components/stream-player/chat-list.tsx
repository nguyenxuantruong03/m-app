import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "../ui/skeleton";
import { useTranslations } from "next-intl";

interface ChatListProps{
    messages: ReceivedChatMessage[];
    isHidden: boolean
}

export const ChatList = ({messages,isHidden} : ChatListProps) =>{
    const t = useTranslations()

    if(isHidden || !messages || messages.length === 0){
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? t("profile.chatDisabled") : t("profile.welcomeToChat")}
                </p>
            </div>
        )
    }
    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3">
            {
                messages.map((message)=>(
                    <ChatMessage 
                    key={message.timestamp}
                    data={message}
                    />
                ))
            }
        </div>
    )
}

export const ChatListSkeleton = () =>{
    return (
        <div className="flex h-full items-center justify-center">
            <Skeleton className="w-1/2 h-6"/>
        </div>
    )
}
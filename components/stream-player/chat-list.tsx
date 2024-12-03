import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "../ui/skeleton";
import { translateChatDisabled, translateWelcomeToChat } from "@/translate/translate-client";

interface ChatListProps{
    messages: ReceivedChatMessage[];
    isHidden: boolean
    languageToUse: string;
}

export const ChatList = ({messages,isHidden,languageToUse} : ChatListProps) =>{

    //languages
    const chatDisabledMessage = translateChatDisabled(languageToUse)
    const welcomeToChatMessage = translateWelcomeToChat(languageToUse)

    if(isHidden || !messages || messages.length === 0){
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? chatDisabledMessage : welcomeToChatMessage}
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
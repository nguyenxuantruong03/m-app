"use client"

import {format} from "date-fns"
import { stringToColor } from "@/lib/utils"
import { ReceivedChatMessage } from "@livekit/components-react"

interface ChatMessageProps{
    data: ReceivedChatMessage
}

export const ChatMessage = ({data}:ChatMessageProps) =>{
    const color = stringToColor(data.from?.name || "")

    return (
        <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
            <p className="text-sm text-white/40">
                {format(data.timestamp,"HH:mm")}
            </p>
            <div className="flex flex-wrap items-baseline gap-1 grow">
                <p className="text-sm font-semibold whitespace-nowrap"> 
                    <span className="truncate" style={{color: color}}> 
                        {data.from?.name}
                    </span>
                </p>
                <p className="text-sm break-all text-slate-200">
                    {data.message}
                </p>
            </div>
        </div>
    )
}
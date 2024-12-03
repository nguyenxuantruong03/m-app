"use client"

import { Maximize,Minimize } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import { translateExitFullscreen, translateFullscreen } from "@/translate/translate-client";

interface FullscreenControlProps{
    isFullscreen: boolean;
    onToggle: () => void
    languageToUse: string;
}

export const FullscreenControl = ({isFullscreen,onToggle,languageToUse}:FullscreenControlProps) =>{
    //languages
    const exitFullScreenMessage = translateExitFullscreen(languageToUse)
    const fullScreenMessage = translateFullscreen(languageToUse)

    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? exitFullScreenMessage : fullScreenMessage

    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button
                onClick={onToggle}
                className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                >
                    <Icon className="h-5 w-5"/>
                </button>
            </Hint>
        </div>
    )
}
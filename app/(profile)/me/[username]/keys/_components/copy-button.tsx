"use client"

import { Button } from "@/components/ui/button"
import { CheckCheck, Copy } from "lucide-react"
import { useState } from "react"

interface CopyClientProps{
    value?: string
}

export const CopyButton = ({value}:CopyClientProps) =>{
    const [isCopied, setIsCopied] = useState(false)

    const onCopy = () =>{
        if(!value) return;

        setIsCopied(true)
        navigator.clipboard.writeText(value)
        setTimeout(()=>{
            setIsCopied(false)
        },1000)
    }

    const Icon = isCopied ?  CheckCheck : Copy

    return (
        <Button
        onClick={onCopy}
        disabled={!value || isCopied}
        variant="ghost"
        size="sm"
        className="text-slate-900 dark:text-slate-200"
        >
            <Icon className="h-4 w-4"/>
        </Button>
    )
}
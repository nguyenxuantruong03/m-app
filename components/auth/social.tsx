"use client";

import { Github } from 'lucide-react';
import {useSearchParams} from "next/navigation"

import {Button} from "@/components/ui/button"
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";

const Social = () => {
    const searchParam= useSearchParams()
    const callbackUrl = searchParam.get('callbackUrl')

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    };
    
    return ( 
        <div className="flex item-center w-full gap-x-2">
            <Button size="lg" variant="outline" className="w-full" onClick={()=>{onClick("google")}}>
                <Image src="/images-icon/google.png" alt="404" width="50" height="50" className='h-5 w-5'/>
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={()=>{onClick("github")}}>
            <Github className="h-5 w-5"/>
            </Button>
        </div>
     );
}
 
export default Social;
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

    const onClick = (provider: "google" | "github" | "facebook" | "gitlab" | "tiktok" | "microsoft") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    };
    
    return ( 
        <div className="grid grid-rows-2 w-full">
            <div className="flex items-center space-x-1">
                <Button size="lg" variant="outline" className="w-full" onClick={()=>{onClick("google")}}>
                <Image src="/images-icon/google.png" alt="404" width="50" height="50" className='h-5 w-5'/>
                </Button>
                <Button size="lg" variant="outline" className="w-full" onClick={()=>{onClick("github")}}>
                <Github className="h-5 w-5"/>
                </Button>
                <Button size="lg" variant="outline" className="w-full" onClick={()=>{onClick("facebook")}}>
                <Image src="/images-icon/facebook-icon.png.png" alt="404" width="50" height="50" className='h-9 w-9'/>
                </Button>
            </div>

            <div className="flex items-center space-x-1 space-y-1">
                <Button size="lg" variant="outline" className="w-full" onClick={()=>{onClick("gitlab")}}>
                <Image src="/images-icon/gitlab.png" alt="404" width="50" height="50" className='h-5 w-5'/>
                </Button>
                <Button size="lg" variant="outline" className="w-full" onClick={()=>{onClick("tiktok")}}>
                1
                {/* <Image src="/images-icon/LinkedIn.svg.png" alt="404" width="50" height="50" className='h-5 w-5'/>
                
                 */}
                </Button>
                {/* <Button size="lg" variant="outline" className="w-full" onClick={()=>{onClick("microsoft")}}>
                <Image src="/images-icon/Microsoft.svg.png" alt="404" width="50" height="50" className='h-5 w-5'/>
                </Button> */}
            </div>
    </div>
     );
}
 
export default Social;
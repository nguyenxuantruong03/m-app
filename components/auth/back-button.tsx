"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface  BackButtonProps{
    href:string;
    label: string;
}

const BackButton:React.FC<BackButtonProps> = ({href,label}) => {
    return ( 
        <Button variant="link" className="font-nomal w-full" size="sm" asChild>
            <Link href={href}>
            {label}
            </Link>
        </Button>
     );
}
 
export default BackButton;
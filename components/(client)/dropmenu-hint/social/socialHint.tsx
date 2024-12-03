"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquareWarning, ArrowDown } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import Link from "next/link";
import InstagramSVG from "@/public/svg/instagram";
import YoutubeSVG from "@/public/svg/youtube";
import FaceBookSVG from "@/public/svg/facebook";
import MessangerSVG from "@/public/svg/messanger";
import TiktokSVG from "@/public/svg/tiktok";
import ZaloSVG from "@/public/svg/zalo";
import { translateSocial } from "@/translate/translate-client";

interface SocialHintProps {
  loadingLanguage: boolean;
  loading: boolean;
  languageToUse: string;
}

export default function SocialHint({
  loadingLanguage,
  loading,
  languageToUse,
}: SocialHintProps) {
  const [isOpen, setIsOpen] = useState(false);

  //language
  const socialMessage = translateSocial(languageToUse);

  return (
    <div>
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="destructive" disabled={loading || loadingLanguage} className="z-[99999999]">
            <Hint label={socialMessage}>
              {isOpen ? <ArrowDown /> : <MessageSquareWarning />}
            </Hint>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          className="flex flex-col items-center space-y-2 justify-center min-w-0"
        >
          <DropdownMenuItem>
            <Link href="https://www.youtube.com/@nguyenxuantruong03">
              {/* Open AI Assistant Sheet */}
              <Hint label="Youtube">
                <YoutubeSVG />
              </Hint>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="https://www.facebook.com/nxtnguyenxuantruong">
              {/* Open AI Assistant Sheet */}
              <Hint label="Facebook">
                <FaceBookSVG />
              </Hint>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="https://zalo.me/0352261103">
              {/* Open SocialHint Sheet */}
              <Hint label="Zalo">
                <ZaloSVG />
              </Hint>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="https://www.facebook.com/nxtnguyenxuantruong">
              {/* Open SocialHint Sheet */}
              <Hint label="Messenger">
                <MessangerSVG />
              </Hint>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="https://www.instagram.com/ngxuanttruong">
              {/* Open SocialHint Sheet */}
              <Hint label="Instagram">
                <InstagramSVG />
              </Hint>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="https://www.tiktok.com/@ngxuantruong03">
              {/* Open SocialHint Sheet */}
              <Hint label="Tiktok">
                <TiktokSVG />
              </Hint>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

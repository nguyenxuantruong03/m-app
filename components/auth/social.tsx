"use client";

import { Github } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import GoogleSVG from "@/public/svg/google";
import GitlabSVG from "@/public/svg/gitlab";
import RedditSVG from "@/public/svg/reddit";
import SpotifySVG from "@/public/svg/spotify";
import TwitterSVG from "@/public/svg/twitter";
import { Hint } from "../ui/hint";
import FaceBookSVG from "@/public/svg/facebook";
import { useState, useEffect } from "react";

const Social = () => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParam = useSearchParams();
  const callbackUrl = searchParam.get("callbackUrl");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onClick = (
    provider:
      | "google"
      | "github"
      | "facebook"
      | "gitlab"
      | "reddit"
      | "spotify"
      | "twitter"
  ) => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  if (!isMounted) {
    return null;
  }


  return (
    <div className="grid grid-rows-3 w-full">
      <div className="flex items-center space-x-1">
        <Button
          size="icon"
          variant="outline"
          className="w-full"
          onClick={() => {
            onClick("google");
          }}
        >
          <Hint label="Google">
            <GoogleSVG />
          </Hint>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-full"
          onClick={() => {
            onClick("github");
          }}
        >
          <Hint label="Github">
            <Github className="h-5 w-5" />
          </Hint>
        </Button>
        {/* <Button size="lg" variant="outline" className="w-full" onClick={()=>{onClick("facebook")}}>
                <FaceBookSVG />
                </Button> */}
      </div>

      <div className="flex items-center space-x-1 space-y-1">
        <Button
          size="icon"
          variant="outline"
          className="w-full"
          onClick={() => {
            onClick("gitlab");
          }}
        >
          <Hint label="Gitlab">
            <GitlabSVG />
          </Hint>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-full"
          onClick={() => {
            onClick("reddit");
          }}
        >
          <Hint label="Reddit">
            <RedditSVG />
          </Hint>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-full"
          onClick={() => {
            onClick("spotify");
          }}
        >
          <Hint label="Spotify">
            <SpotifySVG />
          </Hint>
        </Button>
      </div>
      <div className="flex items-center space-x-1 space-y-1">
        <Button
          size="icon"
          variant="outline"
          className="w-full"
          onClick={() => {
            onClick("twitter");
          }}
        >
          <Hint label="Twitter">
            <TwitterSVG />
          </Hint>
        </Button>
      </div>
    </div>
  );
};

export default Social;

"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import Video from "../uis-home/video";
import { useState,useEffect } from "react";

const Slider = () => {
  const user = useCurrentUser();
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  return (
    <div>
      <Video languageToUse={languageToUse} url="/video/slider-video.mp4" />
    </div>
  );
};

export default Slider;

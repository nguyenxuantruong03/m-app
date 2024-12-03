"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
import Navigation from "./navigation";
import ShowSideBar from "./showSidebar";
import Toggle from "./toggle";
import { Wrapper } from "./wrapper";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const user = useCurrentUser()

  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  const languageToUse =
        user?.id && user?.role !== "GUEST" ? user?.language : storedLanguage || "vi";
  return (
    <>
      <ShowSideBar />
      <Wrapper>
        <Toggle languageToUse={languageToUse}/>
        <Navigation languageToUse={languageToUse}/>
      </Wrapper>
    </>
  );
};

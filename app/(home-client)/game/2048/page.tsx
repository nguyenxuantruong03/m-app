"use client";
import Container from "@/components/ui/container";
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import "./components/style.css";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import Game2048 from "./components/2024";
import {
  translateDesktopOnlyMessage,
  translateNote,
  translateUseButtonsOrArrows,
  translateControlOrPressButtons,
  translateStartOrRefreshGame,
} from "@/translate/translate-client";

const IndexPage = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
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

  const desktopOnlyMessage = translateDesktopOnlyMessage(languageToUse);
  const noteMessage = translateNote(languageToUse);
  const buttonOrArrowMessage = translateUseButtonsOrArrows(languageToUse);
  const controlOrPressMessage = translateControlOrPressButtons(languageToUse);
  const startOrRefreshGameMessage = translateStartOrRefreshGame(languageToUse);

  useEffect(() => {
    if (user?.role === "GUEST" || !user?.id) {
      router.push("/home-product");
    }
  }, [router, user?.id, user?.role]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  if (isMobile)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-xl font-bold text-slate-900 dark:text-slate-200">
          {desktopOnlyMessage}
        </div>
      </div>
    );

  return (
    <Container>
      {!isMobile && (
        <div className="text-center mt-40 mb-20 relative" id="game-container">
          <h1 className="text-5xl font-bold my-8 text-yellow-600">2048</h1>
          <div className="absolute">
            <div className="w-20 h-10 bg-amber-300 rounded-md flex items-center text-sm px-2 mx-auto my-1 font-semibold">
              {noteMessage}
              <AlertTriangle className=" ml-1 h-5 w-5" />
            </div>
            <div className="font-semibold w-48 rounded p-1 mx-auto bg-opacity-50 bg-gray-300 ">
              {buttonOrArrowMessage}
              <p className=" flex ml-10">
                <ArrowUp /> <ArrowDown /> <ArrowLeft /> <ArrowRight />
              </p>
              {controlOrPressMessage}
              <p className="text-red-500">&#39;N&#39; </p>{" "}
              {startOrRefreshGameMessage}
            </div>
          </div>
          <Game2048 />
        </div>
      )}
    </Container>
  );
};

export default IndexPage;

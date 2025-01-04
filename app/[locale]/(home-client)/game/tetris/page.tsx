"use client";
import React, { useState } from "react";
import { TetrisProvider } from "./hooks/useTetris";
import Tetris from "./components/Tetris/Tetris";
import { AlertTriangle } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
export const revalidate = 86400;

const TetrisPage = () => {
  const t = useTranslations()
  const user = useCurrentUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = "Tetris";
  }, []);

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
          {t("game.desktopOnly")}
        </div>
      </div>
    );

  return (
    <>
      {!isMobile && (
        <div className="relative">
          <div className="absolute xl:left-16 2xl:left-36 top-60">
            <div className="w-20 h-10 bg-amber-300 rounded-md flex items-center text-sm px-2 mx-auto my-1 font-semibold">
              {t("action.note")}
              <AlertTriangle className=" ml-1 h-5 w-5" />
            </div>
            <div className="font-semibold w-48 rounded p-1 mx-auto bg-opacity-50 bg-gray-300">
              {t("game.experience")}
            </div>
          </div>
          <div className="mt-28 max-w-4xl mx-auto bg-black my-4">
            <TetrisProvider>
              <Tetris />
            </TetrisProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default TetrisPage;

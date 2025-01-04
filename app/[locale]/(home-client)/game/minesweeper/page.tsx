"use client";
import dynamic from "next/dynamic";
import Container from "@/components/ui/container";
// import Game from "./components/game";
import { AlertTriangle } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const GameNossr = dynamic(() => import("./components/game"), {
  ssr: false,
});
const Page = () => {
  const t = useTranslations()
  const user = useCurrentUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = "Minesweeper"
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
    <Container>
      {!isMobile && (
        <div className="mt-32 mb-12 ">
          <p className="text-5xl font-bold text-center mb-10 text-gray-400">
            Minesweeper
          </p>
          <div className="absolute left-36">
            <div className="w-20 h-10 bg-amber-300 rounded-md flex items-center text-sm px-2 mx-auto my-1 font-semibold">
              {t("action.note")}
              <AlertTriangle className=" ml-1 h-5 w-5" />{" "}
            </div>
            <div className="font-semibold w-48 rounded p-1 mx-auto bg-opacity-50 bg-gray-300 ">
              {t("game.goodExperience")}
              <span className="text-red-500 text-center">
                &#39;{t("game.clickOnSmile")}&#39;{" "}
              </span>{" "}
              {t("game.startOrRefresh")}
            </div>
          </div>
          <GameNossr settings={{ height: 16, width: 16, minesCount: 40 }} />
        </div>
      )}
    </Container>
  );
};

export default Page;

"use client";
import Header from "./components/Header";
// import Scene from "./components/Scene";
import { GameProvider } from "./context/GameContext";
import dynamic from "next/dynamic";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SceneNossr = dynamic(() => import("./components/Scene"), {
  ssr: false,
});
const Pacman = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

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
          Sorry, this game only works on desktop!
        </div>
      </div>
    );

  return (
    <>
      {!isMobile && (
        <div className="pacman-app mt-24">
          <GameProvider>
            <Header />
            <SceneNossr foodSize={60} border={20} topScoreBoard={100} />
          </GameProvider>
        </div>
      )}
    </>
  );
};

export default Pacman;

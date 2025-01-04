"use client";
import Container from "@/components/ui/container";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import { useTranslations } from "next-intl";

export const revalidate = 86400;
const GamePage = () => {
  const t = useTranslations()
  const user = useCurrentUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [alertGuestModal, setAlertGuestModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = t("game.game");
  }, []);

  const handleClick2048 = () => {
    router.push("/game/2048");
  };

  const handleClickMinesweeper = () => {
    router.push("/game/minesweeper");
  };
  const handleClickPacman = () => {
    router.push("/game/pacman");
  };
  const handleClickTetris = () => {
    router.push("/game/tetris");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (user?.role === "GUEST" || !user?.id) {
      setAlertGuestModal(true);
      router.push("/home-product");
    }
    setIsMounted(true);
  }, [router, user?.id, user?.role]);

  if (!isMounted) {
    return null;
  }

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
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
      />
      <div className="mt-40">
        <h1 className="text-center text-4xl font-bold my-5 bg-gradient-to-r from-[#FFE998] to-[#57370D] bg-clip-text text-transparent">
          {t("game.gameCoin")}
        </h1>

        <div className="my-8 space-x-5 flex">
          <Image
            src="/images/2048.png"
            alt=""
            width={100}
            height={100}
            className="cursor-pointer"
            onClick={handleClick2048}
          />

          <Image
            src="/images/logo-minesweeper.png"
            alt=""
            width={100}
            height={100}
            className="cursor-pointer"
            onClick={handleClickMinesweeper}
          />
          <Image
            src="/images/imagepacman.webp"
            alt=""
            width={100}
            height={100}
            className="cursor-pointer"
            onClick={handleClickPacman}
          />
          <Image
            src="/images/tetris.png"
            alt=""
            width={100}
            height={100}
            className="cursor-pointer"
            onClick={handleClickTetris}
          />
        </div>
      </div>
    </Container>
  );
};

export default GamePage;

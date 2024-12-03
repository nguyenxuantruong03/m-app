"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import Menu from "./menu-list";
import { useEffect, useState } from "react";
import { translateListProductMessage } from "@/translate/translate-client";

export const revalidate = 86400;

const ListProduct = () => {
  const user = useCurrentUser();
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

  const listProductMessage = translateListProductMessage(languageToUse);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 640);
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
          {listProductMessage}
        </div>
      </div>
    );
  return <>{!isMobile && <Menu />}</>;
};

export default ListProduct;

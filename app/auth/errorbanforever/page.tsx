"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import {
  getBanPermanentMessage,
  translateAccountPermanentlyBanned,
  translateAccountPermanentlyBanneds,
  translateBackToLogin,
} from "@/translate/translate-client";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const ErrorCard = () => {
  //language
  const [language, setLanguage] = useState("vi");
  const [isOpen, setOpen] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  const languageToUse = storedLanguage || language;
  const accountPermanentlyBannedMessage =
    translateAccountPermanentlyBanned(languageToUse);
  const backToLoginMessage = translateBackToLogin(languageToUse);
  const accountPermanentlyBannedsMessage =
    translateAccountPermanentlyBanneds(languageToUse);
  const banMessage = getBanPermanentMessage(languageToUse);

    useEffect(() => {
      document.title = banMessage.banPermanent;
    }, []);

  return (
    <CardWrapper
      headerLabel={accountPermanentlyBannedMessage}
      backButtonHref="/auth/login"
      backButtonLabel={backToLoginMessage}
      setLanguage={setLanguage}
      languageToUse={languageToUse}
      setOpen={setOpen}
      isOpen={isOpen}
    >
      <div className="bg-red-500 bg-opacity-20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive font-semibold">
        <AlertTriangle className="text-destructive w-12" />
        <p>{accountPermanentlyBannedsMessage}</p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;

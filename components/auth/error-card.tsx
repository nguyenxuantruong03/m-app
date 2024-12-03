"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import {
  translateBackToLogin,
  translateErrorMessage,
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
  const backToLoginMessage = translateBackToLogin(languageToUse);
  const erorMessage = translateErrorMessage(languageToUse);

  return (
    <CardWrapper
      headerLabel={erorMessage}
      backButtonHref="/auth/login"
      backButtonLabel={backToLoginMessage}
      setLanguage={setLanguage}
      languageToUse={languageToUse}
      setOpen={setOpen}
      isOpen={isOpen}
    >
      <div className="w-full flex justify-center items-center">
        <AlertTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;

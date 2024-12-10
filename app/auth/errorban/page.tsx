"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import {
  getViolationMessage,
  translateAccountBanned,
  translateAccountSuspended,
  translateBackToLogin,
} from "@/translate/translate-client";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const ErrorCardBan = () => {
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
  const accountSuspendedMessage = translateAccountSuspended(languageToUse);
  const backtoLoginMessage = translateBackToLogin(languageToUse);
  const accountBannedMessage = translateAccountBanned(languageToUse);
  const ViolationMessage = getViolationMessage(languageToUse);

  useEffect(() => {
    document.title = ViolationMessage.violation;
  }, []);

  return (
    <CardWrapper
      headerLabel={accountSuspendedMessage}
      backButtonHref="/auth/login"
      backButtonLabel={backtoLoginMessage}
      setLanguage={setLanguage}
      languageToUse={languageToUse}
      setOpen={setOpen}
      isOpen={isOpen}
    >
      <div className="bg-red-500 bg-opacity-20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive font-semibold">
        <AlertTriangle className="text-destructive w-24" />
        <p>{accountBannedMessage}</p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCardBan;

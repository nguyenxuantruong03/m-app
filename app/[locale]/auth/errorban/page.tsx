"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ErrorCardBan = () => {
  const t = useTranslations()
  //language
  const [language, setLanguage] = useState("vi");
  const [isOpen, setOpen] = useState(false);

  const languageToUse = language;
  
  useEffect(() => {
    document.title = t("auth.violation");
  }, []);

  return (
    <CardWrapper
      headerLabel={t("auth.accountSuspended")}
      backButtonHref="/auth/login"
      backButtonLabel={t("auth.backToLogin")}
      setLanguage={setLanguage}
      languageToUse={languageToUse}
      setOpen={setOpen}
      isOpen={isOpen}
    >
      <div className="bg-red-500 bg-opacity-20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive font-semibold">
        <AlertTriangle className="text-destructive w-24" />
        <p>{t("auth.accountBanned")}</p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCardBan;

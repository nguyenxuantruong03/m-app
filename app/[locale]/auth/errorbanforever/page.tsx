"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ErrorCard = () => {
  const t = useTranslations()
  //language
  const [language, setLanguage] = useState("vi");
  const [isOpen, setOpen] = useState(false);

  const languageToUse = language;

    useEffect(() => {
      document.title = t("auth.banPermanent");
    }, []);

  return (
    <CardWrapper
      headerLabel={t("auth.accountPermanentlyBanned")}
      backButtonHref="/auth/login"
      backButtonLabel={t("auth.backToLogin")}
      setLanguage={setLanguage}
      languageToUse={languageToUse}
      setOpen={setOpen}
      isOpen={isOpen}
    >
      <div className="bg-red-500 bg-opacity-20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive font-semibold">
        <AlertTriangle className="text-destructive w-12" />
        <p>{t("auth.accountPermanentlyBanneds")}</p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;

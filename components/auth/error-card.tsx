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
    document.title = t("action.error");
  }, []);

  return (
    <CardWrapper
      headerLabel={t("auth.error")}
      backButtonHref="/auth/login"
      backButtonLabel={t("auth.backToLogin")}
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

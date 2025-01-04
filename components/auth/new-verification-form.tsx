"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import CardWrapper from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/actions-signin-sign-up/new-verification";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useTranslations } from "next-intl";

const NewVerificationForm = () => {
  const t = useTranslations()
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  //get token bên mail.ts
  const token = searchParams.get("token");

  //language
  const [language, setLanguage] = useState("vi");
  const [isOpen, setOpen] = useState(false);

  const languageToUse = language;

  useEffect(() => {
    document.title = t("auth.newVerification");
  }, []);

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError(t("auth.missingToken"));
      return;
    }
    newVerification(token, languageToUse)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
        } else {
          setError(data.error);
        }
      })
      .catch(() => {
        setError(t("toastError.somethingWentWrong"));
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel={t("auth.confirmingVerification")}
      backButtonHref="/auth/login"
      backButtonLabel={t("auth.backToLogin")}
      setLanguage={setLanguage}
      languageToUse={languageToUse}
      setOpen={setOpen}
      isOpen={isOpen}
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader color="#66b0de" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;

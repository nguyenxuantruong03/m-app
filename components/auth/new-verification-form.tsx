"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import CardWrapper from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/actions-signin-sign-up/new-verification";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {
  getToastError,
  getVerificationMessage,
  translateBackToLogin,
  translateConfirmingVerification,
  translateMissingToken,
} from "@/translate/translate-client";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  //get token bên mail.ts
  const token = searchParams.get("token");

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
  const toastErrorMessage = getToastError(languageToUse);
  const missingTokenMessage = translateMissingToken(languageToUse);
  const confirmingVerificationMessage =
    translateConfirmingVerification(languageToUse);
  const backToLoginMessage = translateBackToLogin(languageToUse);
  const verificationMessage = getVerificationMessage(languageToUse);

  useEffect(() => {
    document.title = verificationMessage.newVerification;
  }, []);

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError(missingTokenMessage);
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
        setError(toastErrorMessage);
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel={confirmingVerificationMessage}
      backButtonHref="/auth/login"
      backButtonLabel={backToLoginMessage}
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

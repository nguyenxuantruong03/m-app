"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  getToastError,
  translateAccountDeletionConfirmation,
  translateAccountDeletionSuccess,
  translateContent,
  translateDeleteAccount,
  translateDeleteAccountPrompt,
  translateEnterEmailPrompt,
  translateIrreversibleDeletion,
} from "@/translate/translate-client";

interface FormDeleteAccountProps {
  languageToUse: string;
}

const FormDeleteAccount = ({ languageToUse }: FormDeleteAccountProps) => {
  const user = useCurrentUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // Focus on the input field when it is rendered
    const inputElement = document.getElementById("address-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  //language
  const toastErrorMessage = getToastError(languageToUse);
  const accountDeletionSuccessMessage =
    translateAccountDeletionSuccess(languageToUse);
  const accountDeletionConfirmationMessage =
    translateAccountDeletionConfirmation(languageToUse);
  const irreversibleDeletionMessage =
    translateIrreversibleDeletion(languageToUse);
  const deleteAccountPromptMessage = translateDeleteAccountPrompt(
    languageToUse,
    user?.email
  );
  const contentMessage = translateContent(languageToUse);
  const deleteAccountMessage = translateDeleteAccount(languageToUse);
  const enterEmailPromptMessage = translateEnterEmailPrompt(
    languageToUse,
    user?.email
  );

  const onSubmit = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/deleteaccount`);
      setLoading(false);
      toast.success(accountDeletionSuccessMessage);
      router.push("/auth/login");
    } catch (error: unknown) {
      setLoading(false);
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        toast.error(toastErrorMessage);
      }
    } finally {
      setLoading(true);
      if (!user?.id) {
        router.push("/auth/login");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isEmailValid = inputValue === user?.email;

  return (
    <>
      <AlertModal
        title={accountDeletionConfirmationMessage}
        message={irreversibleDeletionMessage}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onSubmit}
        loading={loading}
        languageToUse={languageToUse}
      />
      <div className="space-y-3">
        <p className="text-sm">{deleteAccountPromptMessage}</p>
        <p className=" text-white font-semibold text-sm">{contentMessage}</p>
        <Input
          id="address-input"
          placeholder={enterEmailPromptMessage}
          disabled={loading}
          onChange={handleChange}
        />
      </div>
      <div className="my-2"></div>
      <Button disabled={loading || !isEmailValid} onClick={() => setOpen(true)}>
        {deleteAccountMessage}
      </Button>
    </>
  );
};

export default FormDeleteAccount;

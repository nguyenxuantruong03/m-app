"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useTranslations } from "next-intl";

const FormDeleteAccount = () => {
  const t = useTranslations()
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

  const onSubmit = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/deleteaccount`);
      setLoading(false);
      toast.success(t("formInfo.accountDeletionSuccess"));
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
        toast.error(t("toastError.somethingWentWrong"));
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
        title={t("formInfo.accountDeletionConfirmation")}
        message={t("formInfo.irreversibleDeletion")}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onSubmit}
        loading={loading}
      />
      <div className="space-y-3">
        <p className="text-sm">{t("formInfo.deleteAccountPrompt",{email: user?.email})}</p>
        <p className=" text-white font-semibold text-sm">{t("formInfo.content")}</p>
        <Input
          id="address-input"
          placeholder={t("formInfo.enterEmailPrompt",{email: user?.email})}
          disabled={loading}
          onChange={handleChange}
        />
      </div>
      <div className="my-2"></div>
      <Button disabled={loading || !isEmailValid} onClick={() => setOpen(true)}>
        {t("info.deleteAccount")}
      </Button>
    </>
  );
};

export default FormDeleteAccount;

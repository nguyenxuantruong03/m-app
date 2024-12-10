"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "@/components/auth/card-wrapper";
import { NewPasswordSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { newPassword } from "@/actions/actions-signin-sign-up/new-password";
import PasswordField from "./field/passwordfield";
import {
  getPasswordNewMessages,
  translateBackToLogin,
  translateEnterNewPasswordTitle,
  translateNewPassword,
  translateResetPassword,
} from "@/translate/translate-client";

const NewPasswordForm = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  const enterNewPasswordTitleMessage =
    translateEnterNewPasswordTitle(languageToUse);
  const backToLoginMessage = translateBackToLogin(languageToUse);
  const newPasswordMessage = translateNewPassword(languageToUse);
  const resetPasswordMessage = translateResetPassword(languageToUse);
  const passwordResetMessage = getPasswordNewMessages(languageToUse);

  useEffect(() => {
    if (isPending) {
      document.title = passwordResetMessage.loading;
    } else {
      document.title = passwordResetMessage.newPassword;
    }
  }, [isPending]);

  // form bên dưới dùng để validate trường nhập theo loginForm bên dưới gọi form đẻ validate code đã xử lý ở  đây và bên dưới dùng destructuring để gọi hết vào
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setIsSubmitted(true);
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(values, token, languageToUse).then((data) => {
        if (data.error) {
          setError(data?.error);
          setPassword("");
        } else if (data?.success) {
          setSuccess(data?.success);
          setPassword("");
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel={enterNewPasswordTitleMessage}
      backButtonHref="/auth/login"
      backButtonLabel={backToLoginMessage}
      setLanguage={setLanguage}
      languageToUse={languageToUse}
      isPending={isPending}
      setOpen={setOpen}
      isOpen={isOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{newPasswordMessage}</FormLabel>
                  <FormControl>
                    <PasswordField
                      languageToUse={languageToUse}
                      field={field}
                      isPending={isPending}
                      validatePassword={setPasswordValid}
                      password={password}
                      setPassword={setPassword}
                      setError={setError}
                      setSuccess={setSuccess}
                      isSubmitted={isSubmitted}
                      setIsSubmitted={setIsSubmitted}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-2">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={isPending || !isPasswordValid}
          >
            {resetPasswordMessage}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;

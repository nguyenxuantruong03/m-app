"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
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
import { ResetSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import EmailField from "./field/emailfield";
import { reset } from "@/actions/actions-signin-sign-up/reset";
import { useTranslations } from "next-intl";

const ResetPasswordForm = () => {
  const t = useTranslations()
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [isSubmittedEmail, setIsSubmittedEmail] = useState(false);
  //language
  const [language, setLanguage] = useState("vi");
  const [isOpen, setOpen] = useState(false);

  const languageToUse = language;

  useEffect(() => {
    if (isPending) {
      document.title = t("loading.loading");
    } else {
      document.title = t("auth.resetPassword");
    }
  }, [isPending]);

  // form bên dưới dùng để validate trường nhập theo loginForm bên dưới gọi form đẻ validate code đã xử lý ở  đây và bên dưới dùng destructuring để gọi hết vào
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    setIsSubmittedEmail(true);
    startTransition(() => {
      reset(values, languageToUse).then((data) => {
        if (data.error) {
          setError(data?.error);
        } else if (data?.success) {
          setSuccess(data?.success);
          setEmail("");
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel={t("auth.forgotPassword")}
      backButtonHref="/auth/login"
      backButtonLabel={t("auth.backToLogin")}
      setLanguage={setLanguage}
      languageToUse={languageToUse}
      setOpen={setOpen}
      isOpen={isOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <EmailField
                      field={field}
                      isPending={isPending}
                      email={email}
                      setEmail={setEmail}
                      setError={setError}
                      setSuccess={setSuccess}
                      validateEmail={setEmailValid}
                      setIsSubmittedEmail={setIsSubmittedEmail}
                      isSubmittedEmail={isSubmittedEmail}
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
            disabled={isPending || !isEmailValid}
          >
            {t("auth.sentToEmail")}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;

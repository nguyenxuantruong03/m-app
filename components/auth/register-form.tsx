"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";

import CardWrapper from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { register } from "@/actions/actions-signin-sign-up/register";
import PasswordField from "./field/passwordfield";
import EmailField from "./field/emailfield";
import NameField from "./field/namefield";
import { X } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  getLoadingMessage,
  translateAlreadyHaveAccount,
  translateCreateAccount,
  translateName,
  translatePassword,
  translateRegister,
  translateVerifyNotRobot,
  translateVerifyNotRobots,
} from "@/translate/translate-client";

const getTheme = () => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
};

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isNameValid, setNameValid] = useState(false);
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [theme, setTheme] = useState(getTheme());
  const [registerClicked, setRegisterClicked] = useState(false);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setEmailValid] = useState(false);

  //Làm mới borderInput
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedName, setIsSubmittedName] = useState(false);
  const [isSubmittedEmail, setIsSubmittedEmail] = useState(false);
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
  const verifyNotRobotsMessage = translateVerifyNotRobots(languageToUse);
  const createAccountMessage = translateCreateAccount(languageToUse);
  const alreadyHaveAccountMessage = translateAlreadyHaveAccount(languageToUse);
  const nameMessage = translateName(languageToUse);
  const passwordMessage = translatePassword(languageToUse);
  const verifyNotRobotMessage = translateVerifyNotRobot(languageToUse);
  const loadingMessage = getLoadingMessage(languageToUse);
  const registerMessage = translateRegister(languageToUse);

  useEffect(() => {
    if (isPending) {
      document.title = loadingMessage.loading;
    } else {
      document.title = registerMessage;
    }
  }, [isPending]);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getTheme());
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleThemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleThemeChange);
    };
  }, []);

  // form bên dưới dùng để validate trường nhập theo loginForm bên dưới gọi form đẻ validate code đã xử lý ở  đây và bên dưới dùng destructuring để gọi hết vào
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    setRegisterClicked(true);
    if (!isCaptchaVerified) {
      return setError(verifyNotRobotsMessage);
    } else {
      startTransition(() => {
        register(values, languageToUse).then((data) => {
          if (data.error) {
            setError(data.error);
            setPassword("");
            setIsSubmitted(true);
            setIsSubmittedName(true);
            setIsSubmittedEmail(true);
          } else if (data.success) {
            setSuccess(data.success);
            // Reset form fields
            form.reset({
              email: "",
              password: "",
              name: "",
            });
            setPassword("");
            setEmail("");
            setName("");
            setIsSubmitted(true);
            setIsSubmittedName(true);
            setIsSubmittedEmail(true);
          }
        });
      });
    }
  };

  const handleCaptchaVerify = () => {
    setCaptchaVerified(true);
  };

  return (
    <CardWrapper
      headerLabel={createAccountMessage}
      backButtonHref="/auth/login"
      backButtonLabel={alreadyHaveAccountMessage}
      showSocial
      setLanguage={setLanguage}
      languageToUse={languageToUse}
      setOpen={setOpen}
      isOpen={isOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{nameMessage}</FormLabel>
                  <FormControl>
                    <NameField
                      languageToUse={languageToUse}
                      field={field}
                      isPending={isPending}
                      validateName={setNameValid}
                      setName={setName}
                      name={name}
                      setError={setError}
                      setSuccess={setSuccess}
                      isSubmittedName={isSubmittedName}
                      setIsSubmittedName={setIsSubmittedName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <EmailField
                      languageToUse={languageToUse}
                      field={field}
                      isPending={isPending}
                      validateEmail={setEmailValid}
                      setEmail={setEmail}
                      email={email}
                      setError={setError}
                      setSuccess={setSuccess}
                      isSubmittedEmail={isSubmittedEmail}
                      setIsSubmittedEmail={setIsSubmittedEmail}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{passwordMessage}</FormLabel>
                  <FormControl>
                    <PasswordField
                      languageToUse={languageToUse}
                      field={field}
                      isPending={isPending}
                      validatePassword={setPasswordValid}
                      setPassword={setPassword}
                      password={password}
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

          <div className="mb-1">
            <ReCAPTCHA
              sitekey="6LePtLopAAAAAMq1dib9ylE_qam95hA6CVCNIsRr"
              onChange={handleCaptchaVerify} // Xác thực ReCAPTCHA và cập nhật trạng thái
              theme={theme === "dark" ? "dark" : undefined}
            />
          </div>

          <div className="my-2">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={
              isPending ||
              !isPasswordValid ||
              !isNameValid ||
              !isCaptchaVerified ||
              !isEmailValid
            }
          >
            {createAccountMessage}
          </Button>

          <>
            {registerClicked && !isCaptchaVerified && (
              <div className="flex items-center space-x-1">
                <X className="w-5 h-5 mr-1 text-red-500" />
                <span className="text-red-500 text-xs">
                  {verifyNotRobotMessage}
                </span>
              </div>
            )}
          </>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;

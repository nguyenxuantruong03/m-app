"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { setting } from "@/actions/actions-signin-sign-up/setting";
import { SettingSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import PasswordField from "@/components/auth/field/passwordfield";
import PasswordNewField from "@/components/auth/field/passwordfieldnew";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import FaceBookSVG from "@/public/svg/facebook";
import GitlabSVG from "@/public/svg/gitlab";
import RedditSVG from "@/public/svg/reddit";
import SpotifySVG from "@/public/svg/spotify";
import TwitterSVG from "@/public/svg/twitter";
import GithubSVG from "@/public/svg/github";
import { Hint } from "@/components/ui/hint";
import { useTranslations } from "next-intl";

interface FormPasswordProps{
  languageToUse: string
}

const FormPassword = ({languageToUse}:FormPasswordProps) => {
  const t = useTranslations()
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isPasswordNewValid, setPasswordNewValid] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  //Làm mới borderInput
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedPasswordnew, setIsSubmittedPasswordnew] = useState(false);
  //Disable nếu như có password
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    // Kiểm tra xem password và newpassword có giá trị không
    if (password !== "" || newPassword !== "") {
      // Kiểm tra xem password và newPassword có giá trị hợp lệ không nếu đúng hết thì ko disalbe nếu sai thì disable
      if (!isPasswordValid || !isPasswordNewValid) {
        setIsSaveDisabled(true);
      } else {
        setIsSaveDisabled(false);
      }
    } else {
      setIsSaveDisabled(false);
    }
  }, [password, newPassword, isPasswordValid, isPasswordNewValid]);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      newPassword: undefined,
      password: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    if (values.password === "") {
      setError(t("formInfo.enterPassword"));
      return;
    }

    if (values.newPassword === "") {
      setError(t("formInfo.youEnterNewPassword"));
      return;
    }

    setSuccess("");
    setError("");
    setLoginClicked(true);
    startTransition(() => {
      setting(values, languageToUse)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setIsSubmitted(true);
            setIsSubmittedPasswordnew(true);
            setNewPassword("");
          }
          if (data.success) {
            update();
            router.refresh();
            setSuccess(data.success);
            setIsSubmitted(true);
            setIsSubmittedPasswordnew(true);
            setPassword("");
            setNewPassword("");
          }
        })
        .catch(() => {
          setError(t("toastError.somethingWentWrong"));
        });
    });
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {user?.isOAuth === false && (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("formInfo.password")}</FormLabel>
                    <FormControl>
                      <PasswordField
                        field={field}
                        isPending={isPending}
                        setPassword={setPassword}
                        validatePassword={setPasswordValid}
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
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("formInfo.newPassword")}</FormLabel>
                    <FormControl>
                      <PasswordNewField
                        field={field}
                        isPending={isPending}
                        validatePasswordNew={setPasswordNewValid}
                        setNewPassword={setNewPassword}
                        isSubmittedPasswordnew={isSubmittedPasswordnew}
                        newPassword={newPassword}
                        setError={setError}
                        setSuccess={setSuccess}
                        setIsSubmittedPasswordnew={setIsSubmittedPasswordnew}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" disabled={isPending || isSaveDisabled}>
                {t("action.save")}
              </Button>
              {loginClicked && isSaveDisabled && (
                <div className="flex items-center space-x-1">
                  <X className="w-5 h-5 mr-1 text-red-500" />
                  <span className="text-red-500 text-xs">
                    {t("formInfo.youEnterNewPassword")}
                  </span>
                </div>
              )}
            </>
          )}
          {user?.isOAuth === true && (
            <div className="text-base font-semibold dark:text-gray-500 text-slate-800">
              <Separator className="my-2" />
              <span>{t("formInfo.loggedInWith")} </span>
              {user?.provider === "google" ? (
                <span style={{ whiteSpace: "nowrap" }}>
                  <strong>
                    <span
                      style={{
                        fontFamily: "Product Sans, sans-serif",
                        fontSize: "20px",
                      }}
                    >
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#DB4437]">o</span>
                      <span className="text-[#F4B400]">o</span>
                      <span className="text-[#0F9D58]">g</span>
                      <span className="text-[#4285F4]">l</span>
                      <span className="inline-block transform rotate-[-20deg]">
                        e
                      </span>
                    </span>
                  </strong>
                </span>
              ) : user?.provider === "github" ? (
                <span className="inline-block">
                  <Hint label="Github">
                    <GithubSVG width={18} height={18} />
                  </Hint>
                </span>
              ) : user?.provider === "facebook" ? (
                <span className="inline-block">
                  <Hint label="Facebook">
                    <FaceBookSVG width={18} height={18} />
                  </Hint>
                </span>
              ) : user?.provider === "gitlab" ? (
                <span className="inline-block">
                  <Hint label="Gitlab">
                    <GitlabSVG width={18} height={18} />
                  </Hint>
                </span>
              ) : user?.provider === "reddit" ? (
                <span className="inline-block">
                  <Hint label="Reddit">
                    <RedditSVG width={18} height={18} />
                  </Hint>
                </span>
              ) : user?.provider === "spotify" ? (
                <span className="inline-block">
                  <Hint label="Spotify">
                    <SpotifySVG width={18} height={18} />
                  </Hint>
                </span>
              ) : user?.provider === "twitter" ? (
                <span className="inline-block">
                  <Hint label="Twitter">
                    <TwitterSVG />
                  </Hint>
                </span>
              ) : (
                <span className="uppercase font-bold text-red-500 inline-block">
                  {user?.provider}
                </span>
              )}
              <span> {t("formInfo.cannotEnableTwoFactor")}</span>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default FormPassword;

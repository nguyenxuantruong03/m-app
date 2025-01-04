"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { setting } from "@/actions/actions-signin-sign-up/setting";
import { SettingSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
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

interface FormTwoFactorProps{
  languageToUse: string;
}

const FormTwoFactor = ({languageToUse}:FormTwoFactorProps) => {
  const t = useTranslations()
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    if (values.isTwoFactorEnabled === user?.isTwoFactorEnabled) {
      setError(t("formInfo.changeTwoFactorStatus"));
      return;
    }
    setSuccess("");
    setError("");
    startTransition(() => {
      setting(values,languageToUse)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            router.refresh();
            setSuccess(data.success);
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
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadpw-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{t("formInfo.twoFactorAuthentication")}</FormLabel>
                      <FormDescription>
                        {t("formInfo.enableTwoFactorAuthentication")}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" disabled={isPending}>
                {t("action.save")}
              </Button>
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
                  <Hint label="GitLab">
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

export default FormTwoFactor;

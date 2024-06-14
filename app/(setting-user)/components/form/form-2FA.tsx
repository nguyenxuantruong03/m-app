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
import { Github } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const FormTwoFactor = () => {
  const user = useCurrentUser();
  const router = useRouter()
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
      setError("Hãy thay đổi trạng thái xác minh 2 bước!");
      return;
    }
    setSuccess("");
    setError("");
    startTransition(() => {
      setting(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            router.refresh()
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("Something went wrong");
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
                      <FormLabel>Two Factor Authentication</FormLabel>
                      <FormDescription>
                        Enable two factor authentication for your
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
                Save
              </Button>
            </>
          )}
          {user?.isOAuth === true && (
            <div className="text-base font-semibold dark:text-gray-500 text-slate-800">
            <Separator className="my-2"/>
              <span>Bạn đã đăng nhập bằng </span>
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
                  <Github className="h-5 w-5 bg-white rounded-full p-px mx-1" />
                </span>
              ) : user?.provider === "facebook" ? (
                <span className="inline-block">
                  <Image
                    src="/images-icon/facebook-icon.png"
                    alt="404"
                    width="50"
                    height="50"
                    className="h-7 w-7"
                  />
                </span>
              ) : user?.provider === "gitlab" ? (
                <span className="inline-block">
                  <Image
                    src="/images-icon/gitlab.png"
                    alt="404"
                    width="50"
                    height="50"
                    className="h-5 w-5 mx-1"
                  />
                </span>
              ) : user?.provider === "reddit" ? (
                <span className="inline-block">
                  <Image
                    src="/images-icon/reddit.png"
                    alt="404"
                    width="50"
                    height="50"
                    className="w-8"
                  />
                </span>
              ) : user?.provider === "spotify" ? (
                <span className="inline-block">
                  <Image
                    src="/images-icon/spotify.png"
                    alt="404"
                    width="50"
                    height="50"
                    className="w-8"
                  />
                </span>
              ) : user?.provider === "twitter" ? (
                <span className="inline-block">
                  <Image
                    src="/images-icon/twitter.png"
                    alt="404"
                    width="50"
                    height="50"
                    className="w-8"
                  />
                </span>
              ) : (
                <span
                  className="uppercase font-bold text-red-500 inline-block"
                >
                  {user?.provider}
                </span>
              )}
              <span> nên không thể bật xác minh 2 bước.</span>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default FormTwoFactor;

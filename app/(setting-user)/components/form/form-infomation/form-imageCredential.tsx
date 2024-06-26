"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
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
import ImageUpload from "@/components/ui/image-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { getAccountByUserId } from "@/data/account";
import toast from "react-hot-toast";

interface AccountItem {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

const FormImageCredential = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [account, setAccount] = useState<AccountItem | null>(null);
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        redirect("/auth/login");
      }

      try {
        const accountData = await getAccountByUserId(user?.id);
        setAccount(accountData || null);
      } catch (error) {
        toast.error("Invalid Error");
      }
    };

    fetchData();
  }, [user]);

  const imageCredentials = user?.imageCredential[0] || undefined;
  const isGitHubOrGoogleUser =
    account?.provider === "github" ||
    account?.provider === "google" ||
    account?.provider === "facebook" ||
    account?.provider === "gitlab" ||
    account?.provider === "reddit" ||
    account?.provider === "spotify" ||
    account?.provider === "twitter";

  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials[0] : null) ||
    user?.image;

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      imageCredential: user?.imageCredential || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    const valuesString = JSON.stringify(values.imageCredential);
    const userString = JSON.stringify(user?.imageCredential);
    if(!values.imageCredential){
      setError(
        "Hãy thêm ảnh đại diện cho tài khoản của bạn."
      );
    }
    
    if (!values.imageCredential || values.imageCredential.length > 1) {
      setError(
        "Hãy lựa chọn 1 bức ảnh đẹp nhất để làm ảnh đại diện và xóa các ảnh khác đi."
      );
      return;
    }
   // Kiểm tra giá trị imageCredential nhập vào và user?.imageCredential
    if (valuesString === userString) {
      setError("Hãy thay đổi ảnh mới ảnh trên đang được sử dụng.");
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
            router.refresh();
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
          <FormField
            control={form.control}
            name="imageCredential"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <>
                    {user?.imageCredential &&
                    user.imageCredential.length > 0 ? null : (
                      <div className="relative flex items-center justify-center">
                        <Avatar className="w-40 h-40">
                          {isGitHubOrGoogleUser && avatarImage ? (
                            <AvatarImage src={avatarImage} />
                          ) : avatarImage ? (
                            <AvatarImage src={avatarImage} />
                          ) : (
                            <AvatarFallback className="bg-sky-500">
                              <User className="text-white" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>
                    )}

                    <ImageUpload
                      classNamesForm="pb-[160px] left-[20%] top-[33%] md:left-[32%] md:top-[30%] absolute px-5 opacity-0 ml-3.5"
                      classNameImage="hidden"
                      value={field.value || []} // Provide an empty array as default value
                      disabled={isPending}
                      onChange={(url) =>
                        field.onChange([...(field.value || []), url])
                      } // Use field.value || [] to ensure it's an array
                      onRemove={(url) =>
                        field.onChange(
                          (field.value || []).filter(
                            (current) => current !== url
                          )
                        )
                      }
                    />
                    <div className="flex items-center justify-center">
                      <ImageUpload
                        classNamesForm="ml-3.5"
                        value={field.value || []} // Provide an empty array as default value
                        disabled={isPending}
                        onChange={(url) =>
                          field.onChange([...(field.value || []), url])
                        } // Use field.value || [] to ensure it's an array
                        onRemove={(url) =>
                          field.onChange(
                            (field.value || []).filter(
                              (current) => current !== url
                            )
                          )
                        }
                        maxFiles={1}
                      />
                    </div>
                  </>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default FormImageCredential;

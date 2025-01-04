"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useTransition,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setting } from "@/actions/actions-signin-sign-up/setting";
import { SettingSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface FormLinkFaceBookProps {
  classNames?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  languageToUse: string
}

const FormLinkFaceBook = ({
  classNames,
  setOpen,
  languageToUse
}: FormLinkFaceBookProps) => {
  const t = useTranslations()
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("linkfacebook-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      linkfacebook: user?.linkfacebook || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    // Kiểm tra giá trị linkfacebook nhập vào và user?.linkfacebook
    if (values.linkfacebook === user?.linkfacebook) {
      setError(t("formInfo.changeFaceBookLink"));
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
            setOpen?.(false);
          }
        })
        .catch(() => {
          setError(t("toastError.somethingWentWrong"));
        });
    });
  };
  return (
    <Form {...form}>
      <form
        className={`space-y-6 ${classNames}`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="linkfacebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("formInfo.fabookPath")}</FormLabel>
                <FormControl>
                  <Input
                    id="linkfacebook-input"
                    {...field}
                    placeholder="https://www.facebook.com/ ..."
                    disabled={isPending}
                    className={
                      form.formState.errors.linkfacebook
                        ? "border-2 border-red-500 border-opacity-50"
                        : ""
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {!setOpen && (
          <>
            <FormError
              message={error || form.formState.errors.linkfacebook?.message}
            />
            <FormSuccess message={success} />
          </>
        )}
        <div>
          {setOpen && (
            <Button
              className="mr-2"
              onClick={() => setOpen?.(false)}
              disabled={isPending}
            >
              {t("action.cancel")}
            </Button>
          )}
          <Button
            className="text-white"
            variant="primary"
            type="submit"
            disabled={isPending}
          >
            {t("action.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormLinkFaceBook;

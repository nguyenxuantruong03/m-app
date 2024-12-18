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
import {
  getAddressMessage,
  getToastError,
  translateCancel,
  translateChangeAddressNotification,
  translateSave,
} from "@/translate/translate-client";

interface FormAddressProps {
  classNames?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  languageToUse: string;
}

const FormAddress = ({
  classNames,
  setOpen,
  languageToUse,
}: FormAddressProps) => {
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("address-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  //language
  const toastErrorMessage = getToastError(languageToUse);
  const cancelMessage = translateCancel(languageToUse);
  const saveMessage = translateSave(languageToUse);
  const addressMessage = getAddressMessage(languageToUse);
  const changeAddressNotificationMessage =
    translateChangeAddressNotification(languageToUse);

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      address: user?.address || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    // Kiểm tra giá trị addreess nhập vào và user?.address
    if (values.address === user?.address) {
      setError(changeAddressNotificationMessage);
      return;
    }
    setSuccess("");
    setError("");
    startTransition(() => {
      setting(values, languageToUse)
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
          setError(toastErrorMessage);
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{addressMessage}</FormLabel>
                <FormControl>
                  <Input
                    id="address-input"
                    {...field}
                    placeholder="457 Lê Văn Quới ..."
                    disabled={isPending}
                    className={
                      form.formState.errors.address
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
              message={error || form.formState.errors.address?.message}
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
              {cancelMessage}
            </Button>
          )}
          <Button
            className="text-white"
            variant="primary"
            type="submit"
            disabled={isPending}
          >
            {saveMessage}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormAddress;

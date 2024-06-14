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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setting } from "@/actions/actions-signin-sign-up/setting";
import { SettingSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { useRouter } from "next/navigation";

const FormAddressOther = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById('addressother-input');
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      addressother: user?.addressother || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    // Kiểm tra giá trị addressother nhập vào và user?.addressother
    if (values.addressother === user?.addressother) {
      setError("Hãy thay đổi địa chỉ mới địa chỉ trên đang được sử dụng.");
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
            name="addressother"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ khác</FormLabel>
                <FormControl>
                  <Input
                  id="addressother-input"
                    {...field}
                    placeholder="457 Lê Văn Quới ..."
                    disabled={isPending}
                    className={
                      form.formState.errors.addressother
                        ? "border-2 border-red-500 border-opacity-50"
                        : ""
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormError message={error || form.formState.errors.addressother?.message} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};

export default FormAddressOther;

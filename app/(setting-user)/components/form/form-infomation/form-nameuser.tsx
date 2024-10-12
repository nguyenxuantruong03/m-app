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

const FormNameUser = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById('nameuser-input');
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
  
  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      nameuser:  user?.nameuser,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    if (values.nameuser === user?.nameuser) {
      setError("Hãy thay đổi tên mới tên trên đang được sử dụng.");
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    form.setValue("nameuser", value);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="nameuser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên Người dùng</FormLabel>
                <FormControl>
                  <Input
                   id="nameuser-input"
                    {...field}
                    placeholder="@truong234 ..."
                    disabled={isPending}
                    className={
                      form.formState.errors.nameuser
                        ? "border-2 border-red-500 border-opacity-50"
                        : ""
                    }
                    
                    onChange={handleInputChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormError message={error || form.formState.errors.nameuser?.message} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending}>Save</Button>
        <div className="text-sm text-gray-500 select-none mt-3">
          URL: {process.env.NEXT_PUBLIC_URL}/me/{(form.getValues("nameuser") || "")}
        </div>
      </form>
    </Form>
  );
};

export default FormNameUser;

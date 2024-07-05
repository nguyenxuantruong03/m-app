"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
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
import { useRouter } from "next/navigation";

const FormImageCredential = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      imageCredential: user?.imageCredential || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    setSuccess("");
    setError("");
    const valuesString = JSON.stringify(values.imageCredential);
    const userString = JSON.stringify(user?.imageCredential);

    if(!values.imageCredential || values.imageCredential.length === 0){
      setError(
        "Hãy thêm ảnh đại diện cho tài khoản của bạn."
      );
      return;
    }
    
    if (!values.imageCredential || values.imageCredential.length > 1) {
      setError(
        "Hãy lựa chọn 1 bức ảnh đẹp nhất để làm ảnh đại diện và xóa ảnh còn lại đi."
      );
      return;
    }
   // Kiểm tra giá trị imageCredential nhập vào và user?.imageCredential
    if (valuesString === userString) {
      setError("Hãy thay đổi ảnh mới ảnh trên đang được sử dụng.");
      return;
    }
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
                    <div className="flex items-center justify-center">
                      <ImageUpload
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
                        showAvatar={true}
                      />
                    </div>
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

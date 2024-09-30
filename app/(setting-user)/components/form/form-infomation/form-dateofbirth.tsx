"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, Dispatch, SetStateAction } from "react";
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
import toast from "react-hot-toast";

interface FormDateOfBirthProps {
  classNames?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const FormDateOfBirth = ({ classNames, setOpen }: FormDateOfBirthProps) => {
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      dateofbirth: user?.dateofbirth ? new Date(user?.dateofbirth) : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    // Kiểm tra giá trị dateofbirth nhập vào và user?.dateofbirth
    if (values.dateofbirth === user?.dateofbirth) {
      setError("Hãy thay đổi ngày sinh mới ngày sinh trên đang được sử dụng.");
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
            setOpen?.(false);
          }
        })
        .catch(() => {
          setError("Something went wrong");
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
            name="dateofbirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sinh nhật <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={
                      form.formState.errors.dateofbirth
                        ? "border-2 border-red-500 border-opacity-50"
                        : ""
                    }
                    type="date"
                    disabled={isPending}
                    value={
                      field.value
                        ? field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : field.value
                        : ""
                    }
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      const parsedDate = Date.parse(dateValue);
                      
                      // Check if the selected date is greater than the current date
                      if (parsedDate > Date.now()) {
                        toast.error("Ngày chọn không được lớn hơn ngày hiện tại!"); // Show error message for future date
                        field.onChange(""); // Return value ""
                        return;
                      }
                  
                      // Check if the selected date is earlier than January 1, 1900
                      if (parsedDate < new Date(1900, 0, 1).getTime()) {
                        toast.error("Ngày chọn không được nhỏ hơn ngày 01/01/1900!"); // Show error message for dates before 1900
                        field.onChange(""); // Return value ""
                        return;
                      }
                  
                      field.onChange(
                        isNaN(parsedDate) ? dateValue : new Date(parsedDate)
                      );
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {!setOpen && (
          <>
            <FormError
              message={error || form.formState.errors.dateofbirth?.message}
            />
            <FormSuccess message={success} />
          </>
        )}
        <div>
          {setOpen && (
            <Button
              className="mr-2"
              onClick={() => {
                setOpen?.(false);
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
          )}
          <Button
            className="text-white"
            variant="primary"
            type="submit"
            disabled={isPending}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormDateOfBirth;

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
import { Dispatch, SetStateAction } from "react";
import { Textarea } from "@/components/ui/textarea";

interface FormBioProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const MAX_CHAR_LIMIT = 101;

const FormBio = ({ setOpen }: FormBioProps) => {
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [remainingChars, setRemainingChars] = useState(MAX_CHAR_LIMIT); 
  const [loading, setLoading] = useState(false);
  const [isBioUnchanged, setIsBioUnchanged] = useState(true); 
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (user?.bio) {
      setRemainingChars(MAX_CHAR_LIMIT - user.bio.length);
      setIsBioUnchanged(true); 
    }
  }, [user?.bio]);

  useEffect(() => {
    const inputElement = document.getElementById("bio-textarea");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      bio: user?.bio || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    const trimmedBio = values.bio?.trim();
    if (isBioUnchanged || trimmedBio === user?.bio) return;

    setLoading(true);
    setSuccess("");
    setError("");
    startTransition(() => {
      setting({ ...values, bio: trimmedBio })
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
        })
        .finally(() => setLoading(false));
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { // Change type to HTMLTextAreaElement
    const inputValue = e.target.value;

    if (inputValue.length <= MAX_CHAR_LIMIT) {
      form.setValue("bio", inputValue);
      setRemainingChars(MAX_CHAR_LIMIT - inputValue.length);

      if (inputValue === user?.bio) {
        setIsBioUnchanged(true);
      } else {
        setIsBioUnchanged(false);
      }
    }
  };

  const hasLeadingSpace = form.watch("bio")?.startsWith(" ");

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio trang cá nhân</FormLabel>
                <FormControl>
                  <Textarea
                    id="bio-textarea"
                    {...field}
                    placeholder="Minh là truong ..."
                    disabled={isPending}
                    className={
                      form.formState.errors.bio
                        ? "border-2 border-red-500 border-opacity-50"
                        : ""
                    }
                    onChange={handleInputChange}
                    value={field.value || ""}
                    maxLength={MAX_CHAR_LIMIT}
                    style={{ resize: "none" }}
                  />
                </FormControl>
                <p className="text-sm text-gray-500 text-end">
                  Còn 
                  <span className="mx-1">
                    {remainingChars < 0 ? 0 : remainingChars}
                  </span>
                  ký tự
                </p>
              </FormItem>
            )}
          />
        </div>
        <FormError message={error || form.formState.errors.bio?.message} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          disabled={isPending || remainingChars < 0 || isBioUnchanged || loading || hasLeadingSpace}
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default FormBio;
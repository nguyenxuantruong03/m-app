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
import { Button } from "@/components/ui/button";
import { setting } from "@/actions/actions-signin-sign-up/setting";
import { SettingSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface FormGenderProps {
  classNames?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  languageToUse: string;
}

const FormGender = ({
  classNames,
  setOpen,
  languageToUse
}: FormGenderProps) => {
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
      gender: user?.gender || undefined,
    },
  });

  // Gender labels with images
  const genderOptions = {
    Male: {
      label: t("info.male"),
      image: "/images/male.png",
    },
    Female: {
      label: t("info.female"),
      image: "/images/female.png",
    },
    None: {
      label: t("info.other"),
      image: "/images/other.png",
    },
  };

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    if (values.gender === user?.gender) {
      setError(t("formInfo.changeGenderNotification"));
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("info.gender")} <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <RadioGroup
                  disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  {Object.entries(genderOptions).map(
                    ([value, { label, image }]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <label
                          htmlFor={value}
                          className="flex items-center space-x-2"
                        >
                          <Image
                            src={image}
                            alt={label}
                            width="20"
                            height="20"
                          />{" "}
                          {/* Adjust size as needed */}
                          <span>{label}</span>
                        </label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </FormItem>
            )}
          />
        </div>
        {!setOpen && (
          <>
            <FormError message={error} />
            <FormSuccess message={success} />
          </>
        )}
        <div>
          {setOpen && (
            <Button
              className="mr-2"
              disabled={isPending}
              onClick={() => setOpen?.(false)}
            >
              {t("action.cancel")}
            </Button>
          )}
          <Button
            variant="primary"
            className="text-white"
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

export default FormGender;

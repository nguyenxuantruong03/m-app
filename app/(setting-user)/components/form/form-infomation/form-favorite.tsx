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
import { useRouter } from "next/navigation";
import Select, { StylesConfig } from "react-select";
import { Favorite } from "@prisma/client";

interface FormFavoriteProps {
  dataallfavorite: Favorite[];
}

interface OptionType {
  label: string;
  value: string;
}


const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `rgba(${r}, ${g}, ${b}, 0.1)`;
  return {
    background: color,
    text: `rgb(${r}, ${g}, ${b})`,
  };
};

const FormFavorite: React.FC<FormFavoriteProps> = ({ dataallfavorite }) => {
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [selectedOption, setSelectedOption] = useState<
    { label: string; value: string }[]
  >([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const data = dataallfavorite.map((item) => ({
      label: item.name,
      value: item.name,
    }));
    setSelectedOption(data);
  }, [dataallfavorite]);

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      favorite: user?.favorite || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    setSuccess("");
    setError("");
    const filteredUserFavorites = user?.favorite?.filter(fav => fav !== 'phobien') || [];
    const filteredValuesFavorites = values.favorite?.filter(fav => fav !== 'phobien') || [];

    const valuesString = JSON.stringify(filteredValuesFavorites);
    const userString = JSON.stringify(filteredUserFavorites);

    if (valuesString === userString) {
      setError("Hãy thay đổi ưa thích mới ưa thích trên đang được sử dụng.");
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

  const customStyles: StylesConfig<OptionType, true> = {
    multiValue: (provided, state) => {
      const { background, text } = getRandomColor();
      return {
        ...provided,
        backgroundColor: background,
        color: text,
      };
    },
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: "inherit",
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: "inherit",
      ":hover": {
        backgroundColor: "red",
        color: "white",
      },
    }),
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="favorite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chọn sở thích của bạn</FormLabel>
                <FormControl>
                  <Select
                    className=" text-slate-900"
                    isMulti
                    options={selectedOption}
                    value={selectedOption.filter((option) =>
                      field.value?.includes(option.value)
                    )}
                    onChange={(newValue) => {
                      field.onChange(newValue.map((option) => option.value));
                    }}
                    styles={customStyles}
                    isSearchable={false}
                    isDisabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormError message={error || form.formState.errors.favorite?.message} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};

export default FormFavorite;

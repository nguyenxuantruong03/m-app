"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Favorite } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import Recommend from "@/components/ui/recommend";
import { useTranslations } from "next-intl";

interface FavoriteProps {
  initialData: Favorite | null;
}

export const FavoriteForm: React.FC<FavoriteProps> = ({
  initialData,
}) => {
  const t = useTranslations()
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData
    ? t("favorite.form.editFavorite")
    : t('favorite.form.createFavorite');
  const description = initialData
    ? t("favorite.form.editAFavorite")
    : t('favorite.form.addNewFavorite');
  const action = initialData
    ? t("action.saveChange")
    : t("action.create");

  const formSchema = z.object({
    name: z.string().min(2, { message: t('favorite.form.minLength') }),
    value: z.optional(
      z.string().min(2, { message: t('favorite.form.minLength')  })
    ),
  });

  type FavoriteFormValues = z.infer<typeof formSchema>;

  const form = useForm<FavoriteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          value: initialData.value || "",
        }
      : {
          name: "",
          value: "",
        },
  });

  // Hàm chuyển đổi từ name sang value
  const getNameValue = (name: string): string => {
    return name.toLowerCase().replace(/\s/g, "");
  };
  // Hiệu chỉnh giá trị value dựa trên giá trị của name khi người dùng nhập
  useEffect(() => {
    const name = form.watch("name"); // Lấy giá trị của trường name từ form
    const value = getNameValue(name); // Chuyển đổi name thành value

    form.setValue("value", value); // Cập nhật giá trị của trường value trong form
  }, [form.watch("name")]);

  const onSubmit = async (data: FavoriteFormValues) => {
    try {
      setLoading(true);
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/favorite/${params.favoriteId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/favorite`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                {t('favorite.favorite')}
                <span className="font-bold">{response.data?.name}</span>{" "}
                {t("favorite.form.updated")}.
              </p>
            );
          } else {
            return (
              <p>
                {t("favorite.favorite")}{" "}
                <span className="font-bold">{data.name}</span>{" "}
                {t("favorite.form.created")}.
              </p>
            );
          }
        }),
        {
          loading: t("favorite.form.updatingFavorite"),
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/favorite`);
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return t("toastError.somethingWentWrong");
            }
          },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/favorite/${params.favoriteId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/favorite`);
      toast.success(t("favorite.form.favoriteDeleted"));
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(
          t("toastError.somethingWentWrong")
        );
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("name-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      {/* update and create */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {t('favorite.form.label')} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("favorite.form.favoriteTypesDescription")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name-input"
                      disabled={loading}
                      placeholder={t('favorite.form.enterLabel')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

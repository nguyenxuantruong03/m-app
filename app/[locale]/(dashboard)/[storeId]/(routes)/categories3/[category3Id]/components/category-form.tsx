"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Category } from "@prisma/client";
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

interface CategoryFormProps {
  initialData: Category | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const t = useTranslations()
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? t("category.form.editCategory") : t("category.form.createCategory");
  const description = initialData ? t("category.form.editCategoryDescription") : t("category.form.addNewCategory");
  const action = initialData ? t("action.saveChange") : t("action.create");

  const formSchema = z.object({
    name: z.string().min(2, { message: t("category.form.minLength") }),
  });
  
  type CategoryFormValues = z.infer<typeof formSchema>;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/categories3/${params.categoryId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/categories3`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                {t("category.form.category")}
                <span className="font-bold">{response.data?.name}</span>{" "}
                {t("category.form.updated")}.
              </p>
            );
          } else {
            return (
              <p>
                {t("category.form.category")} <span className="font-bold">{data.name}</span> {t("category.form.created")}.
              </p>
            );
          }
        }),
        {
          loading: t("category.form.updatingCategory"),
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/categories3`);
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
        `/api/${params.storeId}/categories3/${params.categoryId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories3`);
      toast.success(t("category.form.categoryDeleted"));
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
                    {t("category.form.name")} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("category.form.nameHint")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name-input"
                      disabled={loading}
                      placeholder={t("category.form.enterLabel")}
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

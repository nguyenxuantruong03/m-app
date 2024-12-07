"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
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
import { getCategoryForm } from "@/translate/translate-dashboard";

interface CategoryFormProps {
  initialData: Category | null;
  language: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  language,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //language
  const categoryFormMessage = getCategoryForm(language);

  const title = initialData
    ? categoryFormMessage.editCategory
    : categoryFormMessage.createCategory;
  const description = initialData
    ? categoryFormMessage.editCategoryDescription
    : categoryFormMessage.addNewCategory;
  const action = initialData
    ? categoryFormMessage.saveChanges
    : categoryFormMessage.create;

  const formSchema = z.object({
    name: z.string().min(2, { message: categoryFormMessage.minCharacters }),
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
          `/api/${params.storeId}/categories5/${params.category5Id}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/categories5`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                {categoryFormMessage.category}
                <span className="font-bold">{response.data?.name}</span>{" "}
                {categoryFormMessage.updated}.
              </p>
            );
          } else {
            return (
              <p>
                {categoryFormMessage.category}{" "}
                <span className="font-bold">{data.name}</span>{" "}
                {categoryFormMessage.created}.
              </p>
            );
          }
        }),
        {
          loading: categoryFormMessage.updatingCategory,
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/categories5`);
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
              return categoryFormMessage.error;
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
        `/api/${params.storeId}/categories5/${params.category5Id}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories5`);
      toast.success(categoryFormMessage.categoryDeleted);
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
        toast.error(categoryFormMessage.error);
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        languageToUse={language}
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
                    {categoryFormMessage.name}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={categoryFormMessage.nameHint} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={categoryFormMessage.enterLabel}
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

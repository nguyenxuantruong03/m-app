"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Check, Trash } from "lucide-react";
import { ImageBillboard } from "@prisma/client";
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
import Image from "next/image";
import Recommend from "@/components/ui/recommend";
import { useTranslations } from "next-intl";

interface BillboardFormProps {
  initialData: ImageBillboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const t = useTranslations()
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData
    ? t("imagebillboard.form.editImageBillboard")
    : t("imagebillboard.form.createImageBillboard");
  const description = initialData
    ? t("imagebillboard.form.editAImageBillboard")
    : t("imagebillboard.form.addNewImageBillboard");
  const action = initialData
    ? t("action.saveChange")
    : t("action.create");

  const formSchema = z.object({
    label: z.string().min(4, { message: t("imagebillboard.form.minLength") }),
    description: z
      .string()
      .min(4, { message: t("imagebillboard.form.minLength") }),
    url: z.string().min(4, { message: t("imagebillboard.form.minLength") }),
    link: z.string().min(4, { message: t("imagebillboard.form.minLength") }),
  });

  type BillboardFormValues = z.infer<typeof formSchema>;

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: initialData?.label ?? "",
      description: initialData?.description ?? "",
      url: initialData?.url ?? "",
      link: initialData?.link ?? "/home-product",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      let promise;
      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/imagebillboards/${params.imagebillboardId}`,
          data
        );
      }

      const response = await promise;

      let message: React.ReactNode;
      if (initialData) {
        message = (
          <p>
            {t("imagebillboard.form.imageBillboard")}{" "}
            <span className="font-bold">{response?.data.label}</span>{" "}
            {t("imagebillboard.form.updated")}.
          </p>
        );
      }

      let image: React.ReactNode;
      if (initialData) {
        image = (
          <Image
            className="rounded-full"
            src={response?.data.url}
            alt=""
            width="50"
            height="50"
          />
        );
      }

      let title: React.ReactNode;
      if (initialData) {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
              {t("imagebillboard.form.imageBillboardUpdated")}
            </p>
          </div>
        );
      }
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } border-2 border-green-500 max-w-3xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-2">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">{image}</div>
              <div className="ml-3 flex-1">
                <p>{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              t("action.close")
            </button>
          </div>
        </div>
      ));
      router.refresh();
      router.push(`/${params.storeId}/image-billboards`);
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `/api/${params.storeId}/image-billboards/${params.billboardId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/image-billboards`);
      toast.success(t("imagebillboard.form.imageBillboardDeleted"));
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("label-input");
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {t("imagebillboard.form.label")}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("imagebillboard.form.enterLabel")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="label-input"
                      disabled={loading}
                      placeholder={
                        t("imagebillboard.form.enterLabelPlaceholder")
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {t("imagebillboard.form.description")}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={t("imagebillboard.form.enterDescription")}
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        t("imagebillboard.form.enterDescriptionPlaceholder")
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {t("imagebillboard.form.link")}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("imagebillboard.form.enterLink")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={
                        t("imagebillboard.form.enterLinkPlaceholder")
                      }
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

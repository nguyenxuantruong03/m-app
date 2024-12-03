"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Check, Trash } from "lucide-react";
import { Billboard, ImageBillboard } from "@prisma/client";
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
import ImageUpload from "@/components/ui/image-upload";
import Image from "next/image";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
import Recommend from "@/components/ui/recommend";
import { getBillboardForm } from "@/translate/translate-dashboard";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

interface BillboardFormProps {
  initialData:
    | (Billboard & {
        imagebillboard: ImageBillboard[];
      })
    | null;
  language: string;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
  language,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //language
  const billboardFormMessage = getBillboardForm(language);

  const title = initialData
    ? billboardFormMessage.editBillboard
    : billboardFormMessage.createBillboard;
  const description = initialData
    ? billboardFormMessage.editBillboardDescription
    : billboardFormMessage.addNewBillboard;
  const action = initialData
    ? billboardFormMessage.saveChanges
    : billboardFormMessage.create;

  const formSchema = z.object({
    label: z.string().min(2, { message: billboardFormMessage.minLength }),
    description: z.string().min(2, { message: billboardFormMessage.minLength }),
    imagebillboard: z.object({ url: z.string() }).array(),
  });

  type BillboardFormValues = z.infer<typeof formSchema>;

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      description: "",
      imagebillboard: [],
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      let promise;
      let imageUrl: string[] = [];
      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
        imageUrl = data.imagebillboard?.map((item) => item.url) || [];
      } else {
        promise = axios.post(`/api/${params.storeId}/billboards`, data);
        imageUrl = data.imagebillboard?.map((item) => item.url) || [];
      }

      const response = await promise;

      let message: React.ReactNode;
      if (initialData) {
        message = (
          <p>
            {billboardFormMessage.billboard}{" "}
            <span className="font-bold">{response?.data.label}</span>{" "}
            {billboardFormMessage.updatedOther}.
          </p>
        );
      } else {
        message = (
          <p>
            {billboardFormMessage.billboard}{" "}
            <span className="font-bold">{data.label}</span>{" "}
            {billboardFormMessage.createdOther}.
          </p>
        );
      }

      let title: React.ReactNode;
      if (initialData) {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
              {billboardFormMessage.updated}
            </p>
            <span className="text-gray-500">
              {response.data?.createdAt
                ? format(
                    utcToZonedTime(
                      new Date(new Date(response.data?.createdAt)),
                      vietnamTimeZone
                    ),
                    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                    { locale: viLocale }
                  )
                : null}
            </span>
          </div>
        );
      } else {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-4 h-4 rounded-full bg-green-500 text-white mx-1" />
              {billboardFormMessage.created}
            </p>
            <span className="text-gray-500">
              {response.data?.createdAt
                ? format(
                    utcToZonedTime(
                      new Date(new Date(response.data?.createdAt)),
                      vietnamTimeZone
                    ),
                    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                    { locale: viLocale }
                  )
                : null}
            </span>
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
              <div className="flex-shrink-0 pt-0.5">
                {imageUrl.slice(0, 10).map((url, index) => (
                  <span
                    key={index}
                    className="avatar-overlapping-multiple-image"
                  >
                    <Image
                      className="avatar-image-overlapping-multiple-image rounded-full"
                      src={url}
                      alt=""
                      width="50"
                      height="50"
                    />
                  </span>
                ))}
              </div>
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
              {billboardFormMessage.close}
            </button>
          </div>
        </div>
      ));
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
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
        toast.error(billboardFormMessage.somethingWentWrong);
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(billboardFormMessage.deleted);
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
        toast.error(billboardFormMessage.somethingWentWrong);
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
          <FormField
            control={form.control}
            name="imagebillboard"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex space-x-3 items-center">
                  {billboardFormMessage.image}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                  <Recommend message={billboardFormMessage.imageNote} />
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                    language={language}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {billboardFormMessage.label}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={billboardFormMessage.labelRecommend} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={billboardFormMessage.labelPlaceholder}
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
                    {billboardFormMessage.description}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={billboardFormMessage.descriptionRecommend}
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={billboardFormMessage.descriptionPlaceholder}
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

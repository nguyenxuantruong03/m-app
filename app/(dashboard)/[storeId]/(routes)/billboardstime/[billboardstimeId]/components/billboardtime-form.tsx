"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Check, Trash } from "lucide-react";
import { BillboardTime, ImageBillboardTime } from "@prisma/client";
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
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

const formSchema = z.object({
  label: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  timeout: z.coerce.number().min(10,{message: "Nhập ít nhất tối thiểu 10."}),
  imagebillboardtime: z.object({ url: z.string() }).array(),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData:
    | (BillboardTime & {
        imagebillboardtime: ImageBillboardTime[];
      })
    | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard." : "Add a new billboard";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      timeout: 0 || undefined,
      imagebillboardtime: [],
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      let promise;
      let imageUrl: string[] = []; 

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/billboardstime/${params.billboardstimeId}`,
          data
        );
        imageUrl = data.imagebillboardtime?.map((item) => item.url) || [];
      } else {
        promise = axios.post(`/api/${params.storeId}/billboardstime`, data);
        imageUrl = data.imagebillboardtime?.map((item) => item.url) || [];
      }

      const response = await promise;

      let message:React.ReactNode;
      if (initialData) {
        message = (
          <p>
            Billboardtime <span className="font-bold">{response?.data.label}</span> updated. Thời gian: <span className="font-bold">{data.timeout}</span>.
          </p>
        );
      } else {
        message = (
          <p>
            Billboardtime <span className="font-bold">{data.label}</span> created. Thời gian: <span className="font-bold">{data.timeout}</span>.
          </p>
        );
      }

      let title:React.ReactNode;
      if (initialData) {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
              Billboardtime updated!
            </p>
            <span className="text-gray-500">
              {response?.data.createdAt
                ? format(
                    utcToZonedTime(
                      new Date(new Date(response?.data.createdAt)),
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
              Billboardtime created!
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
                      className="avatar-image-overlapping-multiple-image"
                      src={url}
                      alt=""
                      width={40}
                      height={40}
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
              Close
            </button>
          </div>
        </div>
      ));
      router.refresh();
      router.push(`/${params.storeId}/billboardstime`);
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data.error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error((error as { response: { data: { error: string } } }).response.data.error);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboardstime/${params.billboardstimeId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/billboardstime`);
      toast.success("Billboard deleted.");
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data.error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error((error as { response: { data: { error: string } } }).response.data.error);
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(
          "Make sure you removed all categories using this billboard first."
        );
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
            name="imagebillboardtime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh(Chỉ thêm 10 ảnh)</FormLabel>
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
                  <FormLabel>Nhãn</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời gian</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Billboard timeout ..."
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

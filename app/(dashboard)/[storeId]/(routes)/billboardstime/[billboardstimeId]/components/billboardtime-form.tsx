"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { BillboardTime, ImageBillboardTime } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
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

const formSchema = z.object({
  label: z.string().min(1),
  timeout: z.coerce.number().min(1),
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
  const toastMessage = initialData
    ? "Billboard updated."
    : "Billboard created.";
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
      //inittialData có nghĩa là khi dữ diệu ban đầu có nó sẽ đổi nut button thành save change
      /* Khối mã chịu trách nhiệm thực hiện yêu cầu HTTP để cập nhật bảng quảng cáo hiện có
      hoặc tạo bảng quảng cáo mới dựa trên giá trị của `initialData`. */
      if (initialData) {
        /* Mã `đang chờ axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,
         data);` đang gửi yêu cầu PATCH đến điểm cuối API được chỉ định cùng với dữ liệu được cung cấp. Nó
         đang cập nhật một bảng quảng cáo hiện có với `billboardId` đã cho trong đối tượng `params`. Các
         Đối tượng `data` chứa các giá trị được cập nhật cho bảng quảng cáo. */
        await axios.patch(
          `/api/${params.storeId}/billboardstime/${params.billboardstimeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboardstime`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboardstime`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
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
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
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

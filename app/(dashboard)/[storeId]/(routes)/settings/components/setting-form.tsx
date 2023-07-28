"use client"

import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from 'react-hot-toast';
import  axios  from 'axios';
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/app/hooks/use-origin";

interface SettingFormProps {
    initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingFormValues = z.infer<typeof formSchema>;

export const SettingsForm:React.FC<SettingFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingFormValues>({
    /* Dòng `resolver: zodResolver(formSchema)` đang thiết lập trình phân giải biểu mẫu cho
         thư viện biểu mẫu phản ứng-hook. */
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
        setLoading(true);
        await axios.patch(`/api/stores/${params.storeId}`,data)
        router.refresh()
        toast.success("Store updated")
    } catch (error) {
        toast.error("Something went wrong")
    }finally{
        setLoading(false)
    }
  };

  const onDelete = async () => {
    try {
        setLoading(true)
        await axios.delete(`api/stores/${params.storeId}`)
        router.refresh()
        router.push('/')
        toast.success("store deleted")
    } catch (error) {
        toast.error("Something went wrong")
    }finally{
        setLoading(false)
        setOpen(false)
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
      <div className="flex items-center justify-between">
        <Heading title="Cài đặt" description="Quản lý cửa hàng" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Tên cửa hàng" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
            <Button disabled={loading} className="ml-auto" type="submit">
                Lưu thay đổi
            </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert 
      title="NEXT_PUBLIC_API_URL"
      description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

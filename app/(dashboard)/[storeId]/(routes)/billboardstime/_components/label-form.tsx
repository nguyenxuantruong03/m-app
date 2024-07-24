import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../../../../../../components/ui/button";
import { Input } from "../../../../../../components/ui/input";
import toast from "react-hot-toast";
import { useState } from "react";

interface LabelFormPorps {
  data: string;
  id: string;
  label: string;
  imagebillboardtime: { url: string }[];
  description: string;
  setOpen: (open: boolean) => void;
  timeout: number;
  end: number | null;
  isTimeout: boolean | null;
  field: "label" | "timeout" | "description";
}

const formSchema = z.object({
  label: z.optional(z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })),
  description: z.optional(
    z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })
  ),
  imagebillboardtime: z.object({ url: z.string() }).array(),
  timeout: z.optional(
    z.coerce.number().min(0, { message: "Hãy nhập ít nhất 1." })
  ),
  end: z.optional(z.coerce.number().min(0, { message: "Hãy nhập ít nhất 1." })),
  isTimeout: z.boolean().default(false).optional(),
});
type FormValues = z.input<typeof formSchema>;

const LabelForm: React.FC<LabelFormPorps> = ({
  data,
  id,
  imagebillboardtime,
  setOpen,
  timeout,
  label,
  description,
  end,
  isTimeout,
  field,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: label || "",
      description: description || "",
      imagebillboardtime: imagebillboardtime || [],
      timeout: timeout || 0,
      end: end || 0,
      isTimeout: isTimeout || false,
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/billboardstime/${id}`, datas);
      setLoading(false);
      setOpen(false);
      toast.success("Cập nhật thành công!");
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
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {field === "label" && (
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên sản phẩm <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập tên ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {field === "description" && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Mô tả <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập mô tả ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {field === "timeout" && (
          <FormField
            control={form.control}
            name="timeout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Thời gian <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Enter timeout ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button disabled={loading} className="ml-auto" type="submit">
          Save Change
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

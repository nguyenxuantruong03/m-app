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
  name: string;
  taxcode: string | null;
  taxbehavior: string;
  amount: number;
  unitmin: string;
  valuemin: number;
  unitmax: string;
  valuemax: number;
  active: boolean | null;
  field: "name"
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  name: z
  .string()
  .min(1, { message: "Bắt buộc nhập name." })
  .nullable()
  .optional(),
  taxcode: z
  .string()
  .min(1, { message: "Bắt buộc nhập taxcode." })
  .nullable()
  .optional(),
  taxbehavior: z
  .string()
  .min(1, { message: "Bắt buộc nhập taxbehavior." })
  .nullable()
  .optional(),
  amount: z.optional(z.coerce.number().min(500,{message: "Hãy nhập giá ít nhất 500đ."})),
  unitmin: z
  .string()
  .min(1, { message: "Bắt buộc nhập unitmin." })
  .nullable()
  .optional(),
  valuemin: z.optional(z.coerce.number().min(1,{message: "Hãy nhập valumin."})),
  unitmax: z
  .string()
  .min(1, { message: "Bắt buộc nhập unitmin." })
  .nullable()
  .optional(),
  valuemax:  z.optional(z.coerce.number().min(1,{message: "Hãy nhập valuemax."})),
  active: z.boolean().default(false).nullable().optional(),
});
type FormValues = z.input<typeof formSchema>;

const LabelForm: React.FC<LabelFormPorps> = ({
  data,
  id,
  name,
  taxcode,
  taxbehavior,
  amount,
  unitmin,
  valuemin,
  unitmax,
  valuemax,
  active,
  field,
  setOpen,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      taxcode: taxcode || "",
      taxbehavior: taxbehavior || "",
      amount: amount || 0,
      unitmin: unitmin || "",
      valuemin: valuemin || 0,
      unitmax: unitmax || "",
      valuemax: valuemax || 0,
      active: active || false,
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/shippingrates/${id}`, datas);
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
        {field === "name" && (
          <FormField
            control={form.control}
            name="name"
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
                    value={field.value || ""}
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

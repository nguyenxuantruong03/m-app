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
import { useState,useEffect } from "react";

interface LabelFormPorps {
  data: string;
  id: string;
  value: string | null
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Nhập ít nhất 2 ký tự." }),
  value: z.optional(z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })),
});
type FormValues = z.input<typeof formSchema>;

const LabelForm: React.FC<LabelFormPorps> = ({ data, id,setOpen,value }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data || "",
      value: value ||""
    },
  });

  // Hàm chuyển đổi từ name sang value
  const getNameValue = (name: string): string => {
    return name.toLowerCase().replace(/\s/g, '');
  };
  // Hiệu chỉnh giá trị value dựa trên giá trị của name khi người dùng nhập
  useEffect(() => {
    const name = form.watch("name"); // Lấy giá trị của trường name từ form
    const value = getNameValue(name); // Chuyển đổi name thành value

    form.setValue("value", value); // Cập nhật giá trị của trường value trong form
  }, [form.watch("name")]);

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/favorite/${id}`, datas);
      setLoading(false);
      setOpen(false)
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="ml-auto" type="submit">
          Save Change
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

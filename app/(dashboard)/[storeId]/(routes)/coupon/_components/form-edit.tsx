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
import {useState } from "react";

interface LabelFormProps {
  setOpen: (open: boolean) => void;
  data: string | number | null;
  id: string;
  name: string | null;
  percent: number | null;
  durationinmoth: number | null;
  duration: string | null;
  maxredemptions: number | null;
  redeemby: Date | null;
  imagecoupon: { url: string }[];
  field: "name";
}

const formSchema = z.object({
  name: z.optional(z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })),
  duration: z.optional(z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })),
  percent: z.optional(
    z.coerce.number().min(5, { message: "Hãy nhập ít nhất 5%." })
  ),
  durationinmoth: z.optional(
    z.coerce.number().min(0, { message: "Hãy nhập ít nhất 1%." })
  ),
  maxredemptions: z.optional(
    z.coerce.number().min(5, { message: "Hãy nhập ít nhất 5%." })
  ),
  redeemby: z.optional(z.date()),
  imagecoupon: z.object({ url: z.string() }).array(),
});
type FormValues = z.input<typeof formSchema>;

const LabelForm: React.FC<LabelFormProps> = ({
  data,
  id,
  name,
  field,
  percent,
  durationinmoth,
  duration,
  maxredemptions,
  redeemby,
  imagecoupon,
  setOpen,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      duration: duration || "",
      percent: percent || 0,
      durationinmoth: durationinmoth || 0,
      maxredemptions: maxredemptions || 0,
      redeemby: redeemby || new Date(),
      imagecoupon: imagecoupon || [],
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/coupon/${id}`, datas);
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

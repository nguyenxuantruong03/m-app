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
import { getCouponFormEdit } from "@/translate/translate-dashboard";

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
  language: string;
}

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
  language,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  //language
  const couponFormEditMessage = getCouponFormEdit(language);

  const formSchema = z.object({
    name: z.optional(
      z.string().min(2, { message: couponFormEditMessage.minLength })
    ),
    duration: z.optional(
      z.string().min(2, { message: couponFormEditMessage.minLength })
    ),
    percent: z.optional(
      z.coerce.number().min(1, { message: couponFormEditMessage.minPercentage })
    ),
    durationinmoth: z.optional(
      z.coerce.number().min(0, { message: couponFormEditMessage.minMonth })
    ),
    maxredemptions: z.optional(
      z.coerce.number().min(1, { message: couponFormEditMessage.minPerson })
    ),
    redeemby: z.optional(z.date()),
    imagecoupon: z.object({ url: z.string() }).array(),
  });
  type FormValues = z.input<typeof formSchema>;

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
      toast.success(couponFormEditMessage.updateSuccess);
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
        toast.error(couponFormEditMessage.somethingWentWrong);
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
                  {couponFormEditMessage.productName}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={couponFormEditMessage.enterProductName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button disabled={loading} className="ml-auto" type="submit">
          {couponFormEditMessage.saveChange}
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

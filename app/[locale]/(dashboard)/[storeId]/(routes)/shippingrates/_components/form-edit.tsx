import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations()
  const router = useRouter()
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z
    .string()
    .min(2, { message: t("shippingrate.form.requiredName") })
    .nullable()
    .optional(),
    taxcode: z
    .string()
    .min(1, { message: t("shippingrate.form.requiredTaxcode") })
    .nullable()
    .optional(),
    taxbehavior: z
    .string()
    .min(1, { message: t("shippingrate.form.requiredTaxbehavior") })
    .nullable()
    .optional(),
    amount: z.optional(z.coerce.number().min(500,{message: t("shippingrate.form.enterMinPrice")})),
    unitmin: z
    .string()
    .min(1, { message: t("shippingrate.form.requiredUnitmin") })
    .nullable()
    .optional(),
    valuemin: z.optional(z.coerce.number().min(1,{message: t("shippingrate.form.enterValumin")})),
    unitmax: z
    .string()
    .min(1, { message: t("shippingrate.form.requiredUnitmax") })
    .nullable()
    .optional(),
    valuemax:  z.optional(z.coerce.number().min(1,{message: t("shippingrate.form.enterValuemax")})),
    active: z.boolean().default(false).nullable().optional(),
  });
  type FormValues = z.input<typeof formSchema>;

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
      router.refresh()
      toast.success(t("shippingrate.form.updateSuccess"));
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
                  {t("shippingrate.form.productName")} <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t("shippingrate.form.enterName")}
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
        {t("action.saveChange")}
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

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
  data: string | null;
  id: string;
  name: string;
  description: string;
  percentage: number;
  inclusive: boolean;
  active: boolean;
  taxtype: string | null;
  field: "name" | "description";
  setOpen: (open: boolean) => void;
}

const LabelForm: React.FC<LabelFormPorps> = ({
  data,
  id,
  name,
  description,
  percentage,
  inclusive,
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
      .min(2, { message: t("taxrate.form.requiredName") })
      .nullable()
      .optional(),
    taxtype: z
      .string()
      .min(1, { message: t("taxrate.form.requiredTaxtype") })
      .nullable()
      .optional(),
    description: z
      .string()
      .min(2, { message: t('taxrate.form.requiredDescription') })
      .nullable()
      .optional(),
    percentage: z.optional(
      z.coerce
        .number()
        .min(1, { message: t("taxrate.form.enterMinPrice") })
    ),
    inclusive: z.boolean().default(false).nullable().optional(),
    active: z.boolean().default(false).nullable().optional(),
  });
  type FormValues = z.input<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      description: description || "",
      percentage: percentage || 0,
      inclusive: inclusive || false,
      active: active || false,
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/taxrate/${id}`, datas);
      setLoading(false);
      setOpen(false);
      router.refresh()
      toast.success(t('taxrate.form.updateSuccess'));
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
                  {t("taxrate.form.productName")}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t("taxrate.form.enterName")}
                    {...field}
                    value={field.value || ""}
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
                  {t("taxrate.form.taxDescription")}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t("taxrate.form.enterTaxDescription")}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
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

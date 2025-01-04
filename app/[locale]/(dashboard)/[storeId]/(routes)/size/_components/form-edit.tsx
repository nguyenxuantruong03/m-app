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
  value: string;
  field: "name" | "value";
  setOpen: (open: boolean) => void;
}

const LabelForm: React.FC<LabelFormPorps> = ({
  data,
  field,
  id,
  setOpen,
  name,
  value,
}) => {
  const t = useTranslations()
  const router = useRouter()
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: t("size.form.requiredName") }),
    value: z.optional(
      z.string().min(1, { message: t("size.form.requiredMinLength") })
    ),
  });
  type FormValues = z.input<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      value: value || "",
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/size/${id}`, datas);
      setLoading(false);      
      setOpen(false);
      router.refresh()
      toast.success(t("size.form.updateSuccess"));
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
                  {t("size.form.productName")}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t("size.form.enterName")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {field === "value" && (
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("size.form.value")}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t("size.form.valuePlaceholder")}
                    {...field}
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

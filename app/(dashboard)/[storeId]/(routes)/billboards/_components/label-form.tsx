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
import { getBillboardLabelFormSheet } from "@/translate/translate-dashboard";

interface LabelFormPorps {
  data: string;
  description: string;
  id: string;
  label: string;
  field: string;
  imagebillboard: { url: string }[];
  setOpen: (open: boolean) => void;
  language: string;
}

const LabelForm: React.FC<LabelFormPorps> = ({
  data,
  id,
  imagebillboard,
  setOpen,
  description,
  field,
  label,
  language,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  //language
  const billboardLabelFormSheetMessage = getBillboardLabelFormSheet(language);

  const formSchema = z.object({
    label: z
      .string()
      .min(2, { message: billboardLabelFormSheetMessage.minLength }),
    description: z
      .string()
      .min(2, { message: billboardLabelFormSheetMessage.minLength }),
    imagebillboard: z.object({ url: z.string() }).array(),
  });
  type FormValues = z.input<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: label || "",
      description: description || "",
      imagebillboard: imagebillboard || [],
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/billboards/${id}`, datas);
      setLoading(false);
      setOpen(false);
      toast.success(billboardLabelFormSheetMessage.updateSuccess);
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
        toast.error(billboardLabelFormSheetMessage.somethingWentWrong);
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
                  {billboardLabelFormSheetMessage.productName}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={
                      billboardLabelFormSheetMessage.enterProductName
                    }
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
                  {billboardLabelFormSheetMessage.description}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={
                      billboardLabelFormSheetMessage.enterDescription
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button disabled={loading} className="ml-auto" type="submit">
          {billboardLabelFormSheetMessage.saveChanges}
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

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
import { Textarea } from "@/components/ui/textarea";
import { translateSentEmailEditForm } from "@/translate/translate-dashboard";

interface LabelFormPorps {
  data: string | null;
  id: string;
  subject: string;
  description: string;
  field: "subject" | "description";
  setOpen: (open: boolean) => void;
  language: string;
}

const LabelForm: React.FC<LabelFormPorps> = ({
  data,
  id,
  subject,
  description,
  field,
  setOpen,
  language,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  //language
  const sentEmailEditFormMessage = translateSentEmailEditForm(language);

  const formSchema = z.object({
    subject: z
      .string()
      .min(1, { message: sentEmailEditFormMessage.requiredName })
      .nullable()
      .optional(),
    description: z
      .string()
      .min(1, { message: sentEmailEditFormMessage.requiredDescription })
      .nullable()
      .optional(),
  });
  type FormValues = z.input<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: subject || "",
      description: description || "",
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/sentmailuser/${id}`, datas);
      setLoading(false);
      setOpen(false);
      toast.success(sentEmailEditFormMessage.updateSuccess);
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
        toast.error(sentEmailEditFormMessage.somethingWentWrong);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {field === "subject" && (
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {sentEmailEditFormMessage.subject}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={sentEmailEditFormMessage.enterSubject}
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

        {field === "description" && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {sentEmailEditFormMessage.taxDescription}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder={sentEmailEditFormMessage.enterTaxDescription}
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
          {sentEmailEditFormMessage.saveChange}
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

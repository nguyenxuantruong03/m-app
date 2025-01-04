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
import unorm from "unorm";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

//Loại bỏ dấu
const removeDiacritics = (str: String) => {
  return unorm.nfd(str).replace(/[\u0300-\u036f]/g, "");
};

interface LabelFormProps {
  setOpen: (open: boolean) => void;
  id: string;
  name: string;
  heading: string;
  description: string;
  data: string;
  isFeatured: boolean;
  isArchived: boolean;
  productdetailId: string;
  imagesalientfeatures: { url: string }[];
  images: { url: string }[];
  field: "heading" | "description";
}

const LabelForm: React.FC<LabelFormProps> = ({
  data,
  id,
  name,
  field,
  heading,
  description,
  isFeatured,
  productdetailId,
  isArchived,
  imagesalientfeatures,
  images,
  setOpen,
}) => {
  const t = useTranslations()
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z.optional(
      z.string().min(2, { message: t("product.form.minCharacters") })
    ),
    heading: z.optional(
      z.string().min(2, { message: t("product.form.minCharacters") })
    ),
    description: z.optional(
      z.string().min(2, { message: t("product.form.minCharacters") })
    ),
    productdetailId: z
      .string()
      .min(1, { message: t("product.form.selectProductDetail") }),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
    imagesalientfeatures: z.object({ url: z.string() }).array(),
    images: z.object({ url: z.string() }).array(),
  });
  type FormValues = z.input<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      heading: heading || "",
      description: description || "",
      productdetailId: productdetailId || "",
      isFeatured: isFeatured || false,
      isArchived: isArchived || false,
      images: images || [],
      imagesalientfeatures: imagesalientfeatures || [],
    },
  });

  // Event handler to update the 'name' field based on the 'heading' field
  const updateNameFromHeading = (heading: string) => {
    const formattedName = removeDiacritics(heading)
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

    form.setValue("name", formattedName);
  };

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/product/${id}`, datas);
      setLoading(false);
      setOpen(false);
      router.refresh();
      toast.success(t("product.form.updateSuccess"));
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {field === "heading" && (
          <FormField
            control={form.control}
            name="heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("product.form.productName")}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={t("product.form.enterProductName")}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      updateNameFromHeading(e.target.value);
                    }}
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
                  {t("product.form.description")}{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder={t("product.form.enterDescription")}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      updateNameFromHeading(e.target.value);
                    }}
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

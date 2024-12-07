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
import { Button } from "../../../../../../components/ui/button";
import { Input } from "../../../../../../components/ui/input";
import toast from "react-hot-toast";
import { useState } from "react";
import unorm from "unorm";
import { getProductFormEdit } from "@/translate/translate-dashboard";

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
  productdetail: string;
  data: string;
  isFeatured: boolean;
  isArchived: boolean;
  productdetailId: string;
  imagesalientfeatures: { url: string }[];
  images: { url: string }[];
  field: "heading";
  language: string;
}

const LabelForm: React.FC<LabelFormProps> = ({
  data,
  id,
  name,
  field,
  heading,
  description,
  productdetail,
  isFeatured,
  productdetailId,
  isArchived,
  imagesalientfeatures,
  images,
  setOpen,
  language
}) => {
  const router = useRouter()
  const params = useParams();
  const [loading, setLoading] = useState(false);

  //language
  const productFormEditMessage = getProductFormEdit(language)

  const formSchema = z.object({
    name: z.optional(z.string().min(2, { message: productFormEditMessage.minCharacters })),
    heading: z.optional(z.string().min(2, { message: productFormEditMessage.minCharacters })),
    description: z.optional(
      z.string().min(2, { message: productFormEditMessage.minCharacters })
    ),
    productdetailId: z.string().min(1, { message: productFormEditMessage.selectProductDetail }),
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
      await axios.patch(`/api/${params.storeId}/product1/${id}`, datas);
      setLoading(false);
      setOpen(false);
      router.refresh()
      toast.success(productFormEditMessage.updateSuccess);
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
        toast.error(productFormEditMessage.error);
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
                  {productFormEditMessage.productName} <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={productFormEditMessage.enterProductName}
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
        {productFormEditMessage.saveChanges}
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

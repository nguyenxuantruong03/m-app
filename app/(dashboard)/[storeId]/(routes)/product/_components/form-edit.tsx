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
import unorm from "unorm";

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
}

const formSchema = z.object({
  name: z.optional(z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })),
  heading: z.optional(z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })),
  description: z.optional(
    z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })
  ),
  productdetailId: z.string().min(1, { message: "Hãy chọn 1 ProductDetail." }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  imagesalientfeatures: z.object({ url: z.string() }).array(),
  images: z.object({ url: z.string() }).array(),
});
type FormValues = z.input<typeof formSchema>;

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
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
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
        {field === "heading" && (
          <FormField
            control={form.control}
            name="heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên sản phẩm <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập tên sản phẩm ..."
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
          Save Change
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

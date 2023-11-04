"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import {
  Category,
  Product,
  Image,
  Size,
  Color,
  Imagesalientfeatures,
} from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1),
  heading: z.string().min(1),
  description: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  percentpromotion: z.coerce.number().min(1),
  promotionheading: z.string().min(1),
  promotiondescription: z.string().min(1),
  guaranteeheading: z.coerce.number().min(1),
  guaranteedescription: z.coerce.number().min(1),
  guaranteeinfomation: z.coerce.number().min(1),
  guaranteeprice: z.coerce.number().min(1),
  // Specification
  descriptionspecifications: z.string().min(1),
  valuespecifications: z.string().min(1),
  description2specifications: z.string().min(1),
  value2specifications: z.string().min(1),
  description3specifications: z.string().min(1),
  value3specifications: z.string().min(1),
  description4specifications: z.string().min(1),
  value4specifications: z.string().min(1),
  description5specifications: z.string().min(1),
  value5specifications: z.string().min(1),
  description6specifications: z.string().min(1),
  value6specifications: z.string().min(1),
  description7specifications: z.string().min(1),
  value7specifications: z.string().min(1),
  description8specifications: z.string().min(1),
  value8specifications: z.string().min(1),
  description9specifications: z.string().min(1),
  value9specifications: z.string().min(1),
  description10specifications: z.string().min(1),
  value10specifications: z.string().min(1),
  description11specifications: z.string().min(1),
  value11specifications: z.string().min(1),
  description12specifications: z.string().min(1),
  value12specifications: z.string().min(1),
  description13specifications: z.string().min(1),
  value13specifications: z.string().min(1),
  description14specifications: z.string().min(1),
  value14specifications: z.string().min(1),
  // salientfeatures:
  descriptionsalientfeatures: z.string().min(1),
  description2salientfeatures: z.string().min(1),
  description3salientfeatures: z.string().min(1),
  description4salientfeatures: z.string().min(1),
  contentsalientfeatures: z.string().min(1),
  imagesalientfeatures: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  categoryId: z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        imagesalientfeatures: Imagesalientfeatures[];
      })
    | null;

  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
          percentpromotion: parseFloat(String(initialData?.percentpromotion)),
          guaranteeheading: parseFloat(String(initialData?.guaranteeheading)),
          guaranteedescription: parseFloat(
            String(initialData?.guaranteedescription)
          ),
          guaranteeinfomation: parseFloat(
            String(initialData?.guaranteeinfomation)
          ),
          guaranteeprice: parseFloat(String(initialData?.guaranteeprice)),
        }
      : {
          name: "",
          images: [],
          heading: "",
          description: "",
          price: 0,
          percentpromotion: 0,
          guaranteeheading: 0,
          guaranteedescription: 0,
          guaranteeinfomation: 0,
          guaranteeprice: 0,
          imagesalientfeatures: [],
          isFeatured: false,
          isArchived: false,
          sizeId: "",
          colorId: "",
          categoryId: "",
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      //inittialData có nghĩa là khi dữ diệu ban đầu có nó sẽ đổi nut button thành save change
      /* Khối mã chịu trách nhiệm thực hiện yêu cầu HTTP để cập nhật bảng quảng cáo hiện có
      hoặc tạo bảng quảng cáo mới dựa trên giá trị của `initialData`. */
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/product1/${params.product1Id}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/product1`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/product1`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/product1/${params.product1Id}`
      );
      router.refresh();
      router.push(`/${params.storeId}/product1`);
      toast.success("Product deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all product using this product first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      {/* update and create */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh sản phẩm</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imagesalientfeatures"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh mô tả sản phẩm (Chỉ thêm 2 ảnh)</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-4 gap-6 overflow-y-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên(URL)không ghi hoa hoặc cách</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên URL ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên sản phẩm ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên mô tả ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá tiền</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Nhập giá tiền ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="percentpromotion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phần trăm khuyến mãi </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Nhập phần trăm khuyến mãi ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="promotionheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khuyến mãi sỉ</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập khuyến mãi sỉ ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="promotiondescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khuyến mãi thầu</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập khuyến mãi thầu ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guaranteeheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá tiền bảo hành</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Nhập giá tiền bảo hành ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guaranteedescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá tiền bảo hành</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Nhập giá tiền bảo hành ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guaranteeinfomation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá tiền bảo hành</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Nhập giá tiền bảo hành ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guaranteeprice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá tiền bảo hành</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Nhập giá tiền bảo hành ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="descriptionspecifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="valuespecifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description2specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value2specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description3specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value3specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description4specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value4specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description5specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value5specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description6specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value6specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description7specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value7specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description8specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value8specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description9specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value9specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description10specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value10specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description11specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value11specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description12specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value12specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description13specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value13specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description14specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="value14specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung thông số</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung thông số ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="descriptionsalientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả tính năng nổi bật</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập mô tả tính năng nổi bật ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description2salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả tính năng nổi bật</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập mô tả tính năng nổi bật ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description3salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả tính năng nổi bật</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập mô tả tính năng nổi bật ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description4salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả tính năng nổi bật</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập mô tả tính năng nổi bật ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="contentsalientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung tính năng nổi bật</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập nội dung tính năng nổi bật ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Màu</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kích cỡ</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((categorie) => (
                        <SelectItem key={categorie.id} value={categorie.id}>
                          {categorie.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Hiển thị trang chủ</FormLabel>
                    <FormDescription>
                    Sản phẩm này sẽ xuất hiện trên trang chủ
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Hết hàng</FormLabel>
                    <FormDescription>
                        Sản phẩm sẽ bị ẩn 
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};


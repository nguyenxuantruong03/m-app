"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import {
  Product,
  Image,
  Imagesalientfeatures,
  ProductDetail,
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
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import unorm from "unorm";

//Loại bỏ dấu
const removeDiacritics = (str: String) => {
  return unorm.nfd(str).replace(/[\u0300-\u036f]/g, "");
};

const formSchema = z.object({
  name: z.string().min(1),
  heading: z.string().min(1),
  description: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  percentpromotion: z.coerce.number().min(1),
  imagesalientfeatures: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  productdetailId: z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        imagesalientfeatures: Imagesalientfeatures[];
      })
    | null;

  productDetail: ProductDetail[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  productDetail,
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
        }
      : {
          name: "",
          images: [],
          heading: "",
          description: "",
          price: 0,
          percentpromotion: 0,
          imagesalientfeatures: [],
          isFeatured: false,
          isArchived: false,
          productdetailId: "",
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

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      //inittialData có nghĩa là khi dữ diệu ban đầu có nó sẽ đổi nut button thành save change
      /* Khối mã chịu trách nhiệm thực hiện yêu cầu HTTP để cập nhật bảng quảng cáo hiện có
      hoặc tạo bảng quảng cáo mới dựa trên giá trị của `initialData`. */
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/product7/${params.product7Id}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/product7`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/product7`);
      toast.success(toastMessage);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(error.response.data.error);
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/product7/${params.product7Id}`
      );
      router.refresh();
      router.push(`/${params.storeId}/product7`);
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
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
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
              control={form.control}
              name="productdetailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chi tiết sản phẩm</FormLabel>
                  <Input
                    list="productdetails"
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      const selectedProductDetail = productDetail.find(
                        (item) => item.name === enteredValue
                      );
                      if (selectedProductDetail) {
                        // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                        field.onChange(selectedProductDetail.id);
                      } else {
                        // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                        field.onChange(enteredValue);
                      }
                    }}
                    value={
                      field.value
                        ? productDetail.find((item) => item.id === field.value)
                            ?.name
                        : ""
                    }
                    disabled={loading}
                    placeholder="Select a productdetail"
                  />
                  <datalist id="productdetails">
                    {productDetail.map((item) => (
                      <option key={item.id} value={item.name} />
                    ))}
                  </datalist>
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
                    <FormDescription>Sản phẩm sẽ bị ẩn</FormDescription>
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

"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Category, Size, Color, ProductDetail } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1),
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
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  categoryId: z.string().min(1),
});

type ProductDetailFormValues = z.infer<typeof formSchema>;

interface ProductDetailFormProps {
  initialData: ProductDetail | null;

  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

export const ProductDetailForm: React.FC<ProductDetailFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Product Detail" : "Create Product Detail";
  const description = initialData
    ? "Edit a Product Detail."
    : "Add a new Product Detail";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductDetailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
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
          guaranteeheading: 0,
          guaranteedescription: 0,
          guaranteeinfomation: 0,
          guaranteeprice: 0,
          sizeId: "",
          colorId: "",
          categoryId: "",
        },
  });

  const onSubmit = async (data: ProductDetailFormValues) => {
    try {
      setLoading(true);
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/productdetail/${params.productdetailId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/productdetail`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                Product Detail{" "}
                <span className="font-bold">{response.data?.name}</span>{" "}
                updated.
              </p>
            );
          } else {
            return (
              <p>
                Product Detail <span className="font-bold">{data.name}</span>{" "}
                created.
              </p>
            );
          }
        }),
        {
          loading: "Updating product detail...",
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/productdetail`);
            return message;
          },
          error: (error: any) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              return error.response.data.error;
            } else {
              return "Something went wrong.";
            }
          },
        }
      );
    } catch (error: any) {} 
      finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/productdetail/${params.productdetailId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/productdetail`);
      toast.success("Product deleted.");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(error.response.data.error);
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(
          "Make sure you removed all categories using this billboard first."
        );
      }
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
          <div className="md:grid md:grid-cols-6 gap-6 overflow-y-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên ..."
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
                  <FormLabel>Giá tiền bảo hành 1</FormLabel>
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
                  <FormLabel>Giá tiền bảo hành 2</FormLabel>
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
                  <FormLabel>Giá tiền bảo hành 3</FormLabel>
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
                  <FormLabel>Giá tiền bảo hành 4</FormLabel>
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
                    <Textarea
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
                    <Textarea
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
                    <Textarea
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
                    <Textarea
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
                    <Textarea
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
                  <Input
                    list="colors"
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      const selectedColor = colors.find(
                        (color) => color.name === enteredValue
                      );
                      if (selectedColor) {
                        // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                        field.onChange(selectedColor.id);
                      } else {
                        // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                        field.onChange(enteredValue);
                      }
                    }}
                    value={
                      field.value
                        ? colors.find((color) => color.id === field.value)?.name
                        : ""
                    }
                    disabled={loading}
                    placeholder="Select a color"
                  />
                  <datalist id="colors">
                    {colors.map((color) => (
                      <option key={color.id} value={color.name} />
                    ))}
                  </datalist>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kích cỡ</FormLabel>
                  <Input
                    list="sizes"
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      const selectedSize = sizes.find(
                        (size) => size.name === enteredValue
                      );
                      if (selectedSize) {
                        // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                        field.onChange(selectedSize.id);
                      } else {
                        // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                        field.onChange(enteredValue);
                      }
                    }}
                    value={
                      field.value
                        ? sizes.find((size) => size.id === field.value)?.name
                        : ""
                    }
                    disabled={loading}
                    placeholder="Select a size"
                  />
                  <datalist id="sizes">
                    {sizes.map((size) => (
                      <option key={size.id} value={size.name} />
                    ))}
                  </datalist>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại</FormLabel>
                  <Input
                    list="categories"
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      const selectedCategory = categories.find(
                        (categorie) => categorie.name === enteredValue
                      );
                      if (selectedCategory) {
                        // Nếu một màu được chọn từ danh sách, gán giá trị id tương ứng
                        field.onChange(selectedCategory.id);
                      } else {
                        // Nếu người dùng đang nhập một giá trị mới, gán giá trị văn bản cho field
                        field.onChange(enteredValue);
                      }
                    }}
                    value={
                      field.value
                        ? categories.find(
                            (categorie) => categorie.id === field.value
                          )?.name
                        : ""
                    }
                    disabled={loading}
                    placeholder="Select a category"
                  />
                  <datalist id="categories">
                    {categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.name} />
                    ))}
                  </datalist>
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

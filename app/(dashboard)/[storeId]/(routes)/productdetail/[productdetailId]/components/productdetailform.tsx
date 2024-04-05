"use client";
import * as z from "zod";
import axios from "axios";
import { useState, ChangeEvent } from "react";
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
  title: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  promotionheading: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  promotiondescription: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  warranty1: z.optional(z.coerce.number().min(500,{message: "Hãy nhập ít nhất 500 đồng."})),
  warranty2: z.optional(z.coerce.number().min(500,{message: "Hãy nhập ít nhất 500 đồng."})),
  warranty3: z.optional(z.coerce.number().min(500,{message: "Hãy nhập ít nhất 500 đồng."})),
  warranty4: z.optional(z.coerce.number().min(500,{message: "Hãy nhập ít nhất 500 đồng."})),
  // Specification
  descriptionspecifications: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  valuespecifications: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  description2specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value2specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description3specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value3specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description4specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value4specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description5specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value5specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description6specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value6specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description7specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value7specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description8specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value8specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description9specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value9specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description10specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value10specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description11specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value11specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description12specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value12specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description13specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value13specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  description14specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  value14specifications: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  // salientfeatures:
  descriptionsalientfeatures: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  description2salientfeatures: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  description3salientfeatures: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  description4salientfeatures: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  contentsalientfeatures: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  size1Id: z.string().min(1,{message: "Hãy chọn 1 size phù hợp."}),
  color1Id: z.string().min(1,{message: "Hãy chọn 1 color phù hợp."}),
  size2Id: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  color2Id: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  size3Id: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  color3Id: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  size4Id: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  color4Id: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  size5Id: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  color5Id: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  price1: z.coerce.number().min(500,{message: "Hãy nhập ít nhất 500 đồng."}),
  price2: z.optional(z.coerce.number().min(500,{message: "Hãy nhập ít nhất 500 đồng."})),
  price3: z.optional(z.coerce.number().min(500,{message: "Hãy nhập ít nhất 500 đồng."})),
  price4: z.optional(z.coerce.number().min(500,{message: "Hãy nhập ít nhất 500 đồng."})),
  price5: z.optional(z.coerce.number().min(500,{message: "Hãy nhập ít nhất 500 đồng."})),
  name1: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  name2: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  name3: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  name4: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  name5: z.optional(z.string().min(4,{message: "Nhập ít nhất 4 ký tự."})),
  percentpromotion1: z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1%."}),
  percentpromotion2: z.optional(z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1%."})),
  percentpromotion3: z.optional(z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1%."})),
  percentpromotion4: z.optional(z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1%."})),
  percentpromotion5: z.optional(z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1%."})),
  quantity1: z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1."}),
  quantity2: z.optional(z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1 số lượng."})),
  quantity3: z.optional(z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1 số lượng."})),
  quantity4: z.optional(z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1 số lượng."})),
  quantity5: z.optional(z.coerce.number().min(1,{message: "Hãy nhập ít nhất 1 số lượng."})),
  categoryId: z.string().min(1,{message: "Hãy chọn 1 category phù hợp."}),
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
  const [name1Value, setName1Value] = useState("");
  const [name2Value, setName2Value] = useState("");
  const [name3Value, setName3Value] = useState("");
  const [name4Value, setName4Value] = useState("");
  const [name5Value, setName5Value] = useState("");

  const handleName1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName1Value(event.target.value);
  };

  const handleName2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName2Value(event.target.value);
  };

  const handleName3Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName3Value(event.target.value);
  };

  const handleName4Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName4Value(event.target.value);
  };

  const handleName5Change = (event: ChangeEvent<HTMLInputElement>) => {
    setName5Value(event.target.value);
  };

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
          warranty1: parseFloat(String(initialData?.warranty1)),
          warranty2: parseFloat(String(initialData?.warranty2)),
          warranty3: parseFloat(String(initialData?.warranty3)),
          warranty4: parseFloat(String(initialData?.warranty4)),
          price1: parseFloat(String(initialData?.price1)),
          percentpromotion1: parseFloat(String(initialData?.percentpromotion1)),
          price2: parseFloat(String(initialData?.price2)),
          percentpromotion2: parseFloat(String(initialData?.percentpromotion2)),
          price3: parseFloat(String(initialData?.price3)),
          percentpromotion3: parseFloat(String(initialData?.percentpromotion3)),
          price4: parseFloat(String(initialData?.price4)),
          percentpromotion4: parseFloat(String(initialData?.percentpromotion4)),
          price5: parseFloat(String(initialData?.price5)),
          percentpromotion5: parseFloat(String(initialData?.percentpromotion5)),
          size1Id: "",
          color1Id: "",
          size2Id: "" || null || undefined,
          color2Id: "" || null || undefined,
          size3Id: "" || null || undefined,
          color3Id: "" || null || undefined,
          size4Id: "" || null || undefined,
          color4Id: "" || null || undefined,
          size5Id: "" || null || undefined,
          color5Id: "" || null || undefined,
          name1: "",
          name2: "" || null || undefined,
          name3: "" || null || undefined,
          name4: "" || null || undefined,
          name5: "" || null || undefined,
          quantity1: 0 || null || undefined,
          quantity2: 0 || null || undefined,
          quantity3: 0 || null || undefined,
          quantity4: 0 || null || undefined,
          quantity5: 0 || null || undefined,
          descriptionspecifications: "",
          valuespecifications: "",
          description2specifications: "" || null || undefined,
          value2specifications: "" || null || undefined,
          description3specifications: "" || null || undefined,
          value3specifications: "" || null || undefined,
          description4specifications: "" || null || undefined,
          value4specifications: "" || null || undefined,
          description5specifications: "" || null || undefined,
          value5specifications: "" || null || undefined,
          description6specifications: "" || null || undefined,
          value6specifications: "" || null || undefined,
          description7specifications: "" || null || undefined,
          value7specifications: "" || null || undefined,
          description8specifications: "" || null || undefined,
          value8specifications: "" || null || undefined,
          description9specifications: "" || null || undefined,
          value9specifications: "" || null || undefined,
          description10specifications: "" || null || undefined,
          value10specifications: "" || null || undefined,
          description11specifications: "" || null || undefined,
          value11specifications: "" || null || undefined,
          description12specifications: "" || null || undefined,
          value12specifications: "" || null || undefined,
          description13specifications: "" || null || undefined,
          value13specifications: "" || null || undefined,
          description14specifications: "" || null || undefined,
          value14specifications: "" || null || undefined,
        }
      : {
          title: "",
          warranty1: 0 || null || undefined,
          warranty2: 0 || null || undefined,
          warranty3: 0 || null || undefined,
          warranty4: 0 || null || undefined,
          size1Id: "",
          color1Id: "",
          size2Id: "" || null || undefined,
          color2Id: "" || null || undefined,
          size3Id: "" || null || undefined,
          color3Id: "" || null || undefined,
          size4Id: "" || null || undefined,
          color4Id: "" || null || undefined,
          size5Id: "" || null || undefined,
          color5Id: "" || null || undefined,
          price1: 0,
          percentpromotion1: 0,
          price2: 0 || null || undefined,
          percentpromotion2: 0 || null || undefined,
          price3: 0 || null || undefined,
          percentpromotion3: 0 || null || undefined,
          price4: 0 || null || undefined,
          percentpromotion4: 0 || null || undefined,
          price5: 0 || null || undefined,
          percentpromotion5: 0 || null || undefined,
          name1: "",
          name2: "" || null || undefined,
          name3: "" || null || undefined,
          name4: "" || null || undefined,
          name5: "" || null || undefined,
          quantity1: 0 || null || undefined,
          quantity2: 0 || null || undefined,
          quantity3: 0 || null || undefined,
          quantity4: 0 || null || undefined,
          quantity5: 0 || null || undefined,
          categoryId: "",
          descriptionspecifications: "",
          valuespecifications: "",
          description2specifications: "" || null || undefined,
          value2specifications: "" || null || undefined,
          description3specifications: "" || null || undefined,
          value3specifications: "" || null || undefined,
          description4specifications: "" || null || undefined,
          value4specifications: "" || null || undefined,
          description5specifications: "" || null || undefined,
          value5specifications: "" || null || undefined,
          description6specifications: "" || null || undefined,
          value6specifications: "" || null || undefined,
          description7specifications: "" || null || undefined,
          value7specifications: "" || null || undefined,
          description8specifications: "" || null || undefined,
          value8specifications: "" || null || undefined,
          description9specifications: "" || null || undefined,
          value9specifications: "" || null || undefined,
          description10specifications: "" || null || undefined,
          value10specifications: "" || null || undefined,
          description11specifications: "" || null || undefined,
          value11specifications: "" || null || undefined,
          description12specifications: "" || null || undefined,
          value12specifications: "" || null || undefined,
          description13specifications: "" || null || undefined,
          value13specifications: "" || null || undefined,
          description14specifications: "" || null || undefined,
          value14specifications: "" || null || undefined,
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
                <span className="font-bold">{response.data?.title}</span>{" "}
                updated.
              </p>
            );
          } else {
            return (
              <p>
                Product Detail <span className="font-bold">{data.title}</span>{" "}
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
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return "Something went wrong.";
            }
          },
        }
      );
    } catch (error) {
    } finally {
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề <span className="text-red-600 pl-1">(*)</span></FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tiêu đề ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm 1 <span className="text-red-600 pl-1">(*)</span></FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên sản phẩm 1..."
                      {...field}
                      onChange={(event) => {
                        handleName1Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-orange-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name1Value && (
              <>
                <FormField
                  control={form.control}
                  name="price1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá sản phẩm 1 <span className="text-red-600 pl-1">(*)</span></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập giá sản phẩm 1..."
                          {...field}
                          className="border-2 border-orange-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="percentpromotion1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giảm giá sản phẩm 1 <span className="text-red-600 pl-1">(*)</span></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập % giảm sản phẩm 1 ..."
                          {...field}
                          className="border-2 border-orange-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng còn trong kho 1 <span className="text-red-600 pl-1">(*)</span></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập số lượng còn trong kho 1..."
                          {...field}
                          className="border-2 border-orange-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="name2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm 2</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên sản phẩm 2 ..."
                      {...field}
                      onChange={(event) => {
                        handleName2Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-green-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name2Value && (
              <>
                <FormField
                  control={form.control}
                  name="price2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá sản phẩm 2</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập giá sản phẩm 2..."
                          {...field}
                          className="border-2 border-green-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="percentpromotion2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giảm giá sản phẩm 2</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập % giảm sản phẩm 2 ..."
                          {...field}
                          className="border-2 border-green-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng còn trong kho 2</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập số lượng còn trong kho 2..."
                          {...field}
                          className="border-2 border-green-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="name3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm 3</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên sản phẩm 3 ..."
                      {...field}
                      onChange={(event) => {
                        handleName3Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-sky-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name3Value && (
              <>
                <FormField
                  control={form.control}
                  name="price3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá sản phẩm 3</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập giá sản phẩm 3..."
                          {...field}
                          className="border-2 border-sky-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="percentpromotion3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giảm giá sản phẩm 3</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập % giảm sản phẩm 3 ..."
                          {...field}
                          className="border-2 border-sky-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng còn trong kho 3</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập số lượng còn trong kho 3..."
                          {...field}
                          className="border-2 border-sky-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="name4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm 4</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên sản phẩm 4 ..."
                      {...field}
                      onChange={(event) => {
                        handleName4Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-violet-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name4Value && (
              <>
                <FormField
                  control={form.control}
                  name="price4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá sản phẩm 4</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập giá sản phẩm 4..."
                          {...field}
                          className="border-2 border-violet-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="percentpromotion4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giảm giá sản phẩm 4</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập % giảm sản phẩm 4 ..."
                          {...field}
                          className="border-2 border-violet-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng còn trong kho 4</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập số lượng còn trong kho 4..."
                          {...field}
                          className="border-2 border-violet-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="name5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm 5</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên sản phẩm 5 ..."
                      {...field}
                      onChange={(event) => {
                        handleName5Change(event);
                        field.onChange(event);
                      }}
                      className="border-2 border-pink-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {name5Value && (
              <>
                <FormField
                  control={form.control}
                  name="price5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá sản phẩm 5</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập giá sản phẩm 5..."
                          {...field}
                          className="border-2 border-pink-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="percentpromotion5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giảm giá sản phẩm 5</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập % giảm sản phẩm 5 ..."
                          {...field}
                          className="border-2 border-pink-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng còn trong kho 5</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Nhập số lượng còn trong kho 5..."
                          {...field}
                          className="border-2 border-pink-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
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
              name="warranty1"
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
              name="warranty2"
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
              name="warranty3"
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
              name="warranty4"
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
                  <FormLabel>Thông số <span className="text-red-600 pl-1">(*)</span></FormLabel>
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
                  <FormLabel>Nội dung thông số <span className="text-red-600 pl-1">(*)</span></FormLabel>
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
                  <FormLabel>Mô tả tính năng nổi bật <span className="text-red-600 pl-1">(*)</span></FormLabel>
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
                  <FormLabel>Mô tả tính năng nổi bật <span className="text-red-600 pl-1">(*)</span></FormLabel>
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
                  <FormLabel>Mô tả tính năng nổi bật <span className="text-red-600 pl-1">(*)</span></FormLabel>
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
                  <FormLabel>Mô tả tính năng nổi bật <span className="text-red-600 pl-1">(*)</span></FormLabel>
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
                  <FormLabel>Nội dung tính năng nổi bật <span className="text-red-600 pl-1">(*)</span></FormLabel>
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
            {name1Value && (
              <>
                <FormField
                  control={form.control}
                  name="color1Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Màu sản phẩm 1 <span className="text-red-600 pl-1">(*)</span></FormLabel>
                      <Input
                        list="colors1"
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
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a color"
                        className="border-2 border-orange-400 "
                      />
                      <datalist id="colors1">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size1Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kích cỡ sản phẩm 1 <span className="text-red-600 pl-1">(*)</span></FormLabel>
                      <Input
                        list="sizes1"
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
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a size"
                        className="border-2 border-orange-400 "
                      />
                      <datalist id="sizes1">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            {name2Value && (
              <>
                <FormField
                  control={form.control}
                  name="color2Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Màu sản phẩm 2</FormLabel>
                      <Input
                        list="colors2"
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
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a color"
                        className="border-2 border-green-400 "
                      />
                      <datalist id="colors2">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size2Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kích cỡ sản phẩm 2</FormLabel>
                      <Input
                        list="sizes2"
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
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a size"
                        className="border-2 border-green-400 "
                      />
                      <datalist id="sizes2">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            {name3Value && (
              <>
                <FormField
                  control={form.control}
                  name="color3Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Màu sản phẩm 3</FormLabel>
                      <Input
                        list="colors3"
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
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a color"
                        className="border-2 border-sky-400 "
                      />
                      <datalist id="colors3">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size3Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kích cỡ sản phẩm 3</FormLabel>
                      <Input
                        list="sizes3"
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
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a size"
                        className="border-2 border-sky-400 "
                      />
                      <datalist id="sizes3">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            {name4Value && (
              <>
                <FormField
                  control={form.control}
                  name="color4Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Màu sản phẩm 4</FormLabel>
                      <Input
                        list="colors4"
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
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a color"
                        className="border-2 border-violet-400 "
                      />
                      <datalist id="colors4">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size4Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kích cỡ sản phẩm 4</FormLabel>
                      <Input
                        list="sizes4"
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
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a size"
                        className="border-2 border-violet-400 "
                      />
                      <datalist id="sizes4">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            {name5Value && (
              <>
                <FormField
                  control={form.control}
                  name="color5Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Màu sản phẩm 5</FormLabel>
                      <Input
                        list="colors5"
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
                            ? colors.find((color) => color.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a color"
                        className="border-2 border-pink-400 "
                      />
                      <datalist id="colors5">
                        {colors.map((color) => (
                          <option key={color.id} value={color.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size5Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kích cỡ sản phẩm 5</FormLabel>
                      <Input
                        list="sizes5"
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
                            ? sizes.find((size) => size.id === field.value)
                                ?.name
                            : ""
                        }
                        disabled={loading}
                        placeholder="Select a size"
                        className="border-2 border-pink-400 "
                      />
                      <datalist id="sizes5">
                        {sizes.map((size) => (
                          <option key={size.id} value={size.name} />
                        ))}
                      </datalist>
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại <span className="text-red-600 pl-1">(*)</span></FormLabel>
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

"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import {
  Category1,
  Size,
  Color,
  Ipad,
  ImageIpad,
  ImagesalientfeaturesIpad,
  Mouse,
  ImageMouse,
  ImagesalientfeaturesMouse,
  Category8,
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
    | (Mouse & {
      images: ImageMouse[];
      imagesalientfeatures: ImagesalientfeaturesMouse[];
      })
    | null;

  categories: Category8[];
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

  const title = initialData ? "Edit mouse" : "Create mouse";
  const description = initialData ? "Edit a mouse." : "Add a new mouse";
  const toastMessage = initialData ? "Mouse updated." : "Mouse created.";
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
          promotionheading: "",
          promotiondescription: "",
          guaranteeheading: 0,
          guaranteedescription: 0,
          guaranteeinfomation: 0,
          guaranteeprice: 0,
          // Specification
          descriptionspecifications: "",
          valuespecifications: "",
          description2specifications: "",
          value2specifications: "",
          description3specifications: "",
          value3specifications: "",
          description4specifications: "",
          value4specifications: "",
          description5specifications: "",
          value5specifications: "",
          description6specifications: "",
          value6specifications: "",
          description7specifications: "",
          value7specifications: "",
          description8specifications: "",
          value8specifications: "",
          description9specifications: "",
          value9specifications: "",
          description10specifications: "",
          value10specifications: "",
          description11specifications: "",
          value11specifications: "",
          description12specifications: "",
          value12specifications: "",
          description13specifications: "",
          value13specifications: "",
          description14specifications: "",
          value14specifications: "",
          // salientfeatures:
          descriptionsalientfeatures: "",
          description2salientfeatures: "",
          description3salientfeatures: "",
          description4salientfeatures: "",
          contentsalientfeatures: "",
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
        await axios.patch(`/api/${params.storeId}/mouse/${params.mouseId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/mouse`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/mouse`);
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
      await axios.delete(`/api/${params.storeId}/mouse/${params.mouseId}`);
      router.refresh();
      router.push(`/${params.storeId}/mouse`);
      toast.success("Mouse deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all mouse using this product first.");
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
                <FormLabel>Images</FormLabel>
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
                <FormLabel>Images Salientfeatures headphone (Please add only 2 images)</FormLabel>
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

          <div className="md:grid md:grid-cols-5 gap-8 overflow-y-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name ..."
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
                  <FormLabel>Heading</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Heading ..."
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description ..."
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
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="10.000VND"
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
                  <FormLabel>Percentpromotion </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="%"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="promotionheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotion heading</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Promotion heading ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="promotiondescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotion description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Promotion description ..."
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
                  <FormLabel>Guarantee heading</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Guarantee heading ..."
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
                  <FormLabel>Guarantee description</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Guarantee description ..."
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
                  <FormLabel>Guarantee infomation</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Guarantee infomation ..."
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
                  <FormLabel>Guarantee price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Guarantee price ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionspecifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valuespecifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description2specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 2 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 2 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value2specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 2 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 2 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description3specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 3 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 3 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value3specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 3 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 3 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description4specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 4 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 4 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value4specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 4 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 4 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description5specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 5 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 5 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value5specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 5 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 5 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description6specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 6 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 6 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value6specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 6 Specifications </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 6 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description7specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 7 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 7 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value7specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 7 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 7 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description8specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 8 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 8 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value8specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 8 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 8 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description9specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 9 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 9 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value9specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 9 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 9 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description10specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 9 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 9 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value10specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 10 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 10 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description11specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 11 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 11 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value11specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 11 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 11 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description12specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 12 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 12 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value12specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotion 12 description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 12 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description13specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 12 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value13specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 13 Specifications </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 13 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description14specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 14 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 14 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value14specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 14 Specifications</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Value 14 Specifications ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionsalientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description Salientfeatures</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description Salientfeatures ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description2salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 2 Salientfeatures</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 2 Salientfeatures ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description3salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 3 Salientfeatures</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 3 Salientfeatures ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description4salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 4 Salientfeatures</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description 4 Salientfeatures ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contentsalientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Salientfeatures</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Content Salientfeatures ..."
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
                  <FormLabel>Color</FormLabel>
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
                  <FormLabel>Size</FormLabel>
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
                  <FormLabel>Category</FormLabel>
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
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
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
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
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

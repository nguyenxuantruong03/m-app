"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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
import { Trash } from "lucide-react";
import { Check } from "lucide-react";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";
import Imagee from "next/image";
import Recommend from "@/components/ui/recommend";
import { useTranslations } from "next-intl";

//Loại bỏ dấu
const removeDiacritics = (str: String) => {
  return unorm.nfd(str).replace(/[\u0300-\u036f]/g, "");
};

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
  const t = useTranslations()
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData
    ?t("product.form.editProduct")
    : t("product.form.createProduct");
  const description = initialData
    ? t("product.form.editAProduct")
    : t("product.form.addNewProduct");
  const action = initialData
    ? t("action.saveChange")
    : t("action.create");

  const formSchema = z.object({
    name: z.string().min(2, { message: t("product.form.min2Characters") }),
    heading: z.string().min(2, { message: t("product.form.min2Characters") }),
    description: z
      .string()
      .min(4, { message: t("product.form.min4Characters") }),
    images: z.object({ url: z.string() }).array(),
    imagesalientfeatures: z.object({ url: z.string() }).array(),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
    productdetailId: z
      .string()
      .min(1, { message: t("product.form.selectProductDetail") }),
  });

  type ProductFormValues = z.infer<typeof formSchema>;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          images: [],
          heading: "",
          description: "",
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
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/product7/${params.productId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/product7`, data);
      }

      // Lấy ảnh từ cả images và imagesalientfeatures
      let allImages: string[] = [];
      if (data.images) {
        allImages = allImages.concat(data.images.map((item) => item.url));
      }
      if (data.imagesalientfeatures) {
        allImages = allImages.concat(
          data.imagesalientfeatures.map((item) => item.url)
        );
      }

      const response = await promise;

      let message: React.ReactNode;
      if (initialData) {
        message = (
          <p>
            {t("product.product")}{" "}
            <span className="font-bold">{response?.data.heading}</span>{" "}
            {t("product.form.updated")}.
          </p>
        );
      } else {
        message = (
          <p>
            {t("product.product")}{" "}
            <span className="font-bold">{data.heading}</span>{" "}
            {t("product.form.created")}.
          </p>
        );
      }

      let title: React.ReactNode;
      if (initialData) {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
              {t("product.form.productUpdated")}
            </p>
            <span className="text-gray-500">
              {response?.data.updatedAt
                ? format(
                    utcToZonedTime(
                      new Date(new Date(response?.data.updatedAt)),
                      vietnamTimeZone
                    ),
                    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                    { locale: viLocale }
                  )
                : null}
            </span>
          </div>
        );
      } else {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-4 h-4 rounded-full bg-green-500 text-white mx-1" />
              {t("product.form.productCreated")}
            </p>
            <span className="text-gray-500">
              {response.data?.createdAt
                ? format(
                    utcToZonedTime(
                      new Date(new Date(response.data?.createdAt)),
                      vietnamTimeZone
                    ),
                    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                    { locale: viLocale }
                  )
                : null}
            </span>
          </div>
        );
      }

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } border-2 border-green-500 max-w-3xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-2">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                {allImages.slice(0, 10).map((url: string, index: number) => (
                  <span
                    key={index}
                    className="avatar-overlapping-multiple-image"
                  >
                    <Imagee
                      className="avatar-image-overlapping-multiple-image rounded-full"
                      src={url}
                      alt=""
                      width="50"
                      height="50"
                    />
                  </span>
                ))}
              </div>
              <div className="ml-3 flex-1">
                <p>{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              t("action.close")
            </button>
          </div>
        </div>
      ));
      router.refresh();
      router.push(`/${params.storeId}/product7`);
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/product7/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/product7`);
      toast.success(t("product.form.productDeleted"));
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("heading-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

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
                <FormLabel className="flex space-x-3 items-center">
                  {t("product.form.productImages")}
                  <span className="text-red-600 pl-1">(*)</span>
                  <Recommend message={t("product.form.productImageHint")} />
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => {
                      if (field.value.length < 10) {
                        field.onChange([...field.value, { url }]);
                      } else {
                        toast.error(t("product.form.selectImagesLimit"));
                      }
                    }}
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
                <FormLabel className="flex space-x-3 items-center">
                  {t("product.form.productDescriptionImages")}
                  <span className="text-red-600 pl-1">(*)</span>
                  <Recommend
                    message={t("product.form.productDescriptionImagesHint")}
                  />
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => {
                      if (field.value.length < 2) {
                        field.onChange([...field.value, { url }]);
                      } else {
                        toast.error(
                          t("product.form.productDescriptionImagesHint")
                        );
                      }
                    }}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                    maxFiles={2}
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
                  <FormLabel className="flex space-x-3 items-center">
                    {t("product.form.productName")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("product.form.productNameHint")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="heading-input"
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {t("product.form.description")}{" "}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("product.form.descriptionHint")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("product.form.enterDescriptionName")}
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
                  <FormLabel className="flex space-x-3 items-center">
                    {t("product.form.productDetail")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend
                      message={t("product.form.selectProductDetailHint")}
                    />
                  </FormLabel>
                  <Input
                    list="productdetails"
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      const selectedProductDetail = productDetail.find(
                        (item) => item.title === enteredValue
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
                            ?.title
                        : ""
                    }
                    disabled={loading}
                    placeholder={t("product.form.selectProductDetailLabel")}
                  />
                  <datalist id="productdetails">
                    {productDetail.map((item) => (
                      <option key={item.id} value={item.title} />
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
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t("product.form.showOnHomePage")}</FormLabel>
                    <FormDescription>
                      {t("product.form.homePageHint")}
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
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t("product.outOfStock")}</FormLabel>
                    <FormDescription>
                      {t("product.form.productHidden")}
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

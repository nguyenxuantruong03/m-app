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
import { ChangeEvent, useState } from "react";
import { Decimal } from "@prisma/client/runtime/library";
import { Textarea } from "@/components/ui/textarea";
import { getProductDetailFormEditSheet } from "@/translate/translate-dashboard";

interface LabelFormProps {
  setOpen: (open: boolean) => void;
  id: string;
  data: string;
  title: string;
  name1: string;
  name2: string | null;
  name3: string | null;
  name4: string | null;
  name5: string | null;
  quantity1: number;
  quantity2: number | null;
  quantity3: number | null;
  quantity4: number | null;
  quantity5: number | null;
  promotionheading: string;
  promotiondescription: string;
  size1: string;
  color1: string;
  size2: string | null;
  color2: string | null;
  size3: string | null;
  color3: string | null;
  size4: string | null;
  color4: string | null;
  size5: string | null;
  color5: string | null;
  category: string | null;
  //notformat
  price1: Decimal | null;
  price2: Decimal | null;
  price3: Decimal | null;
  price4: Decimal | null;
  price5: Decimal | null;
  percentpromotion1: Decimal | null;
  percentpromotion2: Decimal | null;
  percentpromotion3: Decimal | null;
  percentpromotion4: Decimal | null;
  percentpromotion5: Decimal | null;
  warranty1: Decimal | null;
  warranty2: Decimal | null;
  warranty3: Decimal | null;
  warranty4: Decimal | null;
  //content
  descriptionspecifications: string;
  valuespecifications: string;
  description2specifications: string | null;
  value2specifications: string | null;
  description3specifications: string | null;
  value3specifications: string | null;
  description4specifications: string | null;
  value4specifications: string | null;
  description5specifications: string | null;
  value5specifications: string | null;
  description6specifications: string | null;
  value6specifications: string | null;
  description7specifications: string | null;
  value7specifications: string | null;
  description8specifications: string | null;
  value8specifications: string | null;
  description9specifications: string | null;
  value9specifications: string | null;
  description10specifications: string | null;
  value10specifications: string | null;
  description11specifications: string | null;
  value11specifications: string | null;
  description12specifications: string | null;
  value12specifications: string | null;
  description13specifications: string | null;
  value13specifications: string | null;
  description14specifications: string | null;
  value14specifications: string | null;
  descriptionsalientfeatures: string;
  description2salientfeatures: string;
  description3salientfeatures: string;
  description4salientfeatures: string;
  contentsalientfeatures: string;
  language:string
  field: "title" | "name1" | "name2" | "name3" | "name4" | "name5" | "quantity1" | "quantity2" | "quantity3" | "quantity4" | "quantity5" | "promotionheading" | "promotiondescription" | "price1" | "price2" | "price3" | "price4" | "price5" | "percentpromotion1" | "percentpromotion2" | "percentpromotion3" | "percentpromotion4" | "percentpromotion5" | "warranty1" | "warranty2" | "warranty3" | "warranty4" | "descriptionspecifications" | "valuespecifications" | "description2specifications" | "value2specifications" | "description3specifications" | "value3specifications" | "description4specifications" | "value4specifications" | "description5specifications" | "value5specifications" | "description6specifications" | "value6specifications" | "description7specifications" | "value7specifications" | "description8specifications" | "value8specifications" | "description9specifications" | "value9specifications" | "description10specifications" | "value10specifications" | "description11specifications" | "value11specifications" | "description12specifications" | "value12specifications" | "description13specifications" | "value13specifications" | "description14specifications" | "value14specifications" | "descriptionsalientfeatures" | "description2salientfeatures" | "description3salientfeatures" | "description4salientfeatures" | "contentsalientfeatures"
}

const LabelForm: React.FC<LabelFormProps> = ({
  data,
  id,
  title,
  name1,
  name2,
  name3,
  name4,
  name5,
  quantity1,
  quantity2,
  quantity3,
  quantity4,
  quantity5,
  promotionheading,
  promotiondescription,
  size1,
  color1,
  size2,
  color2,
  size3,
  color3,
  size4,
  color4,
  size5,
  color5,
  category,
  price1,
  price2,
  price3,
  price4,
  price5,
  percentpromotion1,
  percentpromotion2,
  percentpromotion3,
  percentpromotion4,
  percentpromotion5,
  warranty1,
  warranty2,
  warranty3,
  warranty4,
  descriptionspecifications,
  valuespecifications,
  description2specifications,
  value2specifications,
  description3specifications,
  value3specifications,
  description4specifications,
  value4specifications,
  description5specifications,
  value5specifications,
  description6specifications,
  value6specifications,
  description7specifications,
  value7specifications,
  description8specifications,
  value8specifications,
  description9specifications,
  value9specifications,
  description10specifications,
  value10specifications,
  description11specifications,
  value11specifications,
  description12specifications,
  value12specifications,
  description13specifications,
  value13specifications,
  description14specifications,
  value14specifications,
  descriptionsalientfeatures,
  description2salientfeatures,
  description3salientfeatures,
  description4salientfeatures,
  contentsalientfeatures,
  field,
  setOpen,
  language
}) => {
  const router = useRouter()
  const params = useParams();
  const [loading, setLoading] = useState(false);

  //language
  const productDetailFormEditSheetMessage = getProductDetailFormEditSheet(language)

  const formSchema = z.object({
    title: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    promotionheading: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    promotiondescription: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    warranty1: z.optional(z.coerce.number().min(0)),
    warranty2: z.optional(z.coerce.number().min(0)),
    warranty3: z.optional(z.coerce.number().min(0)),
    warranty4: z.optional(z.coerce.number().min(0)),
    // Specification
    descriptionspecifications: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    valuespecifications: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    description2specifications: z.optional(z.string().min(0)),
    value2specifications: z.optional(z.string().min(0)),
    description3specifications: z.optional(z.string().min(0)),
    value3specifications: z.optional(z.string().min(0)),
    description4specifications: z.optional(z.string().min(0)),
    value4specifications: z.optional(z.string().min(0)),
    description5specifications: z.optional(z.string().min(0)),
    value5specifications: z.optional(z.string().min(0)),
    description6specifications: z.optional(z.string().min(0)),
    value6specifications: z.optional(z.string().min(0)),
    description7specifications: z.optional(z.string().min(0)),
    value7specifications: z.optional(z.string().min(0)),
    description8specifications: z.optional(z.string().min(0)),
    value8specifications: z.optional(z.string().min(0)),
    description9specifications: z.optional(z.string().min(0)),
    value9specifications: z.optional(z.string().min(0)),
    description10specifications: z.optional(z.string().min(0)),
    value10specifications: z.optional(z.string().min(0)),
    description11specifications: z.optional(z.string().min(0)),
    value11specifications: z.optional(z.string().min(0)),
    description12specifications: z.optional(z.string().min(0)),
    value12specifications: z.optional(z.string().min(0)),
    description13specifications: z.optional(z.string().min(0)),
    value13specifications: z.optional(z.string().min(0)),
    description14specifications: z.optional(z.string().min(0)),
    value14specifications: z.optional(z.string().min(0)),
    // salientfeatures:
    descriptionsalientfeatures: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    description2salientfeatures: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    description3salientfeatures: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    description4salientfeatures: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    contentsalientfeatures: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    size1Id: z
      .string()
      .min(1, { message: productDetailFormEditSheetMessage.selectSize }),
    color1Id: z
      .string()
      .min(0, { message: productDetailFormEditSheetMessage.selectColor }),
    size2Id: z.optional(z.string().min(0)),
    color2Id: z.optional(z.string().min(0)),
    size3Id: z.optional(z.string().min(0)),
    color3Id: z.optional(z.string().min(0)),
    size4Id: z.optional(z.string().min(0)),
    color4Id: z.optional(z.string().min(0)),
    size5Id: z.optional(z.string().min(0)),
    color5Id: z.optional(z.string().min(0)),
    price1: z.coerce
      .number()
      .min(500, { message: productDetailFormEditSheetMessage.minPrice }),
    price2: z.optional(z.coerce.number().min(0)),
    price3: z.optional(z.coerce.number().min(0)),
    price4: z.optional(z.coerce.number().min(0)),
    price5: z.optional(z.coerce.number().min(0)),
    name1: z
      .string()
      .min(2, { message: productDetailFormEditSheetMessage.min2Characters }),
    name2: z.optional(z.string().min(0)),
    name3: z.optional(z.string().min(0)),
    name4: z.optional(z.string().min(0)),
    name5: z.optional(z.string().min(0)),
    percentpromotion1: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailFormEditSheetMessage.percentageRange })
    ),
    percentpromotion2: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailFormEditSheetMessage.percentageRange })
    ),
    percentpromotion3: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailFormEditSheetMessage.percentageRange })
    ),
    percentpromotion4: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailFormEditSheetMessage.percentageRange })
    ),
    percentpromotion5: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(100, { message: productDetailFormEditSheetMessage.percentageRange })
    ),
    quantity1: z.coerce
      .number()
      .int()
      .min(1, { message: productDetailFormEditSheetMessage.quantityRange })
      .max(9999, { message: productDetailFormEditSheetMessage.quantityRange }),
    quantity2: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(9999, { message: productDetailFormEditSheetMessage.quantityRange })
    ),
    quantity3: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(9999, { message: productDetailFormEditSheetMessage.quantityRange })
    ),
    quantity4: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(9999, { message: productDetailFormEditSheetMessage.quantityRange })
    ),
    quantity5: z.optional(
      z.coerce
        .number()
        .int()
        .min(0)
        .max(9999, { message: productDetailFormEditSheetMessage.quantityRange })
    ),
    categoryId: z
      .string()
      .min(1, { message: productDetailFormEditSheetMessage.selectCategory }),
  });

  type FormValues = z.input<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || undefined,
      name1: name1 || undefined,
      name2: name2 || undefined,
      name3: name3 || undefined,
      name4: name4 || undefined,
      name5: name5 || undefined,
      quantity1: quantity1,
      quantity2: quantity2 || undefined,
      quantity3: quantity3 || undefined,
      quantity4: quantity4 || undefined,
      quantity5: quantity5 || undefined,
      percentpromotion1: percentpromotion1
        ? Number(percentpromotion1)
        : undefined,
      percentpromotion2: percentpromotion2
        ? Number(percentpromotion2)
        : undefined,
      percentpromotion3: percentpromotion3
        ? Number(percentpromotion3)
        : undefined,
      percentpromotion4: percentpromotion4
        ? Number(percentpromotion4)
        : undefined,
      percentpromotion5: percentpromotion5
        ? Number(percentpromotion5)
        : undefined,
      price1: price1 ? Number(price1) : undefined,
      price2: price2 ? Number(price2) : undefined,
      price3: price3 ? Number(price3) : undefined,
      price4: price4 ? Number(price4) : undefined,
      price5: price5 ? Number(price5) : undefined,
      size1Id: size1 || undefined,
      color1Id: color1 || undefined,
      size2Id: size2 || undefined,
      color2Id: color2 || undefined,
      size3Id: size3 || undefined,
      color3Id: color3 || undefined,
      size4Id: size4 || undefined,
      color4Id: color4 || undefined,
      size5Id: size5 || undefined,
      color5Id: color5 || undefined,
      categoryId: category || undefined,
      descriptionspecifications: descriptionspecifications || undefined,
      valuespecifications: valuespecifications || undefined,
      description2specifications: description2specifications || undefined,
      value2specifications: value2specifications || undefined,
      description3specifications: description3specifications || undefined,
      value3specifications: value3specifications || undefined,
      description4specifications: description4specifications || undefined,
      value4specifications: value4specifications || undefined,
      description5specifications: description5specifications || undefined,
      value5specifications: value5specifications || undefined,
      description6specifications: description6specifications || undefined,
      value6specifications: value6specifications || undefined,
      description7specifications: description7specifications || undefined,
      value7specifications: value7specifications || undefined,
      description8specifications: description8specifications || undefined,
      value8specifications: value8specifications || undefined,
      description9specifications: description9specifications || undefined,
      value9specifications: value9specifications || undefined,
      description10specifications: description10specifications || undefined,
      value10specifications: value10specifications || undefined,
      description11specifications: description11specifications || undefined,
      value11specifications: value11specifications || undefined,
      description12specifications: description12specifications || undefined,
      value12specifications: value12specifications || undefined,
      description13specifications: description13specifications || undefined,
      value13specifications: value13specifications || undefined,
      description14specifications: description14specifications || undefined,
      value14specifications: value14specifications || undefined,
      descriptionsalientfeatures: descriptionsalientfeatures || undefined,
      description2salientfeatures: description2salientfeatures || undefined,
      description3salientfeatures: description3salientfeatures || undefined,
      description4salientfeatures: description4salientfeatures || undefined,
      contentsalientfeatures: contentsalientfeatures || undefined,
      promotionheading: promotionheading || undefined,
      promotiondescription: promotiondescription || undefined,
      warranty1: warranty1 ? Number(warranty1) : undefined,
      warranty2: warranty2 ? Number(warranty2) : undefined,
      warranty3: warranty3 ? Number(warranty3) : undefined,
      warranty4: warranty4 ? Number(warranty4) : undefined,
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/productdetail/${id}`, datas);
      setLoading(false);
      setOpen(false);
      router.refresh()
      toast.success(productDetailFormEditSheetMessage.updateSuccess);
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
        toast.error(productDetailFormEditSheetMessage.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div>
          {field === "title" && (
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormEditSheetMessage.title} <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterTitle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "name1" && (
            <FormField
              control={form.control}
              name="name1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormEditSheetMessage.productName1}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductName1}
                      {...field}
                      className="border-2 border-orange-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {field === "price1" && (
            <FormField
              control={form.control}
              name="price1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  {productDetailFormEditSheetMessage.productPrice1}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductPrice1}
                      {...field}
                      className="border-2 border-orange-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "percentpromotion1" && (
            <FormField
              control={form.control}
              name="percentpromotion1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  {productDetailFormEditSheetMessage.productDiscount1}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductDiscount1}
                      {...field}
                      className="border-2 border-orange-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "quantity1" && (
            <FormField
              control={form.control}
              name="quantity1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  {productDetailFormEditSheetMessage.productQuantity1}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductQuantity1}
                      {...field}
                      className="border-2 border-orange-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "name2" && (
            <FormField
              control={form.control}
              name="name2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productName2}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductName2}
                      {...field}
                      className="border-2 border-green-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "price2" && (
            <FormField
              control={form.control}
              name="price2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productPrice2}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductPrice2}
                      {...field}
                      className="border-2 border-green-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "percentpromotion2" && (
            <FormField
              control={form.control}
              name="percentpromotion2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productDiscount2}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductDiscount2}
                      {...field}
                      className="border-2 border-green-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "quantity2" && (
            <FormField
              control={form.control}
              name="quantity2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productQuantity2}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductQuantity2}
                      {...field}
                      className="border-2 border-green-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "name3" && (
            <FormField
              control={form.control}
              name="name3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productName3}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductName3}
                      {...field}
                      className="border-2 border-sky-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "price3" && (
            <FormField
              control={form.control}
              name="price3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productPrice3}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductPrice3}
                      {...field}
                      className="border-2 border-sky-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "percentpromotion3" && (
            <FormField
              control={form.control}
              name="percentpromotion3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productDiscount3}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductDiscount3}
                      {...field}
                      className="border-2 border-sky-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {field === "quantity3" && (
            <FormField
              control={form.control}
              name="quantity3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productQuantity3}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductQuantity3}
                      {...field}
                      className="border-2 border-sky-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "name4" && (
            <FormField
              control={form.control}
              name="name4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productName4}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductName4}
                      {...field}
                      className="border-2 border-violet-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "price4" && (
            <FormField
              control={form.control}
              name="price4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productPrice4}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductPrice4}
                      {...field}
                      className="border-2 border-violet-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "percentpromotion4" && (
            <FormField
              control={form.control}
              name="percentpromotion4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productDiscount4}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductDiscount4}
                      {...field}
                      className="border-2 border-violet-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "quantity4" && (
            <FormField
              control={form.control}
              name="quantity4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productQuantity4}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductQuantity4}
                      {...field}
                      className="border-2 border-violet-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {field === "name5" && (
            <FormField
              control={form.control}
              name="name5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productName5}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductName5}
                      {...field}
                      className="border-2 border-pink-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {field === "price5" && (
            <FormField
              control={form.control}
              name="price5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productPrice5}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductPrice5}
                      {...field}
                      className="border-2 border-pink-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "percentpromotion5" && (
            <FormField
              control={form.control}
              name="percentpromotion5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productDiscount5}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductDiscount5}
                      {...field}
                      className="border-2 border-pink-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "quantity5" && (
            <FormField
              control={form.control}
              name="quantity5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.productQuantity5}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterProductQuantity5}
                      {...field}
                      className="border-2 border-pink-400 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "promotionheading" && (
            <FormField
              name="promotionheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.bulkPromotion}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterBulkPromotion}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "promotiondescription" && (
            <FormField
              name="promotiondescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.tenderPromotion}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterTenderPromotion}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "warranty1" && (
            <FormField
              control={form.control}
              name="warranty1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.warrantyPrice1}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterWarrantyPrice1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "warranty2" && (
            <FormField
              control={form.control}
              name="warranty2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.warrantyPrice2}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterWarrantyPrice2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "warranty3" && (
            <FormField
              control={form.control}
              name="warranty3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.warrantyPrice3}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterWarrantyPrice3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "warranty4" && (
            <FormField
              control={form.control}
              name="warranty4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.warrantyPrice4}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterWarrantyPrice4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "descriptionspecifications" && (
            <FormField
              name="descriptionspecifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormEditSheetMessage.specification} <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "valuespecifications" && (
            <FormField
              name="valuespecifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormEditSheetMessage.specContent}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description2specifications" && (
            <FormField
              name="description2specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value2specifications" && (
            <FormField
              name="value2specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description3specifications" && (
            <FormField
              name="description3specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value3specifications" && (
            <FormField
              name="value3specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description4specifications" && (
            <FormField
              name="description4specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value4specifications" && (
            <FormField
              name="value4specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description5specifications" && (
            <FormField
              name="description5specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value5specifications" && (
            <FormField
              name="value5specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description6specifications" && (
            <FormField
              name="description6specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value6specifications" && (
            <FormField
              name="value6specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {field === "description7specifications" && (
            <FormField
              name="description7specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {field === "value7specifications" && (
            <FormField
              name="value7specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description8specifications" && (
            <FormField
              name="description8specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value8specifications" && (
            <FormField
              name="value8specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description9specifications" && (
            <FormField
              name="description9specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value9specifications" && (
            <FormField
              name="value9specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description10specifications" && (
            <FormField
              name="description10specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value10specifications" && (
            <FormField
              name="value10specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description11specifications" && (
            <FormField
              name="description11specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value11specifications" && (
            <FormField
              name="value11specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description12specifications" && (
            <FormField
              name="description12specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value12specifications" && (
            <FormField
              name="value12specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description13specifications" && (
            <FormField
              name="description13specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value13specifications" && (
            <FormField
              name="value13specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent} </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description14specifications" && (
            <FormField
              name="description14specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specification}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecification}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "value14specifications" && (
            <FormField
              name="value14specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productDetailFormEditSheetMessage.specContent}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterSpecContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "descriptionsalientfeatures" && (
            <FormField
              name="descriptionsalientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  {productDetailFormEditSheetMessage.featureDescription}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterFeatureDescription}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description2salientfeatures" && (
            <FormField
              name="description2salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormEditSheetMessage.featureDescription}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterFeatureDescription}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description3salientfeatures" && (
            <FormField
              name="description3salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormEditSheetMessage.featureDescription}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterFeatureDescription}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "description4salientfeatures" && (
            <FormField
              name="description4salientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {productDetailFormEditSheetMessage.featureDescription}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterFeatureDescription}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {field === "contentsalientfeatures" && (
            <FormField
              name="contentsalientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  {productDetailFormEditSheetMessage.featureContent}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder={productDetailFormEditSheetMessage.enterFeatureContent}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
        {productDetailFormEditSheetMessage.saveChange}
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

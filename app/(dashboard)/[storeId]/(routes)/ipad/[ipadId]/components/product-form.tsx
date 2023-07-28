"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Category, Product, Image, Size, Color, Specifications,Salientfeatures, Ipad, ImageIpad } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from "@/components/ui/image-upload"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  name: z.string().min(1),
  heading: z.string().min(1),
  description: z.string().min(1),
  imagesipad: z.object({url: z.string()}).array(),
  price: z.coerce.number().min(1),
  priceold: z.coerce.number().min(1),
  percentpromotion: z.coerce.number().min(1),
  headingrecommend: z.string().min(1),
  infomationrecommend: z.string().min(1),
  warrantyrecommend: z.string().min(1),
  vatrecommend: z.string().min(1),
  promotionheading: z.string().min(1),
  promotiondescription: z.string().min(1),
  guaranteeheading: z.string().min(1),
  guaranteedescription: z.string().min(1),
  guaranteeinfomation: z.string().min(1),
  guaranteeprice: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  categoryId: z.string().min(1),
  specificationsId: z.string().min(1),
  salientfeaturesId: z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Ipad & {
    imagesipad: ImageIpad[]} | null;

  categories: Category[];
  sizes: Size[];
  colors: Color[]
  specifications: Specifications[];
  salientfeatures: Salientfeatures[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,categories, sizes,colors,specifications,salientfeatures
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
     ...initialData,
     price: parseFloat(String(initialData?.price)),
     priceold: parseFloat(String(initialData?.priceold)),
     percentpromotion: parseFloat(String(initialData?.percentpromotion))
    }:{
      name: '',
      imagesipad: [],
      heading: '',
  description: '',
  price: 0,
  priceold: 0 ,
  percentpromotion: 0,
  headingrecommend: '',
  infomationrecommend: '',
  warrantyrecommend:'',
  vatrecommend: '',
  promotionheading: '',
  promotiondescription: '',
  guaranteeheading: '',
  guaranteedescription: '',
  guaranteeinfomation: '',
  guaranteeprice: '',
  isFeatured: false,
  isArchived: false,
  sizeId: '',
  colorId: '',
  categoryId: '',
  specificationsId: '',
  salientfeaturesId: '',
    }
  });


  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      //inittialData có nghĩa là khi dữ diệu ban đầu có nó sẽ đổi nut button thành save change 
     /* Khối mã chịu trách nhiệm thực hiện yêu cầu HTTP để cập nhật bảng quảng cáo hiện có
      hoặc tạo bảng quảng cáo mới dựa trên giá trị của `initialData`. */
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/ipad/${params.ipadId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/ipad`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/ipad`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/ipad/${params.ipadId}`);
      router.refresh();
      router.push(`/${params.storeId}/ipad`);
      toast.success('Product deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all product using this product first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

          <FormField
              control={form.control}
              name="imagesipad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value.map((image) =>image.url)} 
                      disabled={loading} 
                      onChange={(url) => field.onChange([...field.value , {url}])}
                      onRemove={(url) => field.onChange([...field.value.filter((current)=> current.url !== url)])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <div className="md:grid md:grid-cols-5 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Name ..." {...field} />
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
                    <Input disabled={loading} placeholder="Heading ..." {...field} />
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
                    <Input disabled={loading} placeholder="Description ..." {...field} />
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
                    <Input type="number" disabled={loading} placeholder="10.000VND" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="priceold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Old</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="50.000VND" {...field} />
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
                    <Input type="number" disabled={loading} placeholder="%" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="headingrecommend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading Recommend</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Heading recommend ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="infomationrecommend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Infomation recommend</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Infomation recommend ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="warrantyrecommend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty recommend</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Warranty recommend ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="vatrecommend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VAT recommend</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="VAT recommend ..." {...field} />
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
                    <Input disabled={loading} placeholder="Promotion heading ..." {...field} />
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
                    <Input disabled={loading} placeholder="Promotion description ..." {...field} />
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
                    <Input disabled={loading} placeholder="Guarantee heading ..." {...field} />
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
                    <Input disabled={loading} placeholder="Guarantee description ..." {...field} />
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
                    <Input disabled={loading} placeholder="Guarantee infomation ..." {...field} />
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
                    <Input disabled={loading} placeholder="Guarantee price ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
                <FormField 
                control ={form.control}
                name="colorId"
                render={({field})=>(
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
                        {colors.map((color)=>(
                          <SelectItem
                          key={color.id}
                          value={color.id}
                          >
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
                />

<FormField 
                control ={form.control}
                name="sizeId"
                render={({field})=>(
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
                        {sizes.map((size)=>(
                          <SelectItem
                          key={size.id}
                          value={size.id}
                          >
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
                />

<FormField 
                control ={form.control}
                name="categoryId"
                render={({field})=>(
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
                        {categories.map((categorie)=>(
                          <SelectItem
                          key={categorie.id}
                          value={categorie.id}
                          >
                            {categorie.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
                />

<FormField 
                control ={form.control}
                name="specificationsId"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Specifications</FormLabel>
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
                          placeholder="Select a specifications"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specifications.map((specification)=>(
                          <SelectItem
                          key={specification.id}
                          value={specification.id}
                          >
                            {specification.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
                />
                <FormField 
                control ={form.control}
                name="salientfeaturesId"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Salientfeatures</FormLabel>
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
                          placeholder="Select a specifications"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {salientfeatures.map((salientfeature)=>(
                          <SelectItem
                          key={salientfeature.id}
                          value={salientfeature.id}
                          >
                            {salientfeature.name}
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
                        <FormLabel>
                          Featured
                        </FormLabel>
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
                        <FormLabel>
                        Archived
                        </FormLabel>
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

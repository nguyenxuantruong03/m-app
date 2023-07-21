"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Salientfeatures, Imagesalientfeatures } from "@prisma/client"
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
import ImageUpload from "@/components/ui/image-upload"

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  description2: z.string().min(1),
  description3: z.string().min(1),
  description4: z.string().min(1),
  content: z.string().min(1),
  imagesalientfeatures: z.object({url: z.string()}).array(),
});

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Salientfeatures &{
    imagesalientfeatures: Imagesalientfeatures[]
  } | null;
};

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit billboard' : 'Create billboard';
  const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';
  const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      imagesalientfeatures: [],
      description: '',
      description2: '',
      description3: '',
      description4: '',
      content: '',
    }
  });


  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      //inittialData có nghĩa là khi dữ diệu ban đầu có nó sẽ đổi nut button thành save change 
     /* Khối mã chịu trách nhiệm thực hiện yêu cầu HTTP để cập nhật bảng quảng cáo hiện có
      hoặc tạo bảng quảng cáo mới dựa trên giá trị của `initialData`. */
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/salientfeatures/${params.salientfeaturesId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/salientfeatures`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/salientfeatures`);
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
      await axios.delete(`/api/${params.storeId}/salientfeatures/${params.salientfeaturesId}`);
      router.refresh();
      router.push(`/${params.storeId}/salientfeatures`);
      toast.success('Billboard deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all salientfeatures using this billboard first.');
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
              name="imagesalientfeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Salientfeatures</FormLabel>
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
                    <Input disabled={loading} placeholder="Category label" {...field} />
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
                    <Input disabled={loading} placeholder="Category label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 2</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Category label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 3</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Category label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 4</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Category label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Category label" {...field} />
                  </FormControl>
                  <FormMessage />
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

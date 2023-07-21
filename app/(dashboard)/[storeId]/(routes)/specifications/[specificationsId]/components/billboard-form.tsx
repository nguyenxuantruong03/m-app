"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Specifications } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  value: z.string().min(1),
  description2: z.string().min(1),
  value2: z.string().min(1),
  description3: z.string().min(1),
  value3: z.string().min(1),
  description4: z.string().min(1),
  value4: z.string().min(1),
  description5: z.string().min(1),
  value5: z.string().min(1),
  description6: z.string().min(1),
  value6: z.string().min(1),
  description7: z.string().min(1),
  value7: z.string().min(1),
  description8: z.string().min(1),
  value8: z.string().min(1),
  description9: z.string().min(1),
  value9: z.string().min(1),
  description10: z.string().min(1),
  value10: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Specifications | null;
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
      description: '',
      value: '',
      description2: '',
      value2: '',
      description3: '',
      value3: '',
      description4: '',
      value4: '',
      description5: '',
      value5: '',
      description6: '',
      value6: '',
      description7: '',
      value7: '',
      description8: '',
      value8: '',
      description9: '',
      value9: '',
      description10: '',
      value10: '',
    }
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      //inittialData có nghĩa là khi dữ diệu ban đầu có nó sẽ đổi nut button thành save change 
     /* Khối mã chịu trách nhiệm thực hiện yêu cầu HTTP để cập nhật bảng quảng cáo hiện có
      hoặc tạo bảng quảng cáo mới dựa trên giá trị của `initialData`. */
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/specifications/${params.specificationsId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/specifications`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/specifications`);
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
      await axios.delete(`/api/${params.storeId}/specifications/${params.specificationsId}`);
      router.refresh();
      router.push(`/${params.storeId}/specifications`);
      toast.success('Billboard deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all specifications using this billboard first.');
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

          <div className="md:grid md:grid-cols-4 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
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
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>value</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
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
                  <FormLabel>Description2</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 2</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
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
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 3</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
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
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 4</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 5</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 5</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 6</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 6</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description7"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 7</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value7"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 7</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description8"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 8</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value8"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 8</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description9"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 9</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value9"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 9</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description10"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 10</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="value10"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value 10</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Specifications ..." {...field} />
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

"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { TaxRate, TaxType } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1),
  taxtype: z.string().min(1),
  description: z.string(),
  percentage: z.coerce.number().min(1),
  inclusive: z.boolean().default(false).optional(),
  active: z.boolean().default(false).optional(),
});

type TaxrateFormValues = z.infer<typeof formSchema>;

interface TaxrateFormProps {
  initialData: TaxRate | null;
}

export const TaxrateForm: React.FC<TaxrateFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const title = initialData ? "Edit tax rate" : "Create tax rate";
  const description = initialData ? "Edit a tax rate" : "Add a new tax rate";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<TaxrateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          name: initialData.name || "",
          description: initialData.description || "",
          taxtype: initialData.taxtype || "",
          percentage: parseFloat(String(initialData?.percentage)),
          active: initialData.active,
          inclusive: initialData.inclusive,
        }
      : {
          name: "",
          taxtype: "",
          percentage: 0,
          description: "",
          active: true,
          inclusive: false,
        },
  });

  const onSubmit = async (data: TaxrateFormValues) => {
    try {
      setLoading(true);
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/taxrate/${params.taxrateId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/taxrate`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                Tax rate{" "}
                <span className="font-bold">{response.data?.name}</span>{" "}
                updated.
              </p>
            );
          } else {
            return (
              <p>
                Tax rate <span className="font-bold">{data.name}</span> created.
              </p>
            );
          }
        }),
        {
          loading: "Updating tax rate...",
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/taxrate`);
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

  return (
    <>
      {/* update and create */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-4 gap-6 overflow-y-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Thuế</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên thuế ..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
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
                  <FormLabel>Mô tả thuế</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập mô tả thuế ..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxtype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại thuế</FormLabel>
                  <Select
                    disabled={loading || isEditing}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select TaxType"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(TaxType).map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => {
                const handleInputChange = (e: any) => {
                  const newValue = parseInt(e.target.value);
                  if (newValue >= 0 && newValue <= 100) {
                    // Nếu giá trị mới hợp lệ, cập nhật giá trị của field
                    if (field) {
                      field.onChange(e);
                    }
                  }
                };
                return (
                  <FormItem>
                    <FormLabel>Phần trăm thuế (0-100)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading || isEditing}
                        placeholder="Nhập phần trăm thuế ..."
                        {...field}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="active"
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
                    <FormLabel>Hoạt động</FormLabel>
                    <FormDescription>Ngừng hoặc mở thuế</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inclusive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                      disabled={loading || isEditing}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Bao gồm</FormLabel>
                    <FormDescription>Bao gồm hay độc quyền.</FormDescription>
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

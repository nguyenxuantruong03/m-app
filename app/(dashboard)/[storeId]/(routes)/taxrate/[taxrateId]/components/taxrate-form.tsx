"use client";

import * as z from "zod";
import axios from "axios";
import { ChangeEvent, useState } from "react";
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
import Recommend from "@/components/ui/recommend";

const formSchema = z.object({
  name: z.string().min(4, { message: "Nhập ít nhất 4 ký tự." }),
  taxtype: z.string().min(1, { message: "Hãy chọn 1 loại thuế." }),
  description: z.string().min(4, { message: "Nhập ít nhất 4 ký tự." }),
  percentage: z.coerce.number().min(1, { message: "Hãy nhập ít nhất 1%." }),
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
                  <FormLabel className="flex space-x-3 items-center">
                    Tên thuế
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Tên loại thuế là gì ?" />
                  </FormLabel>
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
                  <FormLabel className="flex space-x-3 items-center">
                    Mô tả thuế
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Giải thích sơ qua về thuế cần phải đóng." />
                  </FormLabel>
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
                  <FormLabel>
                    Loại thuế <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormLabel className="flex space-x-3 items-center">
                    Loại thuế
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Hãy lựa chọn loại thuế là VAT hoặc là thuế mua sắm." />
                  </FormLabel>
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
                const handleInputChange = (
                  e: ChangeEvent<HTMLInputElement>
                ) => {
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
                    <FormLabel className="flex space-x-3 items-center">
                      Phần trăm thuế
                      <span className="text-red-600 pl-1">(*)</span>
                      <Recommend message="Phần trăm thuế sẽ bắt đầu từ mốc 0% - 100%" />
                    </FormLabel>
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
                    <FormLabel className="flex space-x-3 items-center">
                      Hoạt động
                      <span className="text-red-600 pl-1">(*)</span>
                      <Recommend message="Mặc định thuế sễ ngừng nếu muốn hoạt động thì mở lên." />
                    </FormLabel>
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
                    <FormLabel className="flex space-x-3 items-center">
                    Bao gôm
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Xem thử loại thuế này do sản phẩm độc quyền hay do các nguyên nhân khác." />
                  </FormLabel>
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

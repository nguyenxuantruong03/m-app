"use client";

import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { SaleProduct } from "@/schemas/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Image as ImageData, Product, ProductDetail } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SaleProductFormValues = z.infer<typeof SaleProduct>;

interface ProductWithImages extends Product {
  images: ImageData[];
  productdetail: ProductDetail;
}

interface SalProductProps {
  id: string;
  label: string;
  valueTimeSaleStart?: Date | null;
  valueTimeSaleEnd?: Date | null;
  valueIsSale?: boolean;
  disabled: boolean;
  totalQuantity: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setData: Dispatch<SetStateAction<ProductWithImages[]>>;
}

export const FormSaleProduct = ({
  id,
  label,
  disabled,
  setLoading,
  valueTimeSaleStart,
  valueTimeSaleEnd,
  valueIsSale = false,
  setData,
  loading,
  totalQuantity,
}: SalProductProps) => {
  const form = useForm<SaleProductFormValues>({
    resolver: zodResolver(SaleProduct),
    defaultValues: {
      timeSaleStart: valueTimeSaleStart ? new Date(valueTimeSaleStart) : null,
      timeSaleEnd: valueTimeSaleEnd ? new Date(valueTimeSaleEnd) : null,
      isSale: valueIsSale,
    },
  });

  const [isModified, setIsModified] = useState(false);

  // Hàm kiểm tra thay đổi giá trị
  const checkIfModified = (newValues: SaleProductFormValues) => {
    const isSaleChanged = newValues.isSale !== valueIsSale;
    const timeSaleStartChanged =
      newValues.timeSaleStart?.toString() !== valueTimeSaleStart?.toString();
    const timeSaleEndChanged =
      newValues.timeSaleEnd?.toString() !== valueTimeSaleEnd?.toString();
    return isSaleChanged || timeSaleStartChanged || timeSaleEndChanged;
  };

  const onSubmit = async (data: SaleProductFormValues) => {
    if (!data.timeSaleStart || !data.timeSaleEnd) {
      toast.error("Start time and end time are required.");
      return;
    }

    if (data.timeSaleEnd < data.timeSaleStart) {
      toast.error("End time must be after start time.");
      return;
    }

    try {
      setLoading(true);
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/saleProduct`, {
        id,
        ...data,
      });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getAllProductNotQuery`
      );
      setData(response.data);
      toast.success("Product updated.");
    } catch (error: unknown) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onClear = async () => {
    try {
      setLoading(true);
      // Call the API to clear the sale for the product (if needed)
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/saleProduct/clear`,
        {
          data: { id },
        }
      );

      // Reset the form fields to their initial state
      form.reset({
        timeSaleStart: null,
        timeSaleEnd: null,
        isSale: false,
      });

      // Reset isModified state
      setIsModified(false);

      toast.success("Cleared.");
    } catch (error) {
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
        toast.error("Something went wrong!");
      }
    } finally{
      setLoading(false);
    }
  };

  // Theo dõi sự thay đổi của form
  useEffect(() => {
    const subscription = form.watch((newValues) => {
      // Đảm bảo rằng `timeSaleStart` và `timeSaleEnd` không phải là `undefined`
      const checkedValues = {
        ...newValues,
        timeSaleStart: newValues.timeSaleStart ?? null, // Gán null nếu timeSaleStart là undefined
        timeSaleEnd: newValues.timeSaleEnd ?? null, // Gán null nếu timeSaleEnd là undefined
      };
      setIsModified(checkIfModified(checkedValues));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Inside your FormSaleProduct component
  useEffect(() => {
    // Update the form state whenever valueIsSale changes
    form.setValue("isSale", valueIsSale);
  }, [valueIsSale, form]);

  return (
    <>
      {totalQuantity === 0 ? (
        <span className="text-red-500 font-semibold">Out of stock...</span>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="rounded-xl p-2 bg-slate-900 bg-opacity-30">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900 shrink-0">{label}</p>
                <FormField
                  control={form.control}
                  name="isSale"
                  render={({ field }) => (
                    <Switch
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      disabled={disabled}
                    >
                      {field.value ? "On" : "Off"}
                    </Switch>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="timeSaleStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center text-slate-900">
                    Sale Start <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      disabled={loading}
                      value={
                        field.value
                          ? field.value instanceof Date
                            ? field.value.toISOString().slice(0, 16)
                            : field.value
                          : ""
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeSaleEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center text-slate-900">
                    Sale End <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      disabled={loading}
                      value={
                        field.value
                          ? field.value instanceof Date
                            ? field.value.toISOString().slice(0, 16)
                            : field.value
                          : ""
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isModified && (
              <div className="flex items-center space-x-2">
                <Button type="submit" variant="secondary" disabled={loading}>
                  {loading ? "Waiting..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  onClick={onClear}
                  variant="destructive"
                  disabled={loading}
                >
                  {loading ? "Waiting..." : "Clear"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}
    </>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
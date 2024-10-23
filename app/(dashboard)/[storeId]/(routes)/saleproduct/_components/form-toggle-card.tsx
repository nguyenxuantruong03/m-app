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
  valueTimeSale?: Date | null;
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
  valueTimeSale,
  valueIsSale = false,
  setData,
  loading,
  totalQuantity,
}: SalProductProps) => {
  const form = useForm<SaleProductFormValues>({
    resolver: zodResolver(SaleProduct),
    defaultValues: {
      timeSale: valueTimeSale ? new Date(valueTimeSale) : null,
      isSale: valueIsSale,
    },
  });

  const [isModified, setIsModified] = useState(false);

  // Hàm kiểm tra thay đổi giá trị
  const checkIfModified = (newValues: SaleProductFormValues) => {
    const isSaleChanged = newValues.isSale !== valueIsSale;
    const timeSaleChanged = newValues.timeSale?.toString() !== valueTimeSale?.toString();
    return isSaleChanged || timeSaleChanged;
  };

  const onSubmit = async (data: SaleProductFormValues) => {
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

  // Theo dõi sự thay đổi của form
  useEffect(() => {
    const subscription = form.watch((newValues) => {
      // Đảm bảo rằng `timeSale` không phải là `undefined`
      const checkedValues = {
        ...newValues,
        timeSale: newValues.timeSale ?? null, // Gán null nếu timeSale là undefined
      };
      setIsModified(checkIfModified(checkedValues));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);
  
  return (
    <>
      {totalQuantity === 0 ? (
        <span className="text-red-500 font-semibold">Out of stock...</span>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="rounded-xl p-2 bg-slate-900 bg-opacity-30">
              <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0 text-white">{label}</p>
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
              name="timeSale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Sale Time <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      disabled={loading}
                      value={
                        field.value
                          ? field.value instanceof Date
                            ? new Date(
                                field.value.getTime() - field.value.getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .slice(0, 16)
                            : field.value
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = e.target.value;
                        const parsedDate = Date.parse(dateValue);
                        field.onChange(isNaN(parsedDate) ? dateValue : new Date(parsedDate));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isModified && (
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
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

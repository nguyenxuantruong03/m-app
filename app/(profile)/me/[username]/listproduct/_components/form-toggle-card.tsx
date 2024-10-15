"use client";

import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { ToogleCardForm } from "@/schemas/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Image as ImageData, Product, ProductDetail } from "@prisma/client";

type ToogleCardFormValues = z.infer<typeof ToogleCardForm>;

interface ProductWithImages extends Product {
  images: ImageData[];
  productdetail: ProductDetail;
}

interface ToggleCardProps {
  id: string;
  labelPin: string;
  labelShowLive: string;
  valueisProductLivePin?: boolean;
  valueisProductShowLive?: boolean;
  disabled: boolean;
  totalQuantity: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<ProductWithImages[]>>;
}

export const FormToggleCard = ({
  id,
  labelPin,
  labelShowLive,
  disabled,
  setLoading,
  valueisProductLivePin = false,
  valueisProductShowLive = false,
  setData,
  totalQuantity,
}: ToggleCardProps) => {
  const form = useForm<ToogleCardFormValues>({
    resolver: zodResolver(ToogleCardForm),
    defaultValues: {
      isProductShowLive: valueisProductShowLive,
      isProductLivePin: valueisProductLivePin,
    },
  });

  // State to manage switch values
  const [isProductShowLive, setIsProductShowLive] = useState(
    valueisProductShowLive
  );
  const [isProductLivePin, setIsProductLivePin] = useState(
    valueisProductLivePin
  );

  const toggleSwitch = async (
    type: "isProductShowLive" | "isProductLivePin",
    checked: boolean
  ) => {
    const updatedData = {
      id,
      ...form.getValues(),
      [type]: checked,
    };

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/getAllProductNotQuery`,
        updatedData
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getAllProductNotQuery`
      );
      setData(response.data);
      toast.success("Product updated.");
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
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Effect to initialize switch state
  useEffect(() => {
    setIsProductShowLive(valueisProductShowLive);
    setIsProductLivePin(valueisProductLivePin);
  }, [valueisProductLivePin, valueisProductShowLive]);

  return (
    <>
      {totalQuantity === 0 ? (
        <span className="text-red-500 font-semibold">Out of stock...</span>
      ) : (
        <Form {...form}>
          <div className="space-y-2">
            <div className="rounded-xl p-2 bg-slate-900 bg-opacity-30">
              <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0 text-white">
                  {labelShowLive}
                </p>
                <Switch
                  onCheckedChange={(checked) => {
                    setIsProductShowLive(checked);
                    toggleSwitch("isProductShowLive", checked);
                  }}
                  checked={isProductShowLive}
                  disabled={disabled}
                >
                  {isProductShowLive ? "On" : "Off"}
                </Switch>
              </div>
            </div>

            <div className="rounded-xl p-2 bg-slate-900 bg-opacity-30">
              <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0 text-white">{labelPin}</p>
                <Switch
                  onCheckedChange={(checked) => {
                    setIsProductLivePin(checked);
                    toggleSwitch("isProductLivePin", checked);
                  }}
                  checked={isProductLivePin}
                  disabled={disabled}
                >
                  {isProductLivePin ? "On" : "Off"}
                </Switch>
              </div>
            </div>
          </div>
        </Form>
      )}
    </>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};

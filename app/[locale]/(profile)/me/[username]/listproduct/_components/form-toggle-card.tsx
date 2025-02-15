"use client";

import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToogleCardForm } from "@/schemas/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { getAllProductNotQuery } from "@/actions/client/products/get-products";
import { useTranslations } from "next-intl";

type ToogleCardFormValues = z.infer<typeof ToogleCardForm>;

interface ToggleCardProps {
  id: string;
  labelPin: string;
  labelShowLive: string;
  valueisProductLivePin?: boolean;
  valueisProductShowLive?: boolean;
  disabled: boolean;
  totalQuantity: number;
  setData: any;
}

export const FormToggleCard = ({
  id,
  labelPin,
  labelShowLive,
  disabled,
  valueisProductLivePin = false,
  valueisProductShowLive = false,
  setData,
  totalQuantity,
}: ToggleCardProps) => {
  const t = useTranslations()
  const [productLoading, setProductLoading] = useState<Record<string, boolean>>({});

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
      setProductLoading((prev) => ({
        ...prev,
        [id]: true, // Set the specific product as loading
      }));

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/getAllProductNotQuery`,
        updatedData
      );
      const product = await getAllProductNotQuery();

      setData(product);
      toast.success(t("profile.productUpdated"));
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    } finally {
      setProductLoading((prev) => ({
        ...prev,
        [id]: false, // Set the specific product as not loading
      }));
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
        <span className="text-red-500 font-semibold">{t("profile.outOfStock")}</span>
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
                  disabled={disabled || productLoading[id]}
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
                  disabled={disabled || productLoading[id]}
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

"use client";

import * as z from "zod";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
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
import { useTranslations } from "next-intl";

interface TaxrateFormProps {
  initialData: TaxRate | null;
}

export const TaxrateForm: React.FC<TaxrateFormProps> = ({ initialData }) => {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const formSchema = z.object({
    name: z.string().min(2, { message: t("taxrate.form.requiredName") }),
    taxtype: z.string().min(1, { message: t("taxrate.form.requiredTaxtype") }),
    description: z.string().min(2, { message: t("taxrate.form.requiredName") }),
    percentage: z.coerce.number().min(1, { message: t("taxrate.form.enterMinPrice") }),
    inclusive: z.boolean().default(false).optional(),
    active: z.boolean().default(false).optional(),
  });
  
  type TaxrateFormValues = z.infer<typeof formSchema>;

  const title = initialData ? t("taxrate.form.editTaxRate") : t("taxrate.form.createTaxRate");
  const description = initialData ? t("taxrate.form.editATaxRate") : t('taxrate.form.addNewTaxRate');
  const action = initialData ? t("action.saveChange") : t("action.create");

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
                {t("taxrate.form.taxRate")}
                <span className="font-bold">{response.data?.name}</span>{" "}
                {t("taxrate.form.updated")}.
              </p>
            );
          } else {
            return (
              <p>
                {t("taxrate.form.taxRate")} <span className="font-bold">{data.name}</span> {t('taxrate.form.created')}.
              </p>
            );
          }
        }),
        {
          loading: t("taxrate.form.updatingTaxRate"),
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
              return t("toastError.somethingWentWrong");
            }
          },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("name-input");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);


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
                    {t('taxrate.form.taxName')}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("taxrate.form.taxNamePrompt")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name-input"
                      disabled={loading}
                      placeholder={t("taxrate.form.enterTaxName")}
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
                  {t("taxrate.form.taxDescription")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("taxrate.form.taxDescriptionPrompt")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("taxrate.form.enterTaxDescription")}
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
                  <FormLabel className="flex space-x-3 items-center">
                  {t("taxrate.form.taxType")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("taxrate.form.taxTypePrompt")} />
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
                          placeholder={t("taxrate.form.selectTaxType")}
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
                    {t("taxrate.form.taxPercentage")}
                      <span className="text-red-600 pl-1">(*)</span>
                      <Recommend message={t("taxrate.form.taxPercentagePrompt")} />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading || isEditing}
                        placeholder={t("taxrate.form.enterTaxPercentage")}
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
                      {t("taxrate.form.activity")}
                      <span className="text-red-600 pl-1">(*)</span>
                      <Recommend message={t("taxrate.form.taxActivityPrompt")} />
                    </FormLabel>
                    <FormDescription>{t("taxrate.form.taxStatusOptions")}</FormDescription>
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
                    {t("taxrate.form.includes")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("taxrate.form.includesPrompt")} />
                  </FormLabel>
                    <FormDescription>{t("taxrate.form.includesExclusive")}.</FormDescription>
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

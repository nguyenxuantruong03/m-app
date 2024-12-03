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
import { getTaxRateForm, getTaxRateSchema } from "@/translate/translate-dashboard";

interface TaxrateFormProps {
  initialData: TaxRate | null;
  language: string;
}

export const TaxrateForm: React.FC<TaxrateFormProps> = ({ initialData,language }) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  //language
  const taxrateSchemaMessage = getTaxRateSchema(language)
  const taxrateFormMessage = getTaxRateForm(language)

  const formSchema = z.object({
    name: z.string().min(2, { message: taxrateSchemaMessage.requiredName }),
    taxtype: z.string().min(1, { message: taxrateSchemaMessage.requiredTaxtype }),
    description: z.string().min(2, { message: taxrateSchemaMessage.requiredName }),
    percentage: z.coerce.number().min(1, { message: taxrateSchemaMessage.enterMinPrice }),
    inclusive: z.boolean().default(false).optional(),
    active: z.boolean().default(false).optional(),
  });
  
  type TaxrateFormValues = z.infer<typeof formSchema>;

  const title = initialData ? taxrateSchemaMessage.editTaxRate : taxrateSchemaMessage.createTaxRate;
  const description = initialData ? taxrateSchemaMessage.editATaxRate : taxrateSchemaMessage.addNewTaxRate;
  const action = initialData ? taxrateSchemaMessage.saveChanges : taxrateSchemaMessage.create;

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
                {taxrateFormMessage.taxRate}
                <span className="font-bold">{response.data?.name}</span>{" "}
                {taxrateFormMessage.updated}.
              </p>
            );
          } else {
            return (
              <p>
                {taxrateFormMessage.taxRate} <span className="font-bold">{data.name}</span> {taxrateFormMessage.created}.
              </p>
            );
          }
        }),
        {
          loading: taxrateFormMessage.updatingTaxRate,
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
              return taxrateFormMessage.somethingWentWrong;
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
                    {taxrateFormMessage.taxName}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={taxrateFormMessage.taxNamePrompt} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={taxrateFormMessage.enterTaxName}
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
                  {taxrateFormMessage.taxDescription}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={taxrateFormMessage.taxDescriptionPrompt} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={taxrateFormMessage.enterTaxDescription}
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
                  {taxrateFormMessage.taxType}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={taxrateFormMessage.taxTypePrompt} />
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
                          placeholder={taxrateFormMessage.selectTaxType}
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
                    {taxrateFormMessage.taxPercentage}
                      <span className="text-red-600 pl-1">(*)</span>
                      <Recommend message={taxrateFormMessage.taxPercentagePrompt} />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading || isEditing}
                        placeholder={taxrateFormMessage.enterTaxPercentage}
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
                      {taxrateFormMessage.activity}
                      <span className="text-red-600 pl-1">(*)</span>
                      <Recommend message={taxrateFormMessage.taxActivityPrompt} />
                    </FormLabel>
                    <FormDescription>{taxrateFormMessage.taxStatusOptions}</FormDescription>
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
                    {taxrateFormMessage.includes}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={taxrateFormMessage.includesPrompt} />
                  </FormLabel>
                    <FormDescription>{taxrateFormMessage.includesExclusive}.</FormDescription>
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

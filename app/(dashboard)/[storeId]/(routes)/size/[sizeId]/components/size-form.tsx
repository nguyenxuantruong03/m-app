"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Size } from "@prisma/client";
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
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import Recommend from "@/components/ui/recommend";
import { getSizeForm } from "@/translate/translate-dashboard";

interface SizeFormProps {
  initialData: Size | null;
  language: string;
}

export const SizeForm: React.FC<SizeFormProps> = ({
  initialData,
  language,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //language
  const sizeFormMessage = getSizeForm(language)

  const title = initialData ? sizeFormMessage.editSize : sizeFormMessage.createSize;
  const description = initialData ? sizeFormMessage.editASize : sizeFormMessage.addANewSize;
  const action = initialData ? sizeFormMessage.saveChanges : sizeFormMessage.create;

  const formSchema = z.object({
    name: z.string().min(2, { message: sizeFormMessage.requiredTwoCharacters }),
    value: z.string().min(1, { message: sizeFormMessage.requiredOneCharacter }),
  });

  type SizeFormValues = z.infer<typeof formSchema>;

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/size/${params.sizeId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/size`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                {sizeFormMessage.size} <span className="font-bold">{response.data?.name}</span>{" "}
                {sizeFormMessage.updated}.
              </p>
            );
          } else {
            return (
              <p>
                {sizeFormMessage.size} <span className="font-bold">{data.name}</span> {sizeFormMessage.create}.
              </p>
            );
          }
        }),
        {
          loading: sizeFormMessage.updatingSize,
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/size`);
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
              return sizeFormMessage.somethingWentWrong;
            }
          },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/size/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/size`);
      toast.success(sizeFormMessage.sizeDeleted);
    } catch (error: unknown) {
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
        toast.error(
          sizeFormMessage.somethingWentWrong
        );
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        languageToUse={language}
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {sizeFormMessage.name}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={sizeFormMessage.sizeNameExample}/>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={sizeFormMessage.namePlaceholder}
                      {...field}
                    />
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
                  <FormLabel className="flex space-x-3 items-center">
                  {sizeFormMessage.shortName}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={sizeFormMessage.shortNameExample} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={sizeFormMessage.value}
                      {...field}
                    />
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

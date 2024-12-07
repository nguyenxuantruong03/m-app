"use client";
import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Color } from "@prisma/client";
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
import { ChromePicker } from "react-color";
import Recommend from "@/components/ui/recommend";
import { getColorForm } from "@/translate/translate-dashboard";

interface ColorFormProps {
  initialData: Color | null;
  language: string
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData,language }) => {
  const params = useParams();
  const router = useRouter();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //language
  const colorFormMessage = getColorForm(language)

  const title = initialData ? colorFormMessage.editColor : colorFormMessage.createColor;
  const description = initialData ? colorFormMessage.editAColor : colorFormMessage.addNewColor;
  const action = initialData ? colorFormMessage.saveChanges : colorFormMessage.create;

  const formSchema = z.object({
    name: z.string().min(2,{message: colorFormMessage.enterAtLeast2Characters}),
    value: z.string().min(1).regex(/^#/, {
      message: colorFormMessage.enterValidHexCode,
    }),
  });
  
  type ColorFormValues = z.infer<typeof formSchema>;

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/color/${params.colorId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/color`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                {colorFormMessage.color} <span className="font-bold">{response.data?.name}</span>{" "}
                {colorFormMessage.updated}.
              </p>
            );
          } else {
            return (
              <p>
                {colorFormMessage.color} <span className="font-bold">{data.name}</span> {colorFormMessage.created}.
              </p>
            );
          }
        }),
        {
          loading: colorFormMessage.updatingColor,
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/color`);
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } }).response &&
              (error as { response: { data?: { error?: string } } }).response.data &&
              (error as { response: { data: { error?: string } } }).response.data.error
            ) {
              return (error as { response: { data: { error: string } } }).response.data.error
            } else {
              return colorFormMessage.somethingWrong;
            }
          },
        }
      );
    } catch (error) {} 
      finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/color/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/color`);
      toast.success(colorFormMessage.colorDeleted);
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data.error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error((error as { response: { data: { error: string } } }).response.data.error);
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(
          colorFormMessage.somethingWrong
        );
      }
    } finally {
      setLoading(false);
      setOpen(false);
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
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    {colorFormMessage.name} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={colorFormMessage.colorName} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name-input"
                      disabled={loading}
                      placeholder={colorFormMessage.enterName}
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
                    {colorFormMessage.color} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={colorFormMessage.colorDescription} />
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        disabled={loading}
                        placeholder={colorFormMessage.enterColor}
                        onFocus={() => setShowColorPicker(true)} // Khi Input được focus, hiển thị ColorPicker
                        {...field}
                      />
                      {!showColorPicker && ( // Hiển thị div chỉ khi ColorPicker không được hiển thị
                        <div
                          className="border p-4 rounded-full cursor-pointer"
                          style={{ backgroundColor: field.value }}
                          onClick={() => setShowColorPicker(true)} // Khi div được click, hiển thị ColorPicker
                        />
                      )}
                      {showColorPicker && ( // Hiển thị ColorPicker khi showColorPicker là true
                        <div className="absolute top-[195px]">
                          <ChromePicker
                            disableAlpha={true}
                            color={field.value}
                            onChange={(color) =>
                              form.setValue("value", color.hex)
                            }
                            onChangeComplete={() => {
                              setTimeout(() => setShowColorPicker(false), 5000); // Đặt hẹn giờ 3 giây để đóng ColorPicker
                            }}
                          />
                        </div>
                      )}
                    </div>
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

"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/type";
import { Button } from "@/components/ui/button";
import axios from "axios";
import * as z from "zod";
import { toast } from "react-hot-toast";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import Recommend from "@/components/ui/recommend";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal, X } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  description: z.string().min(2, { message: "Nhập ít nhất 2 ký tự." }),
  imagereturnProduct: z.object({ url: z.string() }).array(),
});

type ReturnProductFormValues = z.infer<typeof formSchema>;

interface ReturnProductProps {
  order: Order | undefined;
  onClose: () => void;
  user: any;
}

export const ReturnProduct: React.FC<ReturnProductProps> = ({
  order,
  onClose,
  user,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [charCount, setCharCount] = useState(0); // State to track character count
  const [loading, setLoading] = useState(false);

  const form = useForm<ReturnProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      imagereturnProduct: [],
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!order) {
    return null;
  }

  const onSubmit = async (values: ReturnProductFormValues) => {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/return-product`,
        {
          orderId: order.id,
          description: values.description,
          imagereturnProduct: values.imagereturnProduct,
        }
      );

      toast.success("Đơn hàng đã gửi trả thành công!");
    } catch (error: unknown) {
      if (
        (error as { response?: { order?: { error?: string } } }).response &&
        (error as { response: { order?: { error?: string } } }).response
          .order &&
        (error as { response: { order: { error?: string } } }).response.order
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { order: { error: string } } }).response.order
            .error
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
      onClose();
    }
  };


  return (
    <>
      {order.returnProduct ? (
        <>
          <div className="flex items-center justify-end ">
            <X
              className="w-8 h-8 hover:bg-gray-400 hover:bg-opacity-30 text-white rounded-full p-2 cursor-pointer"
              onClick={() => onClose()}
            />
          </div>
          <span className="text-white">
            Thông tin sản phẩm trả hàng đã được gửi đến cửa hàng. Bạn chờ trong
            1 ngày để shipper đến nhận. Nếu chưa được phản hồi liên hệ{" "}
            <Link href="tel:0352261103" className="underline">
              0352261103
            </Link>
          </span>
        </>
      ) : (
        <>
          <div className="flex items-center justify-end">
            <X
              className="w-8 h-8 hover:bg-gray-400 hover:bg-opacity-30 text-white rounded-full p-2 cursor-pointer"
              onClick={() => onClose()}
            />
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <FormField
                  control={form.control}
                  name="imagereturnProduct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex space-x-3 items-center w-full">
                        <span className="text-white">Hình ảnh sản phẩm</span>
                        <span className="text-red-600 pl-1">(*)</span>
                        <Recommend message="Hãy chụp 5 ảnh sản phẩm bị lỗi." />
                      </FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value.map((image) => image.url)}
                          disabled={loading}
                          onChange={(url) => {
                            if (field.value.length < 5) {
                              field.onChange([...field.value, { url }]);
                            } else {
                              toast.error("Chỉ chọn 5 ảnh sản phẩm rõ nét.");
                            }
                          }}
                          onRemove={(url) =>
                            field.onChange([
                              ...field.value.filter(
                                (current) => current.url !== url
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    const handleInputChange = (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const value = e.target.value;
                      if (value.length <= 120) {
                        // Ensure max length of 120
                        field.onChange(value);
                        setCharCount(value.length); // Update character count
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel className="flex space-x-3 items-center w-full">
                          <span className="text-white">
                            Mô tả chi tiết trả hàng
                          </span>
                          <span className="text-red-600 pl-1">(*)</span>
                          <Recommend message="Mô tả ngắn về sản phẩm cần trả." />
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Nhập mô tả chi tiết trả hàng ..."
                            className="text-white"
                            value={field.value}
                            onChange={handleInputChange} // Use the custom handler
                          />
                        </FormControl>
                        <div className="text-white mt-1 text-sm">
                          {charCount} / 120 ký tự
                        </div>{" "}
                        {/* Character count display */}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="flex items-center justify-end space-x-3">
                  <Button disabled={loading} onClick={onClose}>
                    Cancel
                  </Button>

                  <Button
                    disabled={loading}
                    type="submit"
                    variant="destructive"
                  >
                    <span className="flex items-center">
                      Gửi <SendHorizontal className="w-5 h-5 ml-1" />
                    </span>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </>
  );
};
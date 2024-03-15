"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Coupon, Duration, ImageCoupon } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { format } from "date-fns";

const formSchema = z.object({
  name: z.string().min(1),
  imagecoupon: z.object({ url: z.string() }).array(),
  duration: z.string().min(1),
  description: z.string(),
  percent: z.coerce.number().min(1),
  durationinmoth: z.coerce.number().nullable().optional(),
  maxredemptions: z.coerce.number().min(1),
  redeemby: z.union([z.date().nullable(), z.string().nullable()]),
});

type CouponFormValues = z.infer<typeof formSchema>;

interface CouponFormProps {
  initialData:
    | (Coupon & {
        imagecoupon: ImageCoupon[];
      })
    | null;
}

export const CouponForm: React.FC<CouponFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Coupon updated." : "Coupon created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          name: initialData.name || "",
          description: initialData.description || "",
          duration: initialData.duration || "",
          percent: parseFloat(String(initialData?.percent)),
          durationinmoth: parseFloat(String(initialData?.durationinmoth)) || 0,
          maxredemptions: parseFloat(String(initialData?.maxredemptions)),
          imagecoupon: initialData.imagecoupon.map((image) => ({
            url: image.url,
          })),
          redeemby: initialData.redeemby
            ? new Date(initialData.redeemby)
            : null,
        }
      : {
          name: "",
          duration: "",
          durationinmoth: 0,
          imagecoupon: [],
          maxredemptions: 0,
          percent: 0,
          redeemby: null,
          description: "",
        },
  });

  const onSubmit = async (data: CouponFormValues) => {
    try {
      setLoading(true);
      //inittialData có nghĩa là khi dữ diệu ban đầu có nó sẽ đổi nut button thành save change
      /* Khối mã chịu trách nhiệm thực hiện yêu cầu HTTP để cập nhật bảng quảng cáo hiện có
      hoặc tạo bảng quảng cáo mới dựa trên giá trị của `initialData`. */
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/coupon/${params.couponId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/coupon`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/coupon`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/coupon/${params.couponId}`);
      router.refresh();
      router.push(`/${params.storeId}/coupon`);
      toast.success("Coupon deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all coupon using this product first.");
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
          <FormField
            control={form.control}
            name="imagecoupon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh giảm giá</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-4 gap-6 overflow-y-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên giảm giá</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên giảm giá ..."
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
                  <FormLabel>Mô tả giảm giá</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập mô tả giảm giá ..."
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
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Khoảng thời gian (Nếu chọn forever hoặc once thì không điền
                    durationinmoth)
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
                          placeholder="Select Duration"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Duration).map((item) => (
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
              name="percent"
              render={({ field }) => {
                const handleInputChange = (e: any) => {
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
                    <FormLabel>Phần trăm khuyến mãi (0-100)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading || isEditing}
                        placeholder="Nhập phần trăm khuyến mãi ..."
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
              name="durationinmoth"
              render={({ field }) => {
                // Hàm xác định giá trị mặc định là 0 nếu field không tồn tại
                const handleInputChange = (e: any) => {
                  const newValue = parseInt(e.target.value);

                  if (newValue >= 0 && newValue <= 12) {
                    // Nếu giá trị mới hợp lệ, cập nhật giá trị của field
                    if (field) {
                      field.onChange(e);
                    }
                  }
                };
                return (
                  <FormItem>
                    <FormLabel>
                      Khoảng thời gian trong tháng(0-12) (Nếu chọn forever hoặc
                      once thì không điền durationinmoth)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading || isEditing}
                        placeholder="Nhập phần khoảng thời gian trong tháng ..."
                        value={field.value ?? 0}
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
              name="maxredemptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng tối đa được giảm giá</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading || isEditing}
                      placeholder="Nhập số lượng tối đa được giảm giá ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="redeemby"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời gian hết hạn</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={loading || isEditing}
                      value={
                        field.value // Kiểm tra nếu field.value không phải là null
                          ? isEditing
                            ? field.value instanceof Date
                              ? field.value.toISOString().split("T")[0] // Cho patch
                              : field.value // Nếu không phải Date, trả về giá trị hiện tại
                            : format(new Date(field.value), "yyyy-MM-dd") // Cho post
                          : "" // Giá trị mặc định nếu field.value là null
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
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

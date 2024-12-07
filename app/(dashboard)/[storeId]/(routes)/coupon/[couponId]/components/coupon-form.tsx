"use client";

import * as z from "zod";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash, Check } from "lucide-react";
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
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";
import Image from "next/image";
import Recommend from "@/components/ui/recommend";
import { getCouponForm } from "@/translate/translate-dashboard";

interface CouponFormProps {
  initialData:
    | (Coupon & {
        imagecoupon: ImageCoupon[];
      })
    | null;
  language: string;
}

export const CouponForm: React.FC<CouponFormProps> = ({
  initialData,
  language,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  //language
  const couponFormMessage = getCouponForm(language);

  const title = initialData
    ? couponFormMessage.editCoupon
    : couponFormMessage.createCoupon;
  const description = initialData
    ? couponFormMessage.editCouponDescription
    : couponFormMessage.addCoupon;
  const action = initialData
    ? couponFormMessage.saveChanges
    : couponFormMessage.create;

  // Khởi tạo state cho lựa chọn duration
  const [selectedDuration, setSelectedDuration] = useState<Duration | null>(
    initialData ? initialData.duration : null
  );

  // Sử dụng useEffect để theo dõi thay đổi trong lựa chọn duration
  useEffect(() => {
    // Cập nhật state khi lựa chọn duration thay đổi
    setSelectedDuration(initialData ? initialData.duration : null);
  }, [initialData]);

  const formSchema = z.object({
    name: z.string().min(2, { message: couponFormMessage.minLength }),
    imagecoupon: z.object({ url: z.string() }).array(),
    duration: z.string().min(2, { message: couponFormMessage.minLength }),
    description: z.optional(
      z.string().min(2, {
        message: couponFormMessage.minLength,
      })
    ),
    percent: z.coerce
      .number()
      .min(1, { message: couponFormMessage.minPercentage }),
    durationinmoth: z.optional(
      z.coerce.number().min(0, {
        message: couponFormMessage.minMonths,
      })
    ),
    maxredemptions: z.coerce
      .number()
      .min(1, { message: couponFormMessage.minPeople }),
    redeemby: z.union([z.date().nullable(), z.string().nullable()]),
  });

  type CouponFormValues = z.infer<typeof formSchema>;

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
      const now = new Date();
      const redeembyDate =
        typeof data.redeemby === "string"
          ? new Date(data.redeemby)
          : data.redeemby;

      if (redeembyDate && redeembyDate < now) {
        toast.error(couponFormMessage.expirationNotPast);
        return;
      }
      setLoading(true);
      let promise;
      let imageUrl: string[] = [];
      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/coupon/${params.couponId}`,
          data
        );
        imageUrl = data.imagecoupon?.map((item) => item.url) || [];
      } else {
        promise = axios.post(`/api/${params.storeId}/coupon`, data);
        imageUrl = data.imagecoupon?.map((item) => item.url) || [];
      }

      const response = await promise;

      let message: React.ReactNode;
      if (initialData) {
        message = (
          <p>
            {couponFormMessage.coupon}{" "}
            <span className="font-bold">{response?.data.name}</span>{" "}
            {couponFormMessage.updated}. {couponFormMessage.discountPercentage}:{" "}
            <span className="font-bold">{response?.data.percent}%</span>.{" "}
            {couponFormMessage.maxQuantity}:{" "}
            <span className="font-bold">{response?.data.maxredemptions}</span>{" "}
            {couponFormMessage.repeatPeople}:{" "}
            <span className="font-bold">{response?.data.durationinmoth}</span>{" "}
            {couponFormMessage.months}.
          </p>
        );
      } else {
        message = (
          <p>
            {couponFormMessage.coupon}{" "}
            <span className="font-bold">{data.name}</span>{" "}
            {couponFormMessage.created}. {couponFormMessage.discountPercentage}:{" "}
            <span className="font-bold">{data.percent}%</span>.{" "}
            {couponFormMessage.maxQuantity}:{" "}
            <span className="font-bold">{data.maxredemptions}</span>{" "}
            {couponFormMessage.repeatPeople}:{" "}
            <span className="font-bold">{data.durationinmoth}</span>{" "}
            {couponFormMessage.months}.
          </p>
        );
      }

      let title: React.ReactNode;
      if (initialData) {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
              {couponFormMessage.couponUpdated}
            </p>
            <span className="text-gray-500">
              {response.data?.createdAt
                ? format(
                    utcToZonedTime(
                      new Date(new Date(response.data?.createdAt)),
                      vietnamTimeZone
                    ),
                    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                    { locale: viLocale }
                  )
                : null}
            </span>
          </div>
        );
      } else {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-4 h-4 rounded-full bg-green-500 text-white mx-1" />
              {couponFormMessage.couponCreated}
            </p>
            <span className="text-gray-500">
              {response.data?.createdAt
                ? format(
                    utcToZonedTime(
                      new Date(new Date(response.data?.createdAt)),
                      vietnamTimeZone
                    ),
                    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                    { locale: viLocale }
                  )
                : null}
            </span>
          </div>
        );
      }

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } border-2 border-green-500 max-w-3xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-2">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                {imageUrl.slice(0, 10).map((url, index) => (
                  <span
                    key={index}
                    className="avatar-overlapping-multiple-image"
                  >
                    <Image
                      className="avatar-image-overlapping-multiple-image rounded-full"
                      src={url}
                      alt=""
                      width="50"
                      height="50"
                    />
                  </span>
                ))}
              </div>
              <div className="ml-3 flex-1">
                <p>{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {couponFormMessage.close}
            </button>
          </div>
        </div>
      ));
      router.refresh();
      router.push(`/${params.storeId}/coupon`);
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
        toast.error(couponFormMessage.somethingWentWrong);
      }
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
      toast.success(couponFormMessage.couponDeleted);
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
          couponFormMessage.somethingWentWrong
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
          <FormField
            control={form.control}
            name="imagecoupon"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex space-x-3 items-center">
                  {couponFormMessage.discountImage}
                  <span className="text-red-600 pl-1">(*)</span>
                  <Recommend message={couponFormMessage.selectDiscountImage} />
                </FormLabel>
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
                    language={language}
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
                  <FormLabel className="flex space-x-3 items-center">
                  {couponFormMessage.couponName} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={couponFormMessage.couponNameDescription}/>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name-input"
                      disabled={loading}
                      placeholder={couponFormMessage.enterCouponName}
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
                  <FormLabel>{couponFormMessage.couponDescription}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={couponFormMessage.enterCouponDescription}
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
                  {couponFormMessage.durationDescription}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <Select
                    disabled={loading || isEditing}
                    onValueChange={(value) => {
                      // Cập nhật state khi người dùng thay đổi lựa chọn duration
                      setSelectedDuration(value as Duration);
                      // Gọi hàm onChange để cập nhật giá trị vào form
                      field.onChange(value);
                    }}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={couponFormMessage.selectDuration}
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

            {selectedDuration !== Duration.forever &&
              selectedDuration !== Duration.once &&
              selectedDuration && (
                <FormField
                  control={form.control}
                  name="durationinmoth"
                  render={({ field }) => {
                    // Hàm xác định giá trị mặc định là 0 nếu field không tồn tại
                    const handleInputChange = (
                      e: ChangeEvent<HTMLInputElement>
                    ) => {
                      const newValue = parseInt(e.target.value);

                      // Kiểm tra nếu giá trị mới hợp lệ và field tồn tại
                      if (
                        !isNaN(newValue) &&
                        newValue >= 0 &&
                        newValue <= 12 &&
                        field
                      ) {
                        // Cập nhật giá trị của field
                        field.onChange(e);
                      } else {
                        // Nếu không hợp lệ, gán giá trị mặc định là 0
                        field.onChange(0);
                      }
                    };
                    return (
                      <FormItem>
                        <FormLabel>
                        {couponFormMessage.durationInMonthsDescription}
                          <span className="text-red-600 pl-1">(*)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading || isEditing}
                            placeholder={couponFormMessage.enterDurationInMonths}
                            value={field.value ?? 0}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

            <FormField
              control={form.control}
              name="percent"
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
                    <FormLabel>
                    {couponFormMessage.promotionPercentageDescription}
                      <span className="text-red-600 pl-1">(*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading || isEditing}
                        placeholder={couponFormMessage.enterPromotionPercentage}
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
              name="maxredemptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  {couponFormMessage.maxDiscountQuantity}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading || isEditing}
                      placeholder={couponFormMessage.enterMaxDiscountQuantity}
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
                  <FormLabel>
                  {couponFormMessage.expirationTime}
                    <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      disabled={loading || isEditing}
                      value={
                        field.value // Kiểm tra nếu field.value không phải là null
                          ? isEditing
                            ? field.value instanceof Date
                              ? field.value.toISOString().slice(0, 16) // Cắt bỏ phần giây và nano giây
                              : field.value // Nếu không phải Date, trả về giá trị hiện tại
                            : format(
                                new Date(field.value),
                                "yyyy-MM-dd'T'HH:mm"
                              ) // Định dạng ngày và giờ cho post
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

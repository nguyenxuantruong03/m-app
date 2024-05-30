"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
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
import {
  ShippingRates,
  TaxBehavior,
  Unit,
  ShippingTaxcode,
} from "@prisma/client";

const formSchema = z
  .object({
    name: z.string().min(4, { message: "Nhập ít nhất 4 ký tự." }),
    taxbehavior: z.string().min(1, { message: "Hãy chọn 1 taxbehavior." }),
    amount: z.coerce.number().min(500, { message: "Hãy nhập ít nhấp 500 đồng." }),
    unitmin: z.string().min(1, { message: "Hãy nhập ít nhất 1 tiếng." }),
    valuemin: z.coerce.number().min(1, { message: "Hãy chọn giờ hoặc ngày." }),
    unitmax: z.string().min(1, { message: "Hãy nhập ít nhất 1 tiếng." }),
    valuemax: z.coerce.number().min(1, { message: "Hãy chọn giờ hoặc ngày." }),
    taxcode: z.string().min(1, { message: "Hãy chọn 1 loại taxcode." }),
    active: z.boolean().default(false).optional(),
  })
  .refine(
    (data) => data.valuemax > data.valuemin,
    {
      message: "Thời gian tối đa phải lớn hơn thời gian tối thiểu.",
      path: ["valuemax"], // indicate that the error should be shown at the valuemax field
    }
  );

type ShippingRatesFormValues = z.infer<typeof formSchema>;

interface ShippingRatesFormProps {
  initialData: ShippingRates | null;
}

const mapTaxCodeToName = (taxCode: string) => {
  switch (taxCode) {
    case "txcd_00000000":
      return "Nontaxable";
    case "txcd_92010001":
      return "Shipping";
    default:
      return "";
  }
};

export const ShippingRatesForm: React.FC<ShippingRatesFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;
  const [disableActive, setDisableActive] = useState(true);
  const [unitMinValue, setUnitMinValue] = useState<string>(initialData ? initialData.unitmin : "");
  const [valueMinSelected, setValueMinSelected] = useState<boolean>(!!initialData?.valuemin);
  const [unitMinSelected, setUnitMinSelected] = useState<boolean>(!!initialData?.unitmin);

  // Sử dụng useEffect để kiểm tra khi component được tạo và cập nhật trạng thái active
  useEffect(() => {
    // Nếu initialData không tồn tại (không có dữ liệu ban đầu), có nghĩa là bạn đang tạo mới
    if (!initialData) {
      setDisableActive(true); // Vô hiệu hóa trường active
    } else {
      setDisableActive(false); // Mở trường active
    }
  }, [initialData]); // Sử dụng initialData làm dependency để useEffect chạy khi initialData thay đổi

  const title = initialData ? "Edit shipping rates" : "Create shipping rates";
  const description = initialData
    ? "Edit a shipping rates"
    : "Add a new shipping rates";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ShippingRatesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          name: initialData.name || "",
          taxbehavior: initialData.taxbehavior || "",
          amount: parseFloat(String(initialData?.amount)),
          unitmin: initialData.unitmin || "",
          valuemin: parseFloat(String(initialData?.valuemin)),
          unitmax: initialData.unitmax || "",
          valuemax: parseFloat(String(initialData?.valuemax)),
          active: initialData.active || undefined,
          taxcode: initialData.taxcode || "",
        }
      : {
          name: "",
          taxbehavior: "",
          amount: 0,
          unitmin: "",
          valuemin: 0,
          unitmax: "",
          valuemax: 0,
          taxcode: "",
          active: true || undefined,
        },
  });

  const onSubmit = async (data: ShippingRatesFormValues) => {
    try {
      setLoading(true);
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/shippingrates/${params.shippingratesId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/shippingrates`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                Shipping rates <span className="font-bold">{response.data?.name}</span> updated.
              </p>
            );
          } else {
            return (
              <p>
                Shipping rates <span className="font-bold">{data.name}</span> created.
              </p>
            );
          }
        }),
        {
          loading: "Updating shipping rates...",
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/shippingrates`);
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
              return "Something went wrong.";
            }
          },
        }
      );
    } catch (error) {} 
      finally {
      setLoading(false);
    }
  };

  const handleUnitMinChange = (value: string) => {
    setUnitMinValue(value);
    form.setValue('unitmin', value);
    setUnitMinSelected(!!value);
  };

  const handleValueMinChange = (value: number) => {
    form.setValue('valuemin', value);
    setValueMinSelected(value > 0);
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
                  <FormLabel>Tên giao hàng <span className="text-red-600 pl-1">(*)</span></FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên giao hàng ..."
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
              name="amount"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Số tiền <span className="text-red-600 pl-1">(*)</span></FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading || isEditing}
                        placeholder="Nhập số tiền ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="taxbehavior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hành vi thuế <span className="text-red-600 pl-1">(*)</span></FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Chọn hành vi thuế"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(TaxBehavior).map((item) => (
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
              name="valuemin"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Thời gian thấp nhất (Không quá 2400 giờ) <span className="text-red-600 pl-1">(*)</span></FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading || isEditing}
                        placeholder="Nhập phần thời gian thấp nhất ..."
                        {...field}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (!isNaN(value)) {
                            if (value <= 2400) { // Kiểm tra giá trị nhỏ hơn hoặc bằng 2400
                              field.onChange(value);
                              handleValueMinChange(value);
                            } else {
                              // Nếu giá trị lớn hơn 2400, không thay đổi giá trị
                              toast.error("Thời gian thấp nhất không được lớn hơn 2400 giờ");
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="unitmin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Đơn vị thấp nhất <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <Select
                    disabled={loading || isEditing}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleUnitMinChange(value);
                    }}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Unit Min"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Unit).map((item) => (
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
              name="valuemax"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Thời gian tối đa (Không quá 2400 giờ) <span className="text-red-600 pl-1">(*)</span></FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading || isEditing || !valueMinSelected || !unitMinSelected}
                        placeholder="Nhập phần thời gian tối đa ..."
                        {...field}
                        max={2400} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="unitmax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Đơn vị tối đa <span className="text-red-600 pl-1">(*)</span>
                  </FormLabel>
                  <Select
                    disabled={loading || isEditing || !valueMinSelected || !unitMinSelected}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Unit Max"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Unit)
                        .filter((item) => item === unitMinValue)
                        .map((item) => (
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
              name="taxcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Người chịu thuế <span className="text-red-600 pl-1">(*)</span></FormLabel>
                  <Select
                    disabled={loading || isEditing}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ShippingTaxcode">
                          {mapTaxCodeToName(field.value)}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ShippingTaxcode).map((item) => (
                        <SelectItem key={item} value={item}>
                          {mapTaxCodeToName(item)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
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
                      disabled={loading || disableActive} // Disable nếu đang thực hiện POST
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Hoạt động</FormLabel>
                    <FormDescription>Ngừng hoặc mở thuế</FormDescription>
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

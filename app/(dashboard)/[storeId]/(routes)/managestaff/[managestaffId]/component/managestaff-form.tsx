"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Check, Trash } from "lucide-react";
import {
  Degree,
  Gender,
  MaritalStatus,
  User,
  WorkingTime,
} from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/ui/image-upload";
import Image from "next/image";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
import MutipleSelectOption from "./mutiple-select";
import Recommend from "@/components/ui/recommend";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

const formSchema = z.object({
  email: z.string().min(1,{ message: "Bắt buộc nhập email" }),
  name: z.string().min(1,{ message: "Bắt buộc nhập name" }),
  numberCCCD: z.string().refine((value) => /^[0-9]+$/.test(value), {
    message: "Vui lòng nhập số CMND hợp lệ chỉ có số.",
  }),
  phonenumber: z.string().refine((value) => /^[0-9]+$/.test(value), {
    message: "Vui lòng nhập số điện thoại hợp lệ chỉ có số.",
  }),
  issued: z.string().min(4, { message: "Nhập ít nhất 4 ký tự." }),
  imageCredential: z.array(z.string()),
  gender: z.string().min(1, { message: "Bắt buộc chọn 1 gender." }),
  degree: z.string().min(1, { message: "Bắt buộc chọn 1 degree." }),
  maritalStatus: z
    .string()
    .min(1, { message: "Bắt buộc chọn 1 maritalStatus." }),
  workingTime: z.string().min(1, { message: "Bắt buộc chọn 1 workingTime." }),
  isCitizen: z.boolean().default(false).optional(),
  dateRange: z.date().nullable(),
  dateofbirth: z.union([z.date().nullable(), z.string().nullable()]),
  timestartwork: z.string().min(1, { message: "Hãy nhập giờ bắt đầu làm việc." }),
  urlimageCheckAttendance: z.optional(z.string().min(2,{message: "Nhập ít nhất 2 ký tự."})),
  codeNFC: z.optional(z.string().min(2,{message: "Nhập ít nhất 2 ký tự."})),
  image: z.optional(z.string().min(1,{message: "Hãy chọn 1 ảnh."})),
  daywork: z.array(z.string()),
  createdAt: z.date().nullable(),
});

type ManageStaffFormValues = z.infer<typeof formSchema>;
type Option = {
  value: string;
  label: string;
};

interface ManageStaffFormProps {
  initialData: User | null;
}

export const ManageStaffForm: React.FC<ManageStaffFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option[]>([]);

  const title = "Edit";
  const description = "Edit";
  const action = "Save changes";

  const form = useForm<ManageStaffFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      email: initialData?.email ?? null!,
      name: initialData?.name ?? null!,
      numberCCCD: initialData?.numberCCCD ?? null!,
      issued: initialData?.issued ?? null!,
      imageCredential: initialData?.imageCredential ?? null!,
      phonenumber: initialData?.phonenumber ?? null!,
      gender: initialData?.gender ?? null!,
      degree: initialData?.degree ?? null!,
      maritalStatus: initialData?.maritalStatus ?? null!,
      workingTime: initialData?.workingTime ?? null!,
      isCitizen: initialData?.isCitizen ?? null!,
      timestartwork: initialData?.timestartwork ?? null!,
      urlimageCheckAttendance: initialData?.urlimageCheckAttendance ?? null!,
      codeNFC: initialData?.codeNFC ?? null!,
      daywork: initialData?.daywork ?? null!,
      image: initialData?.image ?? null!,
      dateRange: initialData?.dateRange
        ? new Date(initialData?.dateRange)
        : null,
      dateofbirth: initialData?.dateofbirth
        ? new Date(initialData?.dateofbirth)
        : null,
    },
  });
  useEffect(() => {
    const dayNames: { [key: string]: string } = {
      Monday: "Thứ 2",
      Tuesday: "Thứ 3",
      Wednesday: "Thứ 4",
      Thursday: "Thứ 5",
      Friday: "Thứ 6",
      Saturday: "Thứ 7",
      Sunday: "Chủ Nhật"
    };
  
    setSelectedOption(
      (initialData?.daywork ?? []).map((daywork: string) => ({
        value: daywork,
        label: dayNames[daywork] // Sử dụng đối tượng dayNames để ánh xạ tên ngày
      }))
    );
  }, [initialData]);

  const onSubmit = async (data: ManageStaffFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/managestaff/${params.managestaffId}`,
          data
        );
      }
      let message: React.ReactNode;
      if (initialData) {
        message = (
          <p>
            ManageStaff <span className="font-bold">{data.name}</span> updated.
          </p>
        );
      }

      let title: React.ReactNode;
      if (initialData) {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
              ManageStaff updated!
            </p>
            <span className="text-gray-500">
              {data?.createdAt
                ? format(
                    utcToZonedTime(
                      new Date(new Date(data?.createdAt)),
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
          } border-2 border-green-500 max-w-xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={data.imageCredential[0] || data.image || ""}
                  alt=""
                  width="50"
                  height="50"
                />
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
              Close
            </button>
          </div>
        </div>
      ));
      router.refresh();
      router.push(`/${params.storeId}/managestaff`);
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
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/managestaff/${params.managestaffId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/managestaff`);
      toast.success("Color deleted.");
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
          "Make sure you removed all categories using this billboard first."
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
            name="imageCredential"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex space-x-3 items-center">
                    Hình ảnh <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Đây là hình ảnh nhân viên ảnh phông xanh." />
                  </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value} // Assuming field.value is an array of strings
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange(
                        field.value.filter((current) => current !== url)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-5 gap-8">
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Số điện thoại <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Số điện thoại của nhân viên tối đa 10 só." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      pattern="0[0-9]{9,10}"
                      disabled={loading}
                      placeholder="095348..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberCCCD"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Số CCDD <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Nhập tối đa 12 số giông với trong CCCD" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      pattern="^0\d{8}(\d{3})?$"
                      disabled={loading}
                      placeholder="0582356234..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Tên <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Tên nhân viên theo giấy khai sinh." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Họ và tên ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateofbirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Sinh nhật <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Dựa vào giấy khai sinh ghi chính xác sinh nhật để ưa đãi cho nhân viên." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={loading}
                      value={
                        field.value
                          ? field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : field.value
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = e.target.value;
                        const parsedDate = Date.parse(dateValue);
                        field.onChange(
                          isNaN(parsedDate) ? dateValue : new Date(parsedDate)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timestartwork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Thời gian bắt đầu làm việc <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Quan trọng: Liên quan đến điểm danh của nhân viên sẽ bắt đầu điểm danh vào mấy giờ." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      disabled={loading}
                      value={field.value ? field.value : ""}
                      onChange={(e) => {
                        const timeValue = e.target.value;
                        field.onChange(timeValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issued"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    CCCD cấp ở đâu <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Nơi căn cứ công dân được cấp. VD: Bộ cộng An Quận Bình Tân." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Bộ Công An Quận ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Ngày hết hạn CMND <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Thời gian Căn cước công dân hết hạn năm ở dưới ảnh hoặc dưới nơi cập." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={loading}
                      value={
                        field.value
                          ? field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : field.value
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = e.target.value;
                        const parsedDate = Date.parse(dateValue);
                        field.onChange(
                          isNaN(parsedDate) ? dateValue : new Date(parsedDate)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Giới tính <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Lựa chọn giới tính nhân viên." />
                  </FormLabel>
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
                          placeholder="Select Gender"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Gender).map((item) => (
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
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Bằng cấp <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Bắt buộc nhân viên cung cấp lương sẽ phù thuộc vào bằng cấp có được." />
                  </FormLabel>
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
                          placeholder="Select Degree"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Degree).map((item) => (
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
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Tính trạng hôn nhân <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Theo dõi tình trạng hôn nhân của nhân viên." />
                  </FormLabel>
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
                          placeholder="Select Marital Status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(MaritalStatus).map((item) => (
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
              name="workingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Thời gian làm việc <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Lựa chọn loại công việc bán thời gian hay fulltime." />
                  </FormLabel>
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
                          placeholder="Select Working Time"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(WorkingTime).map((item) => (
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
              name="urlimageCheckAttendance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Qr code nhân viên <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Mã này sẽ được cấp bởi quản lý để nhân viên điểm danh." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Mã qr ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codeNFC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    NFC Nhân viên <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Nhân viên sẽ được tích hợp NFC vào QrCode." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Mã NFC ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isCitizen"
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
                    Định danh <Recommend message="Xác nhận thông tin nhân viên đã cập nhật đầy đủ thông tin hay chưa." />
                  </FormLabel>
                    <FormDescription>Tài khoản xác thực</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
              control={form.control}
              name="daywork" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-3 items-center">
                    Thứ làm việc <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message="Lưu ý: Chọn đúng thứ ngày làm việc để nhân viên điểm danh. Nếu chọn sai nhân viên không thể điểm danh." />
                  </FormLabel>
                  <FormControl>
                   <MutipleSelectOption selectedOption={selectedOption} setSelectedOption={setSelectedOption} field={field} disabled={loading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

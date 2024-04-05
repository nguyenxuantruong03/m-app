"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
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
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

const formSchema = z.object({
  name: z.string().min(1),
  numberCCCD: z.string().refine((value) => /^[0-9]+$/.test(value), {
    message: "Vui lòng nhập số CMND hợp lệ chỉ có số.",
  }),
  phonenumber: z.string().refine((value) => /^[0-9]+$/.test(value), {
    message: "Vui lòng nhập số điện thoại hợp lệ chỉ có số.",
  }),
  issued: z.string().min(4,{message: "Nhập ít nhất 4 ký tự."}),
  imageCredential: z.array(z.string()),
  gender: z.string().min(1,{message: "Bắt buộc chọn 1 gender."}),
  degree: z.string().min(1,{message: "Bắt buộc chọn 1 degree."}),
  maritalStatus: z.string().min(1,{message: "Bắt buộc chọn 1 maritalStatus."}),
  workingTime: z.string().min(1,{message: "Bắt buộc chọn 1 workingTime."}),
  isCitizen: z.boolean().default(false).optional(),
  dateRange: z.date().nullable(),
  dateofbirth: z.union([z.date().nullable(), z.string().nullable()]),
  createdAt: z.date().nullable(),
});

type ManageStaffFormValues = z.infer<typeof formSchema>;

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

  const title = "Edit";
  const description = "Edit";
  const action = "Save changes";

  const form = useForm<ManageStaffFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      name: "",
      numberCCCD: "",
      issued: "",
      imageCredential: [],
      phonenumber: "",
      gender: "",
      degree: "",
      maritalStatus: "",
      workingTime: "",
      isCitizen: false,
      dateRange: initialData?.dateRange ? new Date(initialData?.dateRange) : null,
      dateofbirth: initialData?.dateofbirth
        ? new Date(initialData?.dateofbirth)
        : null,
    },
  });

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
                  src={data.imageCredential[0]}
                  alt=""
                  width={40}
                  height={40}
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
                <FormLabel>Hình ảnh</FormLabel>
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
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
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
                  <FormLabel>Số căn cước công dân</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
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
                  <FormLabel>Tên</FormLabel>
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
                  <FormLabel>Sinh nhật</FormLabel>
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
              name="issued"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cấp ở đâu</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Bộ Công An Quận Binh Tân ..."
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
                  <FormLabel>Ngày hết hạn CMND</FormLabel>
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
                  <FormLabel>Giới tính</FormLabel>
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
                  <FormLabel>Bằng cấp</FormLabel>
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
                  <FormLabel>Tính trạng hôn nhân</FormLabel>
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
                  <FormLabel>Thời gian làm việc</FormLabel>
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
              name="isCitizen"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Định danh</FormLabel>
                    <FormDescription>Tài khoản xác thực</FormDescription>
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

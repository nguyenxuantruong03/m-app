import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../../../../../../components/ui/button";
import { Input } from "../../../../../../components/ui/input";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Degree,
  Gender,
  MaritalStatus,
  WorkingTime,
} from "@prisma/client";

interface LabelFormProps {
  id: string;
  name: string | null;
  email: string | null;
  isCitizen: boolean | null;
  sentVeirifi: boolean | null;
  numberCCCD: string | null;
  timestartwork: string | null;
  issued: string | null;
  gender: string | null;
  degree: string | null;
  maritalStatus: string | null;
  phonenumber: string | null;
  workingTime: string | null;
  ban: boolean | null;
  role: string;
  image: string | null;
  urlimageCheckAttendance: string | null;
  codeNFC: string | null;
  daywork: string[];
  imageCredential: string[];
  dateRange: Date | null;
  dateofbirth: Date | null;
  data: string | null;
  setOpen: (open: boolean) => void;
  field:
  | "name"
  | "numberCCCD"
  | "phonenumber"
  | "dateRange"
  | "dateofbirth"
  | "timestartwork"
  | "issued"
  | "gender"
  | "workingTime"
  | "degree"
  | "maritalStatus";
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Bắt buộc nhập name." })
    .nullable()
    .optional(),
  email: z
    .string()
    .min(1, { message: "Bắt buộc nhập email." })
    .nullable()
    .optional(),
  role: z.string().min(1, { message: "Bạn thiếu role." }).nullable().optional(),
  numberCCCD: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) =>
        value === null || value === undefined || /^[0-9]*$/.test(value),
      {
        message: "Vui lòng nhập số CMND hợp lệ chỉ có số.",
      }
    ),
  phonenumber: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) =>
        value === null || value === undefined || /^[0-9]*$/.test(value),
      {
        message: "Vui lòng nhập số điện thoại hợp lệ chỉ có số.",
      }
    ),
  issued: z
    .string()
    .min(4, { message: "Nhập ít nhất 4 ký tự." })
    .nullable()
    .optional(),
  imageCredential: z.array(z.string()).nullable().optional(),
  image: z.string().min(1, { message: "Hãy thêm 1 ảnh" }).nullable().optional(),
  gender: z
    .string()
    .min(1, { message: "Bắt buộc chọn 1 gender." })
    .nullable()
    .optional(),
  degree: z
    .string()
    .min(1, { message: "Bắt buộc chọn 1 degree." })
    .nullable()
    .optional(),
  maritalStatus: z
    .string()
    .min(1, { message: "Bắt buộc chọn 1 maritalStatus." })
    .nullable()
    .optional(),
  workingTime: z
    .string()
    .min(1, { message: "Bắt buộc chọn 1 workingTime." })
    .nullable()
    .optional(),
  isCitizen: z.boolean().default(false).nullable().optional(),
  sentVeirifi: z.boolean().default(false).nullable().optional(),
  ban: z.boolean().default(false).nullable().optional(),
  dateRange: z.date().nullable().optional(),
  dateofbirth: z.union([z.date().nullable(), z.string().nullable()]).optional(),
  timestartwork: z
    .string()
    .min(1, { message: "Hãy nhập giờ bắt đầu làm việc." })
    .nullable()
    .optional(),
  urlimageCheckAttendance: z
    .string()
    .min(2, { message: "Nhập ít nhất 2 ký tự." })
    .nullable()
    .optional(),
  codeNFC: z
    .string()
    .min(2, { message: "Nhập ít nhất 2 ký tự." })
    .nullable()
    .optional(),
  daywork: z.array(z.string()).nullable().optional(),
});
type FormValues = z.input<typeof formSchema>;

const LabelForm: React.FC<LabelFormProps> = ({
  id,
  name,
  email,
  isCitizen,
  sentVeirifi,
  numberCCCD,
  timestartwork,
  issued,
  gender,
  degree,
  maritalStatus,
  phonenumber,
  workingTime,
  ban,
  role,
  image,
  urlimageCheckAttendance,
  codeNFC,
  daywork,
  imageCredential,
  dateRange,
  dateofbirth,
  data,
  field,
  setOpen,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      numberCCCD: numberCCCD || "",
      email: email || "",
      isCitizen: isCitizen || false,
      sentVeirifi: sentVeirifi || false,
      timestartwork: timestartwork || "",
      issued: issued || "",
      gender: gender || "",
      degree: degree || "",
      maritalStatus: maritalStatus || "",
      phonenumber: phonenumber || "",
      workingTime: workingTime || "",
      ban: ban || false,
      role: role || "",
      image: image || "",
      urlimageCheckAttendance: urlimageCheckAttendance || "",
      codeNFC: codeNFC || "",
      daywork: daywork || [],
      imageCredential: imageCredential || [],
      dateRange: dateRange || null,
      dateofbirth: dateofbirth || null,
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/managestaff/${id}`, datas);
      setLoading(false);
      setOpen(false);
      toast.success("Cập nhật thành công!");
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {field === "name" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập tên ..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {field === "phonenumber" && (
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Số điện thoại{" "}
                  <span className="text-red-600 pl-1">
                    (*) Nhập tối đa 11 số!
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    pattern="0[0-9]{9,10}"
                    disabled={loading}
                    placeholder="095348..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {field === "dateRange" && (
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Ngày hết hạn CMND{" "}
                  <span className="text-red-600 pl-1">(*)</span>
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
        )}

        {field === "dateofbirth" && (
          <FormField
            control={form.control}
            name="dateofbirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sinh nhật <span className="text-red-600 pl-1">(*)</span>
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
        )}

        {field === "timestartwork" && (
          <FormField
            control={form.control}
            name="timestartwork"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Thời gian bắt đầu làm việc{" "}
                  <span className="text-red-600 pl-1">(*)</span>
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
        )}

        {field === "numberCCCD" && (
          <FormField
            control={form.control}
            name="numberCCCD"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Số CCCD{" "}
                  <span className="text-red-600 pl-1">
                    (*) Nhập tối đa 12 số!
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    pattern="^0\d{8}(\d{3})?$"
                    disabled={loading}
                    placeholder="0582356234..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {field === "gender" && (
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Giới tính <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value || ""}
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
        )}

        {field === "degree" && (
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Bằng cấp <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value || ""}
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
        )}

        {field === "maritalStatus" && (
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tình trạng hôn nhân{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value || ""}
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
        )}

        {field === "workingTime" && (
          <FormField
            control={form.control}
            name="workingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Thời gian làm việc{" "}
                  <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value || ""}
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
        )}

        {field === "issued" && (
          <FormField
            control={form.control}
            name="issued"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Cấp ở đâu <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Bộ Công An Quận ..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button disabled={loading} className="ml-auto" type="submit">
          Save Change
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

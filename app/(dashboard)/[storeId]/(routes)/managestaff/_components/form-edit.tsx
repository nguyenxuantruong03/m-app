import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
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
import { ImageCredential } from "@/types/type";
import { getManageStaffForm, getManageStaffSchemaFormEdit } from "@/translate/translate-dashboard";

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
  imageCredential: ImageCredential[];
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
  language: string;
}

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
  language
}) => {
  const router = useRouter()
  const params = useParams();
  const [loading, setLoading] = useState(false);

  //language
  const managestaffSchemaFormeditMessage = getManageStaffSchemaFormEdit(language)
  const managestaffFormMessage = getManageStaffForm(language)

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: managestaffSchemaFormeditMessage.requiredName })
      .nullable()
      .optional(),
    email: z
      .string()
      .min(1, { message: managestaffSchemaFormeditMessage.requiredEmail })
      .nullable()
      .optional(),
    role: z.string().min(1, { message: managestaffSchemaFormeditMessage.missingRole }).nullable().optional(),
    numberCCCD: z
      .string()
      .nullable()
      .optional()
      .refine(
        (value) =>
          value === null || value === undefined || /^[0-9]*$/.test(value),
        {
          message: managestaffSchemaFormeditMessage.invalidIdCard,
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
          message: managestaffSchemaFormeditMessage.invalidPhone,
        }
      ),
    issued: z
      .string()
      .min(2, { message: managestaffSchemaFormeditMessage.minLength })
      .nullable()
      .optional(),
    imageCredential: z.object({ url: z.string() }).array(),
    image: z.string().min(1, { message: managestaffSchemaFormeditMessage.addImage }).nullable().optional(),
    gender: z
      .string()
      .min(1, { message: managestaffSchemaFormeditMessage.requiredGender })
      .nullable()
      .optional(),
    degree: z
      .string()
      .min(1, { message: managestaffSchemaFormeditMessage.requiredDegree })
      .nullable()
      .optional(),
    maritalStatus: z
      .string()
      .min(1, { message: managestaffSchemaFormeditMessage.requiredMaritalStatus })
      .nullable()
      .optional(),
    workingTime: z
      .string()
      .min(1, { message: managestaffSchemaFormeditMessage.requiredWorkingTime })
      .nullable()
      .optional(),
    isCitizen: z.boolean().default(false).nullable().optional(),
    sentVeirifi: z.boolean().default(false).nullable().optional(),
    ban: z.boolean().default(false).nullable().optional(),
    dateRange: z.date().nullable().optional(),
    dateofbirth: z.union([z.date().nullable(), z.string().nullable()]).optional(),
    timestartwork: z
      .string()
      .min(1, { message: managestaffSchemaFormeditMessage.requiredStartTime })
      .nullable()
      .optional(),
    urlimageCheckAttendance: z
      .string()
      .min(2, { message: managestaffSchemaFormeditMessage.minLength })
      .nullable()
      .optional(),
    codeNFC: z
      .string()
      .min(2, { message: managestaffSchemaFormeditMessage.minLength })
      .nullable()
      .optional(),
    daywork: z.array(z.string()).nullable().optional(),
  });
  type FormValues = z.input<typeof formSchema>;
  
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
      router.refresh()
      toast.success(managestaffFormMessage.updateSuccess);
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
        toast.error(managestaffFormMessage.somethingWentWrong)
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
                  {managestaffFormMessage.name} <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={managestaffFormMessage.enterName}
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
                {managestaffFormMessage.phoneNumber}
                  <span className="text-red-600 pl-1">
                  {managestaffFormMessage.maxPhoneNumberLength}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    pattern="0[0-9]{9,10}"
                    disabled={loading}
                    placeholder={managestaffFormMessage.samplePhoneNumber}
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
                {managestaffFormMessage.idCardExpiration}
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
                {managestaffFormMessage.birthday} <span className="text-red-600 pl-1">(*)</span>
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
                {managestaffFormMessage.startWorkingTime}
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
                {managestaffFormMessage.idCardNumber}
                  <span className="text-red-600 pl-1">
                  {managestaffFormMessage.maxIdCardLength}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    pattern="^0\d{8}(\d{3})?$"
                    disabled={loading}
                    placeholder={managestaffFormMessage.sampleIdCard}
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
                {managestaffFormMessage.gender} <span className="text-red-600 pl-1">(*)</span>
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
                        placeholder={managestaffFormMessage.selectGender}
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
                {managestaffFormMessage.degree} <span className="text-red-600 pl-1">(*)</span>
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
                        placeholder={managestaffFormMessage.selectDegree}
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
                {managestaffFormMessage.maritalStatus}
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
                        placeholder={managestaffFormMessage.selectMaritalStatus}
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
                {managestaffFormMessage.workingTime}
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
                        placeholder={managestaffFormMessage.selectWorkingTime}
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
                {managestaffFormMessage.issuedBy} <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={managestaffFormMessage.issuedByInfo}
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
        {managestaffFormMessage.saveChanges}
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

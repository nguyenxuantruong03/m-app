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
import { ImageCredential } from "@/types/type";
import { useTranslations } from "next-intl";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

type Option = {
  value: string;
  label: string;
};

interface ManageStaffFormProps {
  initialData: User | null;
  imageCredential: ImageCredential[] | null;
}

export const ManageStaffForm: React.FC<ManageStaffFormProps> = ({
  initialData,
  imageCredential,
}) => {
  const t = useTranslations()
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option[]>([]);

  const title = t("action.edit")
  const description = t("action.edit")
  const action = t("action.saveChange")

  const formSchema = z.object({
    email: z.string().min(1, { message: t("managestaff.form.requiredEmail") }),
    name: z.string().min(1, { message: t("managestaff.form.requiredName") }),
    numberCCCD: z.string().refine((value) => /^[0-9]+$/.test(value), {
      message: t("managestaff.form.validCmnd"),
    }),
    phonenumber: z.string().refine((value) => /^[0-9]+$/.test(value), {
      message: t("managestaff.form.validPhoneNumber"),
    }),
    issued: z.string().min(2, { message: t("managestaff.form.minLength2") }),
    imageCredential: z.object({ url: z.string() }).array(),
    gender: z.string().min(1, { message: t("managestaff.form.requiredGender") }),
    degree: z.string().min(1, { message: t("managestaff.form.requiredDegree") }),
    maritalStatus: z
      .string()
      .min(1, { message: t("managestaff.form.requiredMaritalStatus") }),
    workingTime: z.string().min(1, { message: t("managestaff.form.requiredWorkingTime") }),
    isCitizen: z.boolean().default(false).optional(),
    dateRange: z.date().nullable(),
    dateofbirth: z.union([z.date().nullable(), z.string().nullable()]),
    timestartwork: z
      .string()
      .min(1, { message: t("managestaff.form.enterStartWorkTime") }),
    urlimageCheckAttendance: z.optional(
      z.string().min(2, { message: t("managestaff.form.minLength2") })
    ),
    codeNFC: z.optional(
      z.string().min(2, { message: t("managestaff.form.minLength2") })
    ),
    image: z.optional(z.string().min(0, { message: t("managestaff.form.chooseImage") })),
    daywork: z.array(z.string()),
    createdAt: z.date().nullable(),
  });

  type ManageStaffFormValues = z.infer<typeof formSchema>;

  const form = useForm<ManageStaffFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      email: initialData?.email ?? null!,
      name: initialData?.name ?? null!,
      numberCCCD: initialData?.numberCCCD ?? null!,
      issued: initialData?.issued ?? null!,
      imageCredential:
        imageCredential && imageCredential.length > 0
          ? [{ url: imageCredential[0].url || "" }]
          : [],
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
      image: initialData?.image || undefined,
      dateRange: initialData?.dateRange
        ? new Date(initialData?.dateRange)
        : null,
      dateofbirth: initialData?.dateofbirth
        ? new Date(initialData?.dateofbirth)
        : null,
    },
  });
  useEffect(() => {
    setSelectedOption(
      (initialData?.daywork ?? []).map((daywork: string) => ({
        value: daywork,
        label:  t(`managestaff.form.${daywork}`), // Sử dụng đối tượng dayNames để ánh xạ tên ngày
      }))
    );
  }, [initialData]);

  const onSubmit = async (data: ManageStaffFormValues) => {
    if (data.imageCredential.length > 1) {
      toast.error(t("managestaff.form.selectOneRepresentative"));
      return;
    }
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
            {t("managestaff.form.manageStaff")} <span className="font-bold">{data.name}</span> {t("managestaff.form.updated")}.
          </p>
        );
      }

      let title: React.ReactNode;
      if (initialData) {
        title = (
          <div className="flex items-center justify-between text-sm">
            <p className="text-green-500 font-bold flex">
              <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
              {t("managestaff.form.manageStaffUpdated")}
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
                  src={
                    data.imageCredential[0]?.url
                      ? data.imageCredential[0]?.url
                      : data.image || ""
                  }
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
              t("action.close")
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
        toast.error(t("toastError.somethingWentWrong"));
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
      toast.success(t("managestaff.form.colorDeleted"));
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
          t("toastError.somethingWentWrong")
        );
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    // Kiểm tra xem input đã được render chưa và focus vào nó
    const inputElement = document.getElementById("phonenumber-input");
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
                  {t("managestaff.form.image")} <span className="text-red-600 pl-1">(*)</span>
                  <Recommend message={t("managestaff.form.employeeImage")} />
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={
                      Array.isArray(field.value)
                        ? field.value.map((image) => image.url)
                        : []
                    }
                    disabled={loading}
                    onChange={(url) => {
                      const updatedImages = Array.isArray(field.value)
                        ? [...field.value, { url }]
                        : [{ url }];
                      if (updatedImages.length <= 1) {
                        field.onChange(updatedImages);
                      } else {
                        toast.error(t("managestaff.form.selectOneClearImage"));
                      }
                    }}
                    onRemove={(url) => {
                      const updatedImages = Array.isArray(field.value)
                        ? field.value.filter((current) => current.url !== url)
                        : [];
                      field.onChange(updatedImages);
                    }}
                    maxFiles={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex space-x-3 items-center">
                  {t("managestaff.form.image")} <span className="text-red-600 pl-1">(*)</span>
                  <Recommend message={t("managestaff.form.employeeImage")} />
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []} // Chuyển string thành string[]
                    disabled={loading}
                    onChange={(url) => {
                      field.onChange(url); // Cập nhật trực tiếp thành string
                    }}
                    onRemove={() => {
                      field.onChange(""); // Xóa giá trị bằng chuỗi rỗng
                    }}
                    maxFiles={1} // Chỉ cho phép một tệp
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
                  {t("managestaff.form.phoneNumber")} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.phoneNumberMaxLength")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phonenumber-input"
                      type="tel"
                      pattern="0[0-9]{9,10}"
                      disabled={loading}
                      placeholder={t("managestaff.form.examplePhoneNumber")}
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
                  {t("managestaff.form.idCardNumber")} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.idCardNumberMaxLength")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      pattern="^0\d{8}(\d{3})?$"
                      disabled={loading}
                      placeholder={t("managestaff.form.exampleIdCardNumber")}
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
                  {t("managestaff.form.name")} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.nameDescription")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("managestaff.form.exampleName")}
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
                  {t("managestaff.form.birthday")} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.birthdayDescription")} />
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
                    {t("managestaff.form.workingStartTime")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.workingStartTimeDescription")} />
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
                  {t("managestaff.form.idCardIssued")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.idCardIssuedDescription")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("managestaff.form.exampleIdCardIssuer")}
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
                  {t("managestaff.form.idCardExpirationDate")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.idCardExpirationDescription")} />
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
                  {t("managestaff.form.gender")} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.genderDescription")}/>
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
                          placeholder={t("managestaff.form.selectGender")}
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
                    {t("managestaff.form.degree")} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.degreeDescription")} />
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
                          placeholder={t("managestaff.form.selectDegree")}
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
                  {t("managestaff.form.maritalStatus")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.maritalStatusDescription")} />
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
                          placeholder={t("managestaff.form.maritalStatusSelect")}
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
                  {t("managestaff.form.workingTime")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.workingTimeDescription")} />
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
                          placeholder={t("managestaff.form.workingTimeSelect")}
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
                  {t("managestaff.form.employeeQrCode")}
                    <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.qrCodeDescription")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("managestaff.form.qrCodeExample")} 
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
                  {t("managestaff.form.employeeNfc")} <span className="text-red-600 pl-1">(*)</span>
                    <Recommend message={t("managestaff.form.nfcDescription")} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("managestaff.form.nfPlaceholder")}
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
                    {t("managestaff.form.identityVerification")}
                      <Recommend message={t("managestaff.form.identityVerificationDescription")} />
                    </FormLabel>
                    <FormDescription>{t("managestaff.form.accountVerification")}</FormDescription>
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
                {t("managestaff.form.workingDay")} <span className="text-red-600 pl-1">(*)</span>
                  <Recommend message={t("managestaff.form.workingDayNote")}  />
                </FormLabel>
                <FormControl>
                  <MutipleSelectOption
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    field={field}
                    disabled={loading}
                  />
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

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
import { useState,useEffect } from "react";
import { getFavoriteNameForm } from "@/translate/translate-dashboard";

interface LabelFormPorps {
  data: string;
  id: string;
  value: string | null
  setOpen: (open: boolean) => void;
  language: string;
}

const LabelForm: React.FC<LabelFormPorps> = ({ data, id,setOpen,value,language }) => {
  const router = useRouter()
  const params = useParams();
  const [loading, setLoading] = useState(false);

  //language
  const favoriteNameFormMessage = getFavoriteNameForm(language)

  const formSchema = z.object({
    name: z.string().min(2, { message: favoriteNameFormMessage.minLength }),
    value: z.optional(z.string().min(2, { message: favoriteNameFormMessage.minLength})),
  });
  type FormValues = z.input<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data || "",
      value: value ||""
    },
  });

  // Hàm chuyển đổi từ name sang value
  const getNameValue = (name: string): string => {
    return name.toLowerCase().replace(/\s/g, '');
  };
  // Hiệu chỉnh giá trị value dựa trên giá trị của name khi người dùng nhập
  useEffect(() => {
    const name = form.watch("name"); // Lấy giá trị của trường name từ form
    const value = getNameValue(name); // Chuyển đổi name thành value

    form.setValue("value", value); // Cập nhật giá trị của trường value trong form
  }, [form.watch("name")]);

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/favorite/${id}`, datas);
      setLoading(false);
      setOpen(false)
      router.refresh()
      toast.success(favoriteNameFormMessage.updateSuccess);
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
        toast.error(favoriteNameFormMessage.somethingWentWrong);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {favoriteNameFormMessage.productName} <span className="text-red-600 pl-1">(*)</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder={favoriteNameFormMessage.enterProductName}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="ml-auto" type="submit">
        {favoriteNameFormMessage.saveChange}
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

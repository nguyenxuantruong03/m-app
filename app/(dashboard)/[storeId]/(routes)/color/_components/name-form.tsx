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
import { ChromePicker } from "react-color";

interface LabelFormProps {
  data: string;
  id: string;
  value: string;
  setOpen: (open: boolean) => void;
  name: string;
  field: "name" | "value";
}

const formSchema = z.object({
  name: z.optional(z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })),
  value: z.optional(z.string().min(2, { message: "Nhập ít nhất 2 ký tự." })),
});
type FormValues = z.input<typeof formSchema>;

const LabelForm: React.FC<LabelFormProps> = ({ data, id, setOpen, value, field,name }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      value: value || "",
    },
  });

  const onSubmit = async (datas: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/${params.storeId}/color/${id}`, datas);
      setLoading(false);
      setOpen(false);
      toast.success("Cập nhật thành công!");
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data.error
      ) {
        toast.error(
          (error as { response: { data: { error: string } } }).response.data.error
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
                  Tên sản phẩm <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập tên ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {field === "value" && (
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Màu <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <div>
                    <Input
                      disabled={loading}
                      placeholder="Enter color ..."
                      onFocus={() => setShowColorPicker(false)}
                      {...field}
                    />
                    {!showColorPicker && (
                      <div
                        className="border p-4 rounded-full cursor-pointer"
                        style={{ backgroundColor: field.value }}
                        onClick={() => setShowColorPicker(true)}
                      />
                    )}
                    {showColorPicker && (
                      <div className="absolute top-[195px]">
                        <ChromePicker
                          disableAlpha={true}
                          color={field.value}
                          onChange={(color) => form.setValue("value", color.hex)}
                          onChangeComplete={() => {
                            setTimeout(() => setShowColorPicker(false), 3500);
                          }}
                        />
                      </div>
                    )}
                  </div>
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

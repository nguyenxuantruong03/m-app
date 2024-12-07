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
import { ChromePicker } from "react-color";
import { getColorNameFormSheet } from "@/translate/translate-dashboard";

interface LabelFormProps {
  data: string;
  id: string;
  value: string;
  setOpen: (open: boolean) => void;
  name: string;
  field: "name" | "value";
  language: string
}

const LabelForm: React.FC<LabelFormProps> = ({ data, id, setOpen, value, field,name,language }) => {
  const router = useRouter()
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  //language
  const colorNameFormSheetMessage = getColorNameFormSheet(language)

  const formSchema = z.object({
    name: z.optional(z.string().min(2, { message: colorNameFormSheetMessage.minLength2 })),
    value: z.optional(z.string().min(2, { message: colorNameFormSheetMessage.minLength2 })),
  });
  type FormValues = z.input<typeof formSchema>;

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
      router.refresh()
      toast.success(colorNameFormSheetMessage.updateSuccess);
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
        toast.error(colorNameFormSheetMessage.somethingWrong);
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
                  {colorNameFormSheetMessage.productName} <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder={colorNameFormSheetMessage.enterProductName}
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
                {colorNameFormSheetMessage.color} <span className="text-red-600 pl-1">(*)</span>
                </FormLabel>
                <FormControl>
                  <div>
                    <Input
                      disabled={loading}
                      placeholder={colorNameFormSheetMessage.enterColor}
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
        {colorNameFormSheetMessage.saveChange}
        </Button>
      </form>
    </Form>
  );
};

export default LabelForm;

"use client";

import ImageUpload from "@/components/ui/upload-image-avatar";
import { useForm } from "react-hook-form";
import { UpdateImageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { image } from "@/actions/actions-signin-sign-up/uploadimage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";

interface FormUploadImageItem {
  classNamesForm?: string;
  classNamesUpload?: string
}

export const FormUploadImage: React.FC<FormUploadImageItem> = ({
  classNamesForm,
  classNamesUpload
}) => {
  const form = useForm<z.infer<typeof UpdateImageSchema>>({
    resolver: zodResolver(UpdateImageSchema),
    defaultValues: {
      imageCredential: [],
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateImageSchema>) => {
    image(values)
      .then((data) => {
        if (data.error) {
          toast.error("Tải ảnh lên không thành công");
        }
        if (data.success) {
          toast.success("Tải ảnh thành công");
          form.reset();
        }
      })
      .catch(() => {
        toast.error("Tải ảnh lên không thành công");
      });
  };
  return (
    <span className={classNamesForm}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full "
        >
          <FormField
            control={form.control}
            name="imageCredential"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                    classNamesUpload={classNamesUpload}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </span>
  );
};

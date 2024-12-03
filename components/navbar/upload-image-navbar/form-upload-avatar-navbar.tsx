"use client";

import UploadAvatarNavbar from "@/components/navbar/upload-image-navbar/upload-avatar-navbar";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { translateImageUpload } from "@/translate/translate-client";
interface FormUploadAvatarNavbarItem {
  languageToUse: string;
  classNamesForm?: string;
  classNamesUpload?: string;
}

export const FormUploadAvatarNavbar: React.FC<FormUploadAvatarNavbarItem> = ({
  classNamesForm,
  classNamesUpload,
  languageToUse,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //language
  const translateImageUploadMessage = translateImageUpload(languageToUse);

  const form = useForm<z.infer<typeof UpdateImageSchema>>({
    resolver: zodResolver(UpdateImageSchema),
    defaultValues: {
      imageCredential: [],
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateImageSchema>) => {
    setLoading(true);
    image(values,languageToUse)
      .then((data) => {
        if (data.error) {
          toast.error(translateImageUploadMessage.uploadFail);
        }
        if (data.success) {
          router.refresh();
          toast.success(translateImageUploadMessage.uploadSuccess);
          form.reset();
        }
      })
      .catch(() => {
        toast.error(translateImageUploadMessage.uploadFail);
      })
      .finally(() => setLoading(false));
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
                  <UploadAvatarNavbar
                    languageToUse={languageToUse}
                    value={field.value.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                    classNamesForm={classNamesUpload}
                    disabled={loading}
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

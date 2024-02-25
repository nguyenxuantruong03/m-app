"use client";

import { useForm } from "react-hook-form";
import { UpdateImageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { deleteimage } from "@/actions/actions-signin-sign-up/deleteimage";
import { Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation";

export const ForDeleteImage = () => {
  const form = useForm<z.infer<typeof UpdateImageSchema>>({
    resolver: zodResolver(UpdateImageSchema),
    defaultValues: {
      imageCredential: [],
    },
  });

  const router =useRouter()

  const onSubmit = (values: z.infer<typeof UpdateImageSchema>) => {
    deleteimage(values)
      .then((data) => {
        if (data.error) {
          toast.error("Xóa không thành công!");
        }
        if (data.success) {
          toast.success("Xóa thành công!");
          form.reset();
          router.refresh()
        }
      })
      .catch(() => {
        toast.error("Xóa không thành công!");
      });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="imageCredential"
          render={({ field }) => (
            <FormItem>
              <FormControl>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <button type="submit" className="w-full cursor-pointer flex">
         <Trash2 className="h-4 w-4 mr-2" />
          Xóa
        </button>
      </form>
    </Form>
  );
};

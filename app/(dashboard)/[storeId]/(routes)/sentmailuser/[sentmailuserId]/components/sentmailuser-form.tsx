"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { SentEmailUser } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import Tiptap from "@/components/tiptap/tiptap";

const formSchema = z.object({
  subject: z.string().min(1, {
    message: "Chưa nhập Subject!",
  }),
  description: z.string().min(1, {
    message: "Chưa nhập Description!",
  }),
});

type SentEmailUserFormValues = z.infer<typeof formSchema>;

interface SentEmailUserFormProps {
  initialData: SentEmailUser | null;
}

export const SentEmailUserForm: React.FC<SentEmailUserFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit sent" : "Create sent";
  const description = initialData ? "Edit a sent." : "Add a new sent";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SentEmailUserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          subject: "",
          description: "",
        },
  });

  const onSubmit = async (data: SentEmailUserFormValues) => {
    try {
      setLoading(true);
      let promise;

      if (initialData) {
        promise = axios.patch(
          `/api/${params.storeId}/sentmailuser/${params.sentmailuserId}`,
          data
        );
      } else {
        promise = axios.post(`/api/${params.storeId}/sentmailuser`, data);
      }

      await toast.promise(
        promise.then((response) => {
          if (initialData) {
            return (
              <p>
                Sent email user{" "}
                <span className="font-bold">{response.data?.subject}</span>{" "}
                updated.
              </p>
            );
          } else {
            return (
              <p>
                Sent email user <span className="font-bold">{data.subject}</span>{" "}
                created.
              </p>
            );
          }
        }),
        {
          loading: "Updating sent email user...",
          success: (message) => {
            router.refresh();
            router.push(`/${params.storeId}/sentmailuser`);
            return message;
          },
          error: (error: any) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              return error.response.data.error;
            } else {
              return "Something went wrong.";
            }
          },
        }
      );
    }catch (error: any) {} 
     finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/sentmailuser/${params.sentmailuserId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/sentmailuser`);
      toast.success("SentEmailUser deleted.");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(error.response.data.error);
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
          <div className="space-y-6 overflow-y-auto">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chủ đề </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập chủ đề ..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Tiptap
                      disabled={loading}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
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

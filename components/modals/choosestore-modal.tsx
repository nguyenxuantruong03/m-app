"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usechoosestoreModal } from "@/hooks/usechoosestoreModal";
import Modal from "../ui/modal";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(6),
});

export const ChoosestoreModal = () => {
  const t = useTranslations()

  const storeModal = usechoosestoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={t("store.createStore")}
      description={t("store.createStoreOrProduct")}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-p-4 pb-4 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("store.storeName")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("store.pleaseEnterStoreName")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('store.publicDisplayName')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex -items-center justify-end w-full">
              <Button
                disabled={loading}
                variant="outline"
                onClick={storeModal.onClose}
              >
                {t("action.cancel")}
              </Button>

              <Button disabled={loading} type="submit">
                {t("action.continue")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

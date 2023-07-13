"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usechoosestoreModal } from "@/app/hooks/usechoosestoreModal";
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
const formSchema = z.object({
  name: z.string().min(6),
});

export const ChoosestoreModal = () => {
  const storeModal = usechoosestoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value);
    //TODO: Create Store
  };

  return (
    <Modal
      title="Tạo cửa hàng"
      description="Hãy tạo quản lý cửa hàng hoặc sản phẩm"
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex -items-center justify-end w-full">
              <Button variant="outline" onClick={storeModal.onClose}>
                Cancel
              </Button>

              <Button type="submit">Continute</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

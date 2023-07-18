"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { BillboardDelivery } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  imageUrl: z.string().min(1),
});

type BillboardDeliveryFormValue = z.infer<typeof formSchema>;

interface BillboardDeliveryFormProps {
  initialData: BillboardDelivery | null;
}

const BillboardDeliveryForm: React.FC<BillboardDeliveryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit BillBoardDelivery" : "Create BillboardDelivery";
  const description = initialData ? "Edit a BillBoardDelivery" : "Add a new BillboardDelivery";
  const toastMessage = initialData ? "BillBoardDelivery updated" : "BillboardDelivery created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardDeliveryFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardDeliveryFormValue) => {
    try {
        setLoading(true)
        if(initialData){
            await axios.patch(`/api/${params.storeId}/billboarddelivery/${params.billboardDeliveryId}`)
        }else{
            await axios.post(`/api${params.storeId}/billboarddelivery`,data)
        }
        router.refresh();
        router.push(`/${params.storeId}/billboarddelivery`)
        toast.success(toastMessage)
    } catch (error) {
        toast.error("Something went wrong")
    }finally{
        setLoading (false)
    }
  };

  const onDelete = async () => {
    try {
        setLoading(true)
        await axios.delete(`/api/${params.storeId}/billboarddelivery/${params.billboardDeliveryId}`);
        router.refresh()
        router.push(`/${params.storeId}/billboarddelivery`)
        toast.success('Billboard deleted')
    } catch (error) {
        toast.error('Make sure you reemove all categories using this billboard first')
    }finally{
        setLoading(false)
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
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

export default BillboardDeliveryForm;

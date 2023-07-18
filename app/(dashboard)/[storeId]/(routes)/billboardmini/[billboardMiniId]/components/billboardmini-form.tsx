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
import { BillboardMini } from "@prisma/client";
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

type BillboardMiniFormValue = z.infer<typeof formSchema>;

interface BillboardMiniFormProps {
  initialData: BillboardMini | null;
}

const BillboardMiniForm: React.FC<BillboardMiniFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit BillBoardMini" : "Create BillboardMini";
  const description = initialData ? "Edit a BillBoardMini" : "Add a new BillboardMini";
  const toastMessage = initialData ? "BillBoardMini updated" : "BillboardMini created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardMiniFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardMiniFormValue) => {
    try {
        setLoading(true)
        if(initialData){
            await axios.patch(`/api/${params.storeId}/billboardmini/${params.billboardMiniId}`)
        }else{
            await axios.post(`/api${params.storeId}/billboardmini`,data)
        }
        router.refresh();
        router.push(`/${params.storeId}/billboardmini`)
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
        await axios.delete(`/api/${params.storeId}/billboardmini/${params.billboardMiniId}`);
        router.refresh()
        router.push(`/${params.storeId}/billboardmini`)
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

export default BillboardMiniForm;

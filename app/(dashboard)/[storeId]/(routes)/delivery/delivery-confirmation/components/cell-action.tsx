"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import * as z from "zod";
import {
  MoreHorizontal,
  PackageCheck,
  PackageX,
  Pin,
  SendHorizontal,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { OrderColumn } from "./columns";
import { Input } from "@/components/ui/input";
import "./style.css";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Recommend from "@/components/ui/recommend";
import ImageUpload from "@/components/ui/image-upload";

interface CellActionProps {
  data: OrderColumn;
}

const formSchema = z.object({
  imageCustomer: z.object({ url: z.string() }).array(),
});

type ComfirmOderDelivery = z.infer<typeof formSchema>;

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCustomImage, setOpenCustomImage] = useState(false);
  const [value, setValue] = useState<string>("");

  // Function to prevent closing modal when clicking inside modal content
  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const form = useForm<ComfirmOderDelivery>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageCustomer: [],
    },
  });

  const comfirmOderDelivery = async (values: ComfirmOderDelivery) => {
    if (data.updatedAt) {
      const createdAtDate = new Date(data.updatedAt); // Convert updatedAt to Date object
      const currentDate = new Date(); // Get the current date

      // Calculate the difference in milliseconds
      const diffInMilliseconds =
        currentDate.getTime() - createdAtDate.getTime();

      // Convert milliseconds to days
      const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

      // If more than 2 days have passed, show an error
      if (diffInDays > 2) {
        toast.error(
          "Đơn hàng đã quá hạn 2 ngày, không thể xác thực thành công."
        );
        return;
      }
    }
    try {
      setLoading(true);
      const promise = axios.patch(
        `/api/${params.storeId}/orders/delivery/delivery-success`,
        {
          orderId: data.id,
          imageCustomer: values.imageCustomer,
        }
      );
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              Đã giao thành công:
              <span className="font-bold">
                {data.email || data.emailcurrent} -{" "}
                <span className="font-bold">
                  {data.name || data.namecurrent}
                </span>
              </span>
              .
            </p>
          );
        }),
        {
          loading: "Updating stutus...",
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return "Đã xảy ra lỗi khi xác thực đơn hàng thành công.";
            }
          },
        }
      );
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xác thực đơn hàng thành công.");
    } finally {
      setLoading(false);
      setOpenCustomImage(false);
    }
  };

  const cancelOrder = async () => {
    if (data.updatedAt) {
      const createdAtDate = new Date(data.updatedAt); // Convert updatedAt to Date object
      const currentDate = new Date(); // Get the current date

      // Calculate the difference in milliseconds
      const diffInMilliseconds =
        currentDate.getTime() - createdAtDate.getTime();

      // Convert milliseconds to days
      const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

      // If more than 2 days have passed, show an error
      if (diffInDays > 2) {
        setLoading(true);
        toast.error("Đơn hàng đã quá hạn 2 ngày, không thể hủy đơn hàng.");
        return;
      }
    }
    setValue("");
    // Remove leading and trailing whitespace from value
    const trimmedValue = value.trim();

    // Check if the trimmed value is empty
    if (!trimmedValue) {
      toast.error("Hãy nhập nội dung trạng thái đơn hàng!");
      return;
    }

    try {
      setLoading(true);
      const promise = axios.patch(
        `/api/${params.storeId}/orders/delivery/cancel-order`,
        {
          orderId: data.id,
          value: trimmedValue,
        }
      );
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              Đã hủy thành công đơn hàng:
              <span className="font-bold">
                {data.email || data.emailcurrent} -{" "}
                <span className="font-bold">
                  {data.name || data.namecurrent}
                </span>
              </span>
              .
            </p>
          );
        }),
        {
          loading: "Updating stutus...",
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return "Đã xảy ra lỗi khi hủy đơn hàng.";
            }
          },
        }
      );
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi hủy đơn hàng.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const returnedProductReceived = async () => {
    try {
      setLoading(true);
      const promise = axios.patch(
        `/api/${params.storeId}/orders/delivery/returned-Product-Received`,
        {
          orderId: data.id,
        }
      );
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              Đã nhận sản phẩm trả lại:
              <span className="font-bold">
                {data.email || data.emailcurrent} -{" "}
                <span className="font-bold">
                  {data.name || data.namecurrent}
                </span>
              </span>
              .
            </p>
          );
        }),
        {
          loading: "Updating stutus...",
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } })
                .response &&
              (error as { response: { data?: { error?: string } } }).response
                .data &&
              (error as { response: { data: { error?: string } } }).response
                .data.error
            ) {
              return (error as { response: { data: { error: string } } })
                .response.data.error;
            } else {
              return "Đã xảy ra lỗi khi nhận đơn.";
            }
          },
        }
      );
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi nhận đơn.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user?.role === "ADMIN" || user?.role === "SHIPPER" ? (
            <>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {data.returnProduct ? (
                <DropdownMenuItem
                  disabled={loading}
                  onClick={returnedProductReceived}
                >
                  <PackageCheck className="h-4 w-4 mr-2" />
                  Đã nhận lại hàng
                </DropdownMenuItem>
              ) : (
                <>
                  {data.status !== "Da_giao" && (
                    <DropdownMenuItem
                      disabled={loading}
                      onClick={() => setOpenCustomImage(true)}
                    >
                      <PackageCheck className="h-4 w-4 mr-2" />
                      Đã giao
                    </DropdownMenuItem>
                  )}
                  {data.status !== "Da_huy" && (
                    <DropdownMenuItem
                      disabled={loading}
                      onClick={() => setOpen(true)}
                    >
                      <PackageX className="h-4 w-4 mr-2" />
                      Hủy đơn hàng (lý do)
                    </DropdownMenuItem>
                  )}
                  {data.address !== "" &&
                    data.address !== "Trống" &&
                    data.deliveryMethod !== "pickup" && (
                      <DropdownMenuItem
                        disabled={loading}
                        onClick={() =>
                          router.push(`/${params.storeId}/orders/${data.id}`)
                        }
                      >
                        <Pin className="h-4 w-4 mr-2" />
                        Địa chỉ
                      </DropdownMenuItem>
                    )}
                </>
              )}
            </>
          ) : (
            <>
              <DropdownMenuLabel>Trống</DropdownMenuLabel>{" "}
            </>
          )}
        </DropdownMenuContent>

        {openCustomImage && (
          <>
            <div className="fixed inset-0 bg-black/80 h-full w-full z-40" />
            <div className="absolute inset-0 m-auto h-max w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-50">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(comfirmOderDelivery)}
                  className="space-y-8 w-full"
                >
                  <FormField
                    control={form.control}
                    name="imageCustomer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex space-x-3 items-center w-full">
                          <span className="text-white">Hình ảnh đã giao</span>
                          <span className="text-red-600 pl-1">(*)</span>
                          <Recommend message="Hãy chụp 2 ảnh sản phẩm đã giao." />
                        </FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value.map((image) => image.url)}
                            disabled={loading}
                            onChange={(url) => {
                              if (field.value.length < 2) {
                                field.onChange([...field.value, { url }]);
                              } else {
                                toast.error("Chỉ chọn 2 ảnh sản phẩm rõ nét.");
                              }
                            }}
                            onRemove={(url) =>
                              field.onChange([
                                ...field.value.filter(
                                  (current) => current.url !== url
                                ),
                              ])
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end space-x-3">
                    <Button
                      disabled={loading}
                      onClick={() => setOpenCustomImage(false)}
                    >
                      Cancel
                    </Button>

                    <Button
                      disabled={loading}
                      type="submit"
                      variant="destructive"
                    >
                      <span className="flex items-center">
                        Gửi <SendHorizontal className="w-5 h-5 ml-1" />
                      </span>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </>
        )}

        {open && (
          <div className="overlay" onClick={() => setOpen(false)}>
            <div
              className="modal z-[999] rounded-md"
              onClick={handleModalClick}
            >
              <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Nhập lý do hủy đơn..."
                disabled={loading}
              />
              <div className="flex justify-between px-2 mt-3">
                <Button
                  disabled={loading}
                  onClick={cancelOrder}
                  className="dark:bg-black dark:text-white"
                >
                  Save
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => setOpen(false)}
                  className="dark:bg-black dark:text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </DropdownMenu>
    </>
  );
};

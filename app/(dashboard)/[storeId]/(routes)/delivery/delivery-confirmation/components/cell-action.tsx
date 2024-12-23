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
import { useEffect, useState } from "react";
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
import {
  getDeliveryComfirmationAction,
  getDeliveryConfirmationLocation,
} from "@/translate/translate-dashboard";

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

  //language
  const deliveryConfirmActionMessage = getDeliveryComfirmationAction(
    data.language
  );
  const deliveryConfirmationLocationMessage = getDeliveryConfirmationLocation(
    data.language
  );

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

  const getCurrentLocation = async () => {
    return new Promise<GeolocationPosition | null>((resolve, reject) => {
      if (!navigator.geolocation) {
        toast.error(deliveryConfirmationLocationMessage.geolocationUnsupported);
        resolve(null);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => {
            toast.error(
              deliveryConfirmationLocationMessage.unableToRetrieveLocation
            );
            reject(error);
          }
        );
      }
    });
  };

  const comfirmOderDelivery = async (values: ComfirmOderDelivery) => {
    if (!user?.isSharingLocation) {
      toast.error(deliveryConfirmationLocationMessage.enableLocation);
    }
    if (data.updatedAt) {
      const createdAtDate = new Date(data.updatedAt);
      const currentDate = new Date();
      const diffInMilliseconds =
        currentDate.getTime() - createdAtDate.getTime();
      const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

      if (diffInDays > 2) {
        toast.error(deliveryConfirmActionMessage.overdueOrder);
        return;
      }
    }

    try {
      setLoading(true);
      const position = await getCurrentLocation();
      const locationLatEnd = position?.coords.latitude;
      const locationLngEnd = position?.coords.longitude;

      if (!locationLatEnd || !locationLngEnd) {
        toast.error(
          deliveryConfirmationLocationMessage.unableToRetrieveLocationForDelivery
        );
        setLoading(false);
        return;
      }

      const promise = axios.patch(
        `/api/${params.storeId}/orders/delivery/delivery-success`,
        {
          orderId: data.id,
          imageCustomer: values.imageCustomer,
          locationLatEnd,
          locationLngEnd,
        }
      );

      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {deliveryConfirmActionMessage.deliveredSuccessfully}:
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
          loading: deliveryConfirmActionMessage.updatingStatus,
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
              return deliveryConfirmActionMessage.errorOccurred;
            }
          },
        }
      );
    } catch (error) {
      toast.error(deliveryConfirmActionMessage.errorOccurred);
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
        toast.error(deliveryConfirmActionMessage.overdueCancelOrder);
        return;
      }
    }
    setValue("");
    // Remove leading and trailing whitespace from value
    const trimmedValue = value.trim();

    // Check if the trimmed value is empty
    if (!trimmedValue) {
      toast.error(deliveryConfirmActionMessage.enterOrderStatus);
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
              {deliveryConfirmActionMessage.canceledSuccessfully}:
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
          loading: deliveryConfirmActionMessage.updatingStatus,
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
              return deliveryConfirmActionMessage.errorOccurred;
            }
          },
        }
      );
    } catch (error) {
      toast.error(deliveryConfirmActionMessage.errorOccurred);
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
              {deliveryConfirmActionMessage.returnedProductReceived}:
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
          loading: deliveryConfirmActionMessage.updatingStatus,
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
              return deliveryConfirmActionMessage.errorOccurred;
            }
          },
        }
      );
    } catch (error) {
      toast.error(deliveryConfirmActionMessage.errorOccurred);
    } finally {
      setLoading(false);
    }
  };

  //Bỏ pointer-event:none khi không có isAISheetOpen
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [open]);

  //Bỏ pointer-event:none khi không có isAISheetOpen
  useEffect(() => {
    if (!openCustomImage) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 500);
    }
  }, [openCustomImage]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">
              {deliveryConfirmActionMessage.openMenu}
            </span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user?.role === "ADMIN" || user?.role === "SHIPPER" ? (
            <>
              <DropdownMenuLabel>
                {deliveryConfirmActionMessage.actions}
              </DropdownMenuLabel>
              {data.returnProduct ? (
                <DropdownMenuItem
                  disabled={loading}
                  onClick={returnedProductReceived}
                >
                  <PackageCheck className="h-4 w-4 mr-2" />
                  {deliveryConfirmActionMessage.receivedReturnedGoods}
                </DropdownMenuItem>
              ) : (
                <>
                  {data.status !== "Da_giao" && (
                    <DropdownMenuItem
                      disabled={loading}
                      onClick={() => setOpenCustomImage(true)}
                    >
                      <PackageCheck className="h-4 w-4 mr-2" />
                      {deliveryConfirmActionMessage.delivered}
                    </DropdownMenuItem>
                  )}
                  {data.status !== "Da_huy" && (
                    <DropdownMenuItem
                      disabled={loading}
                      onClick={() => setOpen(true)}
                    >
                      <PackageX className="h-4 w-4 mr-2" />
                      {deliveryConfirmActionMessage.cancelOrderReason}
                    </DropdownMenuItem>
                  )}
                  {data.address !== "" &&
                    data.address !== "Trống" &&
                    data.deliveryMethod !== "pickup" && (
                      <DropdownMenuItem
                        disabled={loading}
                        onClick={() =>
                          router.push(`/${params.storeId}/delivery/${data.id}`)
                        }
                      >
                        <Pin className="h-4 w-4 mr-2" />
                        {deliveryConfirmActionMessage.address}
                      </DropdownMenuItem>
                    )}
                </>
              )}
            </>
          ) : (
            <>
              <DropdownMenuLabel>
                {deliveryConfirmActionMessage.empty}
              </DropdownMenuLabel>{" "}
            </>
          )}
        </DropdownMenuContent>

        {openCustomImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setOpenCustomImage(false)}
          >
            <div
              className="relative bg-white dark:bg-slate-900 p-4 rounded-lg"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the image
            >
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
                          <span className="text-slate-900 dark:text-white">
                            {deliveryConfirmActionMessage.deliveredImage}
                          </span>
                          <span className="text-red-600 pl-1">(*)</span>
                          <Recommend
                            message={
                              deliveryConfirmActionMessage.takeTwoDeliveredImages
                            }
                          />
                        </FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value.map((image) => image.url)}
                            disabled={loading}
                            onChange={(url) => {
                              if (field.value.length < 2) {
                                field.onChange([...field.value, { url }]);
                              } else {
                                toast.error(
                                  deliveryConfirmActionMessage.selectClearImages
                                );
                              }
                            }}
                            onRemove={(url) =>
                              field.onChange([
                                ...field.value.filter(
                                  (current) => current.url !== url
                                ),
                              ])
                            }
                            language={data.language}
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
                      {deliveryConfirmActionMessage.cancel}
                    </Button>

                    <Button
                      disabled={loading}
                      type="submit"
                      variant="destructive"
                    >
                      <span className="flex items-center">
                        {deliveryConfirmActionMessage.send}{" "}
                        <SendHorizontal className="w-5 h-5 ml-1" />
                      </span>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
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
                placeholder={deliveryConfirmActionMessage.enterCancelReason}
                disabled={loading}
              />
              <div className="flex justify-between px-2 mt-3">
                <Button
                  disabled={loading}
                  onClick={cancelOrder}
                  className="dark:bg-black dark:text-white"
                >
                  {deliveryConfirmActionMessage.save}
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => setOpen(false)}
                  className="dark:bg-black dark:text-white"
                >
                  {deliveryConfirmActionMessage.cancel}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DropdownMenu>
    </>
  );
};

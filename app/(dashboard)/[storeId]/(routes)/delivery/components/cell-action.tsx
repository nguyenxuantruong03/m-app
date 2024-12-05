"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Pin } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { OrderColumn } from "./columns";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getDelivery, getDeliverySharingLocation } from "@/translate/translate-dashboard";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);

  //language
  const deliveryMessage = getDelivery(data.language)
  const deliverySharingLocationMessage = getDeliverySharingLocation(data.language)

  const comfirmOrderDelivery = async () => {
    if(!user?.isSharingLocation){
      toast.error(deliverySharingLocationMessage.enableLocationForOrder)
    }
    try {
      setLoading(true);
      const promise = axios.patch(`/api/${params.storeId}/orders/delivery`, {
        orderId: data.id,
      });
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {deliveryMessage.receiveOrder}:
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
          loading: deliveryMessage.updatingStatus,
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
              return deliveryMessage.somethingWentWrong;
            }
          },
        }
      );
    } catch (error) {
      toast.error(deliveryMessage.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  const receiveReturn = async () => {
    if(!user?.isSharingLocation){
      toast.error(deliverySharingLocationMessage.enableLocationForReturn)
    }
    try {
      setLoading(true);
      const promise = axios.patch(
        `/api/${params.storeId}/orders/delivery/receive-return`,
        {
          orderId: data.id,
        }
      );
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {deliveryMessage.receiveReturnOrder}:
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
          loading: deliveryMessage.updatingStatus,
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
              return deliveryMessage.somethingWentWrong;
            }
          },
        }
      );
    } catch (error) {
      toast.error(deliveryMessage.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{deliveryMessage.openMenu}</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user?.role === "ADMIN" || user?.role === "SHIPPER" ? (
            <>
              <DropdownMenuLabel>{deliveryMessage.actions}</DropdownMenuLabel>
              {data.returnProduct ? (
                <DropdownMenuItem disabled={loading} onClick={receiveReturn}>
                  <Pin className="h-4 w-4 mr-2" />
                  {deliveryMessage.receiveReturnedGoods}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  disabled={loading}
                  onClick={comfirmOrderDelivery}
                >
                  <Pin className="h-4 w-4 mr-2" />
                  {deliveryMessage.receiveOrderPlaceholder}
                </DropdownMenuItem>
              )}
            </>
          ) : (
            <>
              <DropdownMenuLabel>{deliveryMessage.empty}</DropdownMenuLabel>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

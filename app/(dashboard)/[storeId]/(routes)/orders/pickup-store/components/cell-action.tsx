"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Home, MoreHorizontal, Pin } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { OrderColumn } from "./columns";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getOrderPickupStoreAction } from "@/translate/translate-dashboard";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);

  //language
  const orderPickupStoreActionMessage = getOrderPickupStoreAction(data.language)

  const reciveProductStore = async () => {
    try {
      setLoading(true);
      const promise = axios.post(`/api/${params.storeId}/orders/pickup-store`, {
        orderId: data.id,
      });
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {orderPickupStoreActionMessage.confirmOrderSuccessfully}:
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
          loading: orderPickupStoreActionMessage.updatingStatus,
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
              return orderPickupStoreActionMessage.somethingWentWrong;
            }
          },
        }
      );
    } catch (error) {
      toast.error(orderPickupStoreActionMessage.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{orderPickupStoreActionMessage.openMenu}</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user?.role === "ADMIN" || user?.role === "STAFF" ? (
            <>
              <DropdownMenuLabel>{orderPickupStoreActionMessage.actions}</DropdownMenuLabel>
              <DropdownMenuItem disabled={loading} onClick={reciveProductStore}>
                <Home className="h-4 w-4 mr-2" />
                {orderPickupStoreActionMessage.orderPreparedAtStore}
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel>{orderPickupStoreActionMessage.empty}</DropdownMenuLabel>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

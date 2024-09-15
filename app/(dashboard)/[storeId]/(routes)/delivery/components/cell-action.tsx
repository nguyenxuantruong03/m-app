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

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const comfirmOrderDelivery = async () => {
    try {
      setLoading(true);
      const promise = axios.patch(`/api/${params.storeId}/orders/delivery`, {
        orderId: data.id,
      });
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              Nhận đơn khách hàng:
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

  const receiveReturn = async () => {
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
              Nhận đơn khách hàng trả lại:
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
                <DropdownMenuItem disabled={loading} onClick={receiveReturn}>
                  <Pin className="h-4 w-4 mr-2" />
                  Nhận hàng trả
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  disabled={loading}
                  onClick={comfirmOrderDelivery}
                >
                  <Pin className="h-4 w-4 mr-2" />
                  Nhận đơn
                </DropdownMenuItem>
              )}
            </>
          ) : (
            <>
              <DropdownMenuLabel>Trống</DropdownMenuLabel>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

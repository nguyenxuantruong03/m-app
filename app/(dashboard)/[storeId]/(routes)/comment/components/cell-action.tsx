"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Ban, Lock, KeyRound } from "lucide-react";
import { CommentColumn } from "./column";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import SheetBanUser from "../../settingusers/components/sheet-ban";

interface CellActionProps {
  data: CommentColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const onBan = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/settingusers`, {
        data: { id: data.userId },
      });
      router.refresh();
      toast.success("Người dùng đã bị ban vĩnh viễn!");
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data.error
        );
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


  const UnBanUser = async () => {
    try {
      setLoading(true);
      const promise = axios.post(`/api/${params.storeId}/settingusers/unban`, {
        userId: data.userId,
      });
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              Unban:{" "}
              <span className="font-bold">
                {data.email} - <span className="font-bold">{data.name}</span>
              </span>
              .
            </p>
          );
        }),
        {
          loading: "Updating unban user...",
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
              return "Unban user Error.";
            }
          },
        }
      );
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cấm người dùng.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onBan}
        loading={loading}
      />
      <SheetBanUser
        email={data.email || ""}
        openSheet={openSheet}
        userId={data.userId || ""}
        setOpenSheet={setOpenSheet}
        name={data.name || ""}
        banTime={data.banExpiresTime}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Ban className="h-4 w-4 mr-2" />
            Ban Forever
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenSheet(true)}>
            <Lock className="h-4 w-4 mr-2" />
            Ban
          </DropdownMenuItem>
          <DropdownMenuItem onClick={UnBanUser}>
            <KeyRound className="h-4 w-4 mr-2" />
            UnBan
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

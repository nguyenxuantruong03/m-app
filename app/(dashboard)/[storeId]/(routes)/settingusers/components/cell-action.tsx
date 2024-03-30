"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash, Lock } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { SettingUsersColumn } from "./column";
import { KeyRound } from "lucide-react";

interface CellActionProps {
  data: SettingUsersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/settingusers", { data: { id: data.id } });
      router.refresh();
      toast.success("User deleted.");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(error.response.data.error);
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

  const BanUser = async () => {
    try {
      setLoading(true);
      const promise = axios.post("/api/settingusers", { userId: data.id });
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              Ban:{" "}
              <span className="font-bold">
                {data.email} - <span className="font-bold">{data.name}</span>
              </span>
              .
            </p>
          );
        }),
        {
          loading: "Updating ban user...",
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: any) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              return error.response.data.error;
            } else {
              return "Ban user Error.";
            }
          },
        }
      );
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const UnBanUser = async () => {
    try {
      setLoading(true);
      const promise = axios.post("/api/settingusers/unban", {
        userId: data.id,
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
          error: (error: any) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              return error.response.data.error;
            } else {
              return "Unban user Error.";
            }
          },
        }
      );
    } catch (error: any) {
    } finally {
      setLoading(false);
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
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={BanUser}>
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

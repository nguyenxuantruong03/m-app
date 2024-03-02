"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash,Lock } from "lucide-react";
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
      toast.error("Delete Error!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const BanUser = async () => {
    try {
      await axios.post("/api/settingusers", { userId: data.id });
      toast.success("Ban Success!");
      router.refresh();
    } catch (error) {
      toast.error("Ban Error!");
    }
  };

  const UnBanUser = async () => {
    try {
      await axios.post("/api/settingusers/unban", { userId: data.id });
      toast.success("Unban success!");
      router.refresh();
    } catch (error) {
      toast.error("Unban Error!");
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

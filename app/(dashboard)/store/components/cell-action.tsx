"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { StoreColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { translateStoreActions } from "@/translate/translate-dashboard";

interface CellActionProps {
  data: StoreColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  //languae
  const storeActionsMessage = translateStoreActions(data.language)
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(storeActionsMessage.storeIdCopied);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${data.id}`);
      router.refresh();
      toast.success(storeActionsMessage.storeDeleted);
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data.error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error((error as { response: { data: { error: string } } }).response.data.error);
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(storeActionsMessage.somethingWentWrong);
      }
    } finally {
      setLoading(false);
      setOpen(false);
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

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        languageToUse={data.language}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{storeActionsMessage.openMenu}</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{storeActionsMessage.actions}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            {storeActionsMessage.copyId}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/store/${data.id}`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {storeActionsMessage.update}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            {storeActionsMessage.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

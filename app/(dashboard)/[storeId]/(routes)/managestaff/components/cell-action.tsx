"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { CircleSlash, Copy, Edit, MoreHorizontal, Send, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { AlertModal } from "@/components/modals/alert-modal";
import { ManageStaffsColumn } from "./column";
import { getManageStaffAction } from "@/translate/translate-dashboard";

interface CellActionProps {
  data: ManageStaffsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  //language
  const manageStaffActionMessage = getManageStaffAction(data.language)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(manageStaffActionMessage.staffIdCopied);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/managestaff/${data.id}`);
      router.refresh();
      toast.success(manageStaffActionMessage.firedSuccessfully);
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
        toast.error(
          manageStaffActionMessage.somethingWentWrong
        );
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSentVerify = async () => {
    try {
      setLoading(true);
      let promise;

      if (data.sentVeirifi === true) {
        toast.error(manageStaffActionMessage.emailSent);
        setLoading(false);
        return;
      } else {
        const updatedData = { ...data, sentVeirifi: true };
        promise = axios.patch(
          `/api/${params.storeId}/managestaff`,
          updatedData
        );
      }

      await toast.promise(
        promise.then((response) => {
          const userEmail = response.data.userEmail;
          return `${manageStaffActionMessage.verificationEmailSentTo}: ${userEmail}`;
        }),
        {
          loading: manageStaffActionMessage.updatingVerificationEmail,
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              return error.response.data.error;
            } else {
              return manageStaffActionMessage.somethingWentWrong;
            }
          },
        }
      );
    } catch (error) {} 
      finally {
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
            <span className="sr-only">{manageStaffActionMessage.openMenu}</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{manageStaffActionMessage.actions}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            {manageStaffActionMessage.copyId}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/managestaff/${data.id}`)
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            {manageStaffActionMessage.update}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <CircleSlash className="h-4 w-4 mr-2" />
            {manageStaffActionMessage.fireStaff}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSentVerify}>
            <Send className="h-4 w-4 mr-2" />
            {manageStaffActionMessage.sentVerify}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

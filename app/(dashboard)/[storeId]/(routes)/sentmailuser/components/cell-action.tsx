"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Copy, Edit, MoreHorizontal, SendHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { SentEmailUserColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { translateSentEmailAction } from "@/translate/translate-dashboard";

interface CellActionProps {
  data: SentEmailUserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  //language
  const sentEmailActionMessage = translateSentEmailAction(data.language)

  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(sentEmailActionMessage.sentEmailUserIdCopied);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sentmailuser/${data.id}`);
      router.refresh();
      toast.success(sentEmailActionMessage.sentEmailUserDeleted);
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
        toast.error(sentEmailActionMessage.somethingWentWrong);
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSent = async () => {
    try {
      setLoading(true);
      const promise = axios.post(
        `/api/${params.storeId}/sentmailuser/${data.id}`,{sentuser:data.sentemailuser}
      );
      await toast.promise(
        promise.then(() => {
          return (
            <p>
              {sentEmailActionMessage.sentEmailWithSubject} <span className="font-bold">{data.subject}</span>.
            </p>
          );
        }),
        {
          loading: sentEmailActionMessage.updatingSentEmail,
          success: (message) => {
            router.refresh();
            return message;
          },
          error: (error: unknown) => {
            if (
              (error as { response?: { data?: { error?: string } } }).response &&
              (error as { response: { data?: { error?: string } } }).response.data &&
              (error as { response: { data: { error?: string } } }).response.data.error
            ) {
              return (error as { response: { data: { error: string } } }).response.data.error
            } else {
              return sentEmailActionMessage.sentEmailError;
            }
          },
        }
      );
    } catch (error) {
      toast.error(sentEmailActionMessage.somethingWentWrong);
    } 
      finally {
      setLoading(false);
      setOpen(false);
    }
  };

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
            <span className="sr-only">{sentEmailActionMessage.openMenu}</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{sentEmailActionMessage.actions}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            {sentEmailActionMessage.copyId}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/sentmailuser/${data.id}`)
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            {sentEmailActionMessage.update}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            {sentEmailActionMessage.delete}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSent}>
            <SendHorizontal className="h-4 w-4 mr-2" />
            {sentEmailActionMessage.sentUser}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

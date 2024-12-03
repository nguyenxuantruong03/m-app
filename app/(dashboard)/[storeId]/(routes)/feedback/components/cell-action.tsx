"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Copy, Send, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { FeedBackColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SentEmailUserModal } from "@/components/modals/sentEmailUser";
import { translateFeedbackActions } from "@/translate/translate-dashboard";

interface CellActionProps {
  data: FeedBackColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const user = useCurrentUser();
  const router = useRouter();
  const params = useParams();

  //language
  const feedBackActionMessage = translateFeedbackActions(data.language)

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSentEmail, setOpenSentEmail] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(feedBackActionMessage.feedbackIdCopied);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/feedback/${data.id}`);
      router.refresh();
      toast.success(feedBackActionMessage.feedbackDeleted);
    } catch (error: unknown) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(
          feedBackActionMessage.somethingWentWrong
        );
      }
    } finally {
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

      <SentEmailUserModal
        isOpen={openSentEmail}
        onClose={() => setOpenSentEmail(false)}
        setOpenSentEmail={setOpenSentEmail}
        email = {data.email}
        loading={loading}
        setLoading={setLoading}
        languageToUse={data.language}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{feedBackActionMessage.openMenu}</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{feedBackActionMessage.actions}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            {feedBackActionMessage.copyId}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenSentEmail(true)}>
            <Send className="h-4 w-4 mr-2" />
            {feedBackActionMessage.sendResponse}
          </DropdownMenuItem>
          {user?.role === "ADMIN" && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="h-4 w-4 mr-2" />
              {feedBackActionMessage.delete}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

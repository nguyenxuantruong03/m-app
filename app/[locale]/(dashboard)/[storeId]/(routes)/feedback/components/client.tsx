"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { FeedBackColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface SizeClientProps {
  data: FeedBackColumn[];
}

const FeedBackClient: React.FC<SizeClientProps> = ({ data }) => {
  const t = useTranslations()
  const param = useParams()
  const [selectedRows, setSelectedRows] = useState<FeedBackColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const ids = selectedRows.map((row) => row.id);
      await axios.delete(`/api/${param.storeId}/feedback`, {
        data: { ids },
      });
      setLoading(false);
      setOpen(false);
      toast.success(t("feedback.client.feedbackDeletedSuccess"));
      // Optionally, refresh data or handle post-delete state
    } catch (error) {
      setLoading(false);
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t("feedback.feedback")} (${data.length})`}
          description={t("feedback.client.manageFeedbackStore")}
        />
        <div className="flex space-x-3">
          <Downloadfile data={data} filename="feedback" />
        </div>
      </div>
      <Separator />
      <DataTable
        placeholder={t("feedback.client.enterEmail")}
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={(rows) => {
          setSelectedRows(rows.map((row) => row.original));
        }}
        disable={loading}
        onDelete={handleDelete}
        setOpen={setOpen}
        open={open}
        
      />
      {showAPIRole && <Heading title={t("action.api")} description={t("feedback.client.apiCallsForFeedback")} />}
      <Separator />
      <ApiList entityIdName="" entityName="feedback" />
    </>
  );
};

export default FeedBackClient;

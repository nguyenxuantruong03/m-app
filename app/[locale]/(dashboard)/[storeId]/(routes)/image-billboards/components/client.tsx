"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";

import { BillboardColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const t = useTranslations()
  const [selectedRows, setSelectedRows] = useState<BillboardColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const ids = selectedRows.map((row) => row.id);
      await axios.delete(`/api/${params.storeId}/imagebillboards`, {
        data: { ids },
      });
      setLoading(false);
      setOpen(false);
      toast.success(t("imagebillboard.client.imageBillboardsDeletedSuccessfully"));
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
        toast.error(
          t("toastError.somethingWentWrong")
        );
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t("imagebillboard.client.description")} (${data.length})`}
          description={t("imagebillboard.client.manageDescription")}
        />
      </div>
      <Separator />
      <DataTable
        placeholder={t("imagebillboard.client.enterLabel")}
        searchKey="label"
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
      {showAPIRole && (
        <>
          <Heading title={t("action.api")} description={t("imagebillboard.client.apiCalls")} />
          <Separator />
          <ApiList entityIdName="imagebillboardId" entityName="imagebillboards" />
        </>
      )}
    </>
  );
};

export default BillboardClient;

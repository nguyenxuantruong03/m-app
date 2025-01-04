"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { CategoriesColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";

interface CategoriesClientProps {
  data: CategoriesColumn[];
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const t = useTranslations()
  const [selectedRows, setSelectedRows] = useState<CategoriesColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const ids = selectedRows.map((row) => row.id);
      await axios.delete(`/api/${params.storeId}/categories9`, {
        data: { ids },
      });
      setLoading(false);
      setOpen(false);
      toast.success(t("category.client.categoryDeleted"));
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
          title={`${t("category.client.categoryPin")} (${data.length})`}
          description={t("category.client.manageCategoryPin")}
        />
        <div className=" flex space-x-3">
          <Downloadfile
            data={data}
            filename="categories9"
          />
          <Button
            onClick={() => router.push(`/${params.storeId}/categories9/new`)}
          >
            <Plus className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">{t("action.addNew")}</span>
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        placeholder={t("category.client.enterName")}
        searchKey="name"
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
        <Heading
          title={t("action.api")}
          description={t("category.client.apiCalls")}
        />
      )}
      <Separator />
      <ApiList entityIdName="category9Id" entityName="categories9" />
    </>
  );
};

export default CategoriesClient;

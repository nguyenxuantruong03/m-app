"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus, TriangleAlert } from "lucide-react";

import { SentEmailUserColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
interface SentEmailUserClientProps {
  data: SentEmailUserColumn[];
}

const SentEmailUserClient: React.FC<SentEmailUserClientProps> = ({ data }) => {
  const t = useTranslations()
  const [selectedRows, setSelectedRows] = useState<SentEmailUserColumn[]>([]);
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
      await axios.delete(`/api/${params.storeId}/sentmailuser`, {
        data: { ids },
      });
      setLoading(false);
      setOpen(false);
      toast.success(t("sentemail.client.deletedSuccessfully"));
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
          title={`${t("sentemail.client.sendMail")} (${data.length})`}
          description={t("sentemail.client.manageSendMail")}
        />

        <div className="flex space-x-3">
          <div className="rounded-md group py-2 px-4 flex items-center space-x-1 text-yellow text-yellow-400 bg-white dark:bg-black relative cursor-pointer">
            <TriangleAlert className="w-4 h-4"/> <span className="hidden md:block">{t("sentemail.client.title")}</span>
            <div className="absolute w-[20rem] top-12 left-1/2 transform -translate-x-1/2 text-slate-900 bg-slate-200 dark:bg-slate-900 dark:text-slate-200 p-2 rounded-md z-[99999] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p>{t("sentemail.client.message1")}</p>
              <p>{t("sentemail.client.message2")}</p>
            </div>
        </div>
            
          <Downloadfile data={data} filename="sentmailuser" />
          <Button
            onClick={() => router.push(`/${params.storeId}/sentmailuser/new`)}
          >
            <Plus className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">{t("action.addNew")}</span>
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        placeholder={t("sentemail.client.enterSubject")}
        searchKey="subject"
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
        <Heading title={t("action.api")} description={t("sentemail.client.apiCallsForSendEmailUser")} />
      )}
      <Separator />
      <ApiList entityIdName="sentmailId" entityName="sentmailuser" />
    </>
  );
};

export default SentEmailUserClient;

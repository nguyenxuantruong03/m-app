"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { SentEmailUserColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { translateSendEmailClient } from "@/translate/translate-dashboard";

interface SentEmailUserClientProps {
  data: SentEmailUserColumn[];
}

const SentEmailUserClient: React.FC<SentEmailUserClientProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<SentEmailUserColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
    //language
    const user = useCurrentUser();
    const languageToUse = user?.language || "vi"
    const sendEmailClientMessage = translateSendEmailClient(languageToUse)

  const handleDelete = async () => {
    setLoading(true);
    try {
      const ids = selectedRows.map((row) => row.id);
      await axios.delete(`/api/${params.storeId}/sentmailuser`, {
        data: { ids },
      });
      setLoading(false);
      setOpen(false);
      toast.success(sendEmailClientMessage.deletedSuccessfully);
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
        toast.error(sendEmailClientMessage.somethingWentWrong);
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${sendEmailClientMessage.sendMail} (${data.length})`}
          description={sendEmailClientMessage.manageSendMail}
        />
        <div className="flex space-x-3">
          <Downloadfile data={data} filename="sentmailuser" languageToUse={languageToUse}/>
          <Button
            onClick={() => router.push(`/${params.storeId}/sentmailuser/new`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            {sendEmailClientMessage.addNew}
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
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
        languageToUse={languageToUse}
      />
      {showAPIRole && (
        <Heading title={sendEmailClientMessage.api} description={sendEmailClientMessage.apiCallsForSendEmailUser} />
      )}
      <Separator />
      <ApiList entityIdName="sentmailId" entityName="sentmailuser" />
    </>
  );
};

export default SentEmailUserClient;

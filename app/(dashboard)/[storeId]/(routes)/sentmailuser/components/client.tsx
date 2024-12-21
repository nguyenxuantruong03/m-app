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
import { useCurrentUser } from "@/hooks/use-current-user";
import { getEnterSubjectTranslation, translateEmailPreferenceNoteMessage, translateSendEmailClient } from "@/translate/translate-dashboard";
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
    const emailPreferenceNoteMessage = translateEmailPreferenceNoteMessage(languageToUse)
    const enterSubjectMessage = getEnterSubjectTranslation(languageToUse)

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
          <div className="rounded-md group py-2 px-4 flex items-center space-x-1 text-yellow text-yellow-400 bg-white dark:bg-black relative cursor-pointer">
            <TriangleAlert className="w-4 h-4"/> <span className="hidden md:block">{emailPreferenceNoteMessage.title}</span>
            <div className="absolute w-[20rem] top-12 left-1/2 transform -translate-x-1/2 text-slate-900 bg-slate-200 dark:bg-slate-900 dark:text-slate-200 p-2 rounded-md z-[99999] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p>{emailPreferenceNoteMessage.message1}</p>
              <p>{emailPreferenceNoteMessage.message2}</p>
            </div>
        </div>
            
          <Downloadfile data={data} filename="sentmailuser" languageToUse={languageToUse}/>
          <Button
            onClick={() => router.push(`/${params.storeId}/sentmailuser/new`)}
          >
            <Plus className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">{sendEmailClientMessage.addNew}</span>
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        placeholder={enterSubjectMessage}
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

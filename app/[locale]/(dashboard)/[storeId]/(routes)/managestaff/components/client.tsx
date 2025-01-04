"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ManageStaffsColumn, columns } from "./column";
import { Button } from "@/components/ui/button";
import { ReplyAll } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface SettingUserClientProps {
  data: ManageStaffsColumn[];
}

const SettingUserClient: React.FC<SettingUserClientProps> = ({ data }) => {
  const t = useTranslations()
  const params = useParams();
  const role = useCurrentRole();
  const [open, setOpen] = useState(false);
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;

  const onSentVerifyAll = async () => {
    try {
      // Make the POST request
      const response = await axios.post(`/api/${params.storeId}/managestaff`);
      // Extract the list of sent emails from the response
      const sentEmails = response.data;
      // Display a success toast
      if (sentEmails.length === 0) {
        return toast.error(t("managestaff.client.sentAllToUser"));
      } else {
        toast.success(`${t("managestaff.client.verificationEmailsSentTo")}: ${sentEmails.join(", ")}`);
      }
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
        toast.error(t("toastError.somethingWentWrong"));
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t("managestaff.staff")} (${data.length})`}
          description={t("managestaff.client.manageStaff")}
        />
        <div className="flex space-x-3">
          <Downloadfile data={data} filename="managestaff" />
          <Button
            onClick={onSentVerifyAll}
            disabled={data.every((item) => item.sentVeirifi)}
          >
            <ReplyAll className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">{t("managestaff.client.sentAll")}</span>
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        placeholder={t("managestaff.client.enterEmail")}
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
      />
      {showAPIRole && <Heading title={t("action.api")} description={t("managestaff.client.apiCallsForStaff")} />}
      <Separator />
      <ApiList entityIdName="managestaffId" entityName="managestaff" />
    </>
  );
};

export default SettingUserClient;

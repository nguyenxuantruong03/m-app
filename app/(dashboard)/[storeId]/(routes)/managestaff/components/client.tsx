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
import { useCurrentUser } from "@/hooks/use-current-user";
import { getManagestaffClient } from "@/translate/translate-dashboard";

interface SettingUserClientProps {
  data: ManageStaffsColumn[];
}

const SettingUserClient: React.FC<SettingUserClientProps> = ({ data }) => {
  const params = useParams();
  const role = useCurrentRole();
  const [open, setOpen] = useState(false);
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  //language
  const user = useCurrentUser();
  const languageToUse = user?.language || "vi";
  const manageStaffClientMessage = getManagestaffClient(languageToUse)

  const onSentVerifyAll = async () => {
    try {
      // Make the POST request
      const response = await axios.post(`/api/${params.storeId}/managestaff`);
      // Extract the list of sent emails from the response
      const sentEmails = response.data;
      // Display a success toast
      if (sentEmails.length === 0) {
        return toast.error(manageStaffClientMessage.sentAllToUser);
      } else {
        toast.success(`${manageStaffClientMessage.verificationEmailsSentTo}: ${sentEmails.join(", ")}`);
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
        toast.error(manageStaffClientMessage.somethingWentWrong);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${manageStaffClientMessage.staff} (${data.length})`}
          description={manageStaffClientMessage.manageStaff}
        />
        <div className="flex space-x-3">
          <Downloadfile data={data} filename="managestaff" languageToUse={languageToUse}/>
          <Button
            onClick={onSentVerifyAll}
            disabled={data.every((item) => item.sentVeirifi)}
          >
            <ReplyAll className="mr-2 h-4 w-4" />
            {manageStaffClientMessage.sentAll}
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
        languageToUse={languageToUse}
      />
      {showAPIRole && <Heading title={manageStaffClientMessage.api} description={manageStaffClientMessage.apiCallsForStaff} />}
      <Separator />
      <ApiList entityIdName="managestaffId" entityName="managestaff" />
    </>
  );
};

export default SettingUserClient;

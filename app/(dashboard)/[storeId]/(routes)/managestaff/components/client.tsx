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

interface SettingUserClientProps {
  data: ManageStaffsColumn[];
}

const SettingUserClient: React.FC<SettingUserClientProps> = ({ data }) => {
  const params = useParams();
  const role = useCurrentRole();
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
        return toast.error("Đã gửi tất cả cho người dùng!");
      } else {
        toast.success(`Verification emails sent to: ${sentEmails.join(", ")}`);
      }
    } catch (error: any) {
      toast.error("Failed to send verification emails.");
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Nhân viên (${data.length})`}
          description="Quản lý nhân viên"
        />
        <Button
          onClick={onSentVerifyAll}
          disabled={data.every((item) => item.sentVeirifi)}
        >
          <ReplyAll className="mr-2 h-4 w-4" />
          Sent All
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {showAPIRole && <Heading title="Api" description="API calls for Staff" />}
      <Separator />
      <ApiList entityIdName="managestaffId" entityName="managestaff" />
    </>
  );
};

export default SettingUserClient;

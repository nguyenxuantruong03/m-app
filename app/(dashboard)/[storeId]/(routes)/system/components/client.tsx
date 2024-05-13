"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { SystemsColumn, columns } from "./column";
import Downloadfile from "@/components/file/downloadfilepage";

interface SettingUserClientProps {
  data: SystemsColumn[];
}

const SettingUserClient: React.FC<SettingUserClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Hệ thống (${data.length})`}
          description="Quản lý hệ thống"
        />
        <Downloadfile data={data} filename="settinguser" />
      </div>
      <Separator />
      <DataTable searchKey="user" columns={columns} data={data} />
      {showAPIRole && (
        <Heading title="Api" description="API calls for System" />
      )}
      <Separator />
      <ApiList entityName="system" />
    </>
  );
};

export default SettingUserClient;

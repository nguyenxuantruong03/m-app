"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { SystemsColumn, columns } from "./column";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface SettingUserClientProps {
  data: SystemsColumn[];
}

const SettingUserClient: React.FC<SettingUserClientProps> = ({ data }) => {
  const t = useTranslations()
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const [open, setOpen] = useState(false);
  const showAPIRole = isRole;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t("system.system")} (${data.length})`}
          description={t("system.client.systemManagement")}
        />
        <Downloadfile
          data={data}
          filename="settinguser"
        />
      </div>
      <Separator />
      <DataTable
        placeholder={t("system.client.enterUser")}
        searchKey="user"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
      />
      {showAPIRole && (
        <Heading title={t("action.api")} description={t("system.client.apiCallsForSystem")} />
      )}
      <Separator />
      <ApiList entityName="system" />
    </>
  );
};

export default SettingUserClient;

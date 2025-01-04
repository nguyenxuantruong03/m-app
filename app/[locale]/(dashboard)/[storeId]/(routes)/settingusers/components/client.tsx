"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { SettingUsersColumn, columns } from "./column";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface SettingUserClientProps {
  data: SettingUsersColumn[];
}

const SettingUserClient: React.FC<SettingUserClientProps> = ({ data }) => {
  const t = useTranslations()
  const role = useCurrentRole();
  const [open, setOpen] = useState(false);
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t("settinguser.client.user")} (${data.length})`}
          description={t("settinguser.client.userManagement")}
        />
        <Downloadfile data={data} filename="settinguser" />
      </div>
      <Separator />
      <DataTable
        placeholder={t("settinguser.client.enterEmailMessage")}
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
      />
      {showAPIRole && <Heading title={t("action.api")} description={t("settinguser.client.apiCallsForUser")} />}
      <Separator />
      <ApiList entityIdName="settingusersId" entityName="settingusers" />
    </>
  );
};

export default SettingUserClient;

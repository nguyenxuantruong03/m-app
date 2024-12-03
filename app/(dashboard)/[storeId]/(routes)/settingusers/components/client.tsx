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
import { useCurrentUser } from "@/hooks/use-current-user";
import { getSettingUserClient } from "@/translate/translate-dashboard";

interface SettingUserClientProps {
  data: SettingUsersColumn[];
}

const SettingUserClient: React.FC<SettingUserClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const [open, setOpen] = useState(false);
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
    //language
    const user = useCurrentUser();
    const languageToUse = user?.language || "vi";
    const settingUserClientMessage = getSettingUserClient(languageToUse)
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${settingUserClientMessage.user} (${data.length})`}
          description={settingUserClientMessage.userManagement}
        />
        <Downloadfile data={data} filename="settinguser" languageToUse={languageToUse}/>
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
      {showAPIRole && <Heading title={settingUserClientMessage.api} description={settingUserClientMessage.apiCallsForUser} />}
      <Separator />
      <ApiList entityIdName="settingusersId" entityName="settingusers" />
    </>
  );
};

export default SettingUserClient;

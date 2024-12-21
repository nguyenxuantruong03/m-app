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
import { useCurrentUser } from "@/hooks/use-current-user";
import { getEnterUserTranslation, getSystemClient } from "@/translate/translate-dashboard";

interface SettingUserClientProps {
  data: SystemsColumn[];
}

const SettingUserClient: React.FC<SettingUserClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const [open, setOpen] = useState(false);
  const showAPIRole = isRole;
  //language
  const user = useCurrentUser();
  const languageToUse = user?.language || "vi";
  const systemClientMessage = getSystemClient(languageToUse)
  const enterUserMessage = getEnterUserTranslation(languageToUse)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${systemClientMessage.system} (${data.length})`}
          description={systemClientMessage.systemManagement}
        />
        <Downloadfile
          data={data}
          filename="settinguser"
          languageToUse={languageToUse}
        />
      </div>
      <Separator />
      <DataTable
        placeholder={enterUserMessage}
        searchKey="user"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
        languageToUse={languageToUse}
      />
      {showAPIRole && (
        <Heading title={systemClientMessage.api} description={systemClientMessage.apiCallsForSystem} />
      )}
      <Separator />
      <ApiList entityName="system" />
    </>
  );
};

export default SettingUserClient;

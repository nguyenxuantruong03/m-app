"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ManageAttendancesColumn, columns } from "./column";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import { getManageAttendanceClient } from "@/translate/translate-dashboard";
import { useCurrentUser } from "@/hooks/use-current-user";

interface AttendanceClientProps {
  data: ManageAttendancesColumn[];
}

const AttendanceClient: React.FC<AttendanceClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const [open, setOpen] = useState(false);
  const showAPIRole = isRole;
  //language
  const user = useCurrentUser();
  const languageToUse = user?.language || "vi";
  const manageAttendaceClientMessage = getManageAttendanceClient(languageToUse)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${manageAttendaceClientMessage.attendance} (${data.length})`}
          description={manageAttendaceClientMessage.manageAttendance}
        />
        <Downloadfile data={data} filename="manageattendance" languageToUse={languageToUse}/>
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
      {showAPIRole && <Heading title={manageAttendaceClientMessage.api} description={manageAttendaceClientMessage.apiCalls} />}
      <Separator />
      <ApiList entityIdName="" entityName="manageattendance" />
    </>
  );
};

export default AttendanceClient;

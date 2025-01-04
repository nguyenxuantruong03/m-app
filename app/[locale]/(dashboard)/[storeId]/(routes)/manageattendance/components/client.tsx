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
import { useTranslations } from "next-intl";

interface AttendanceClientProps {
  data: ManageAttendancesColumn[];
}

const AttendanceClient: React.FC<AttendanceClientProps> = ({ data }) => {
  const t = useTranslations()
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const [open, setOpen] = useState(false);
  const showAPIRole = isRole;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t("attendance.attendance")} (${data.length})`}
          description={t("attendance.client.manageAttendance")}
        />
        <Downloadfile data={data} filename="manageattendance"/>
      </div>
      <Separator />
      <DataTable
        placeholder={t("attendance.client.enterEmail")}
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
      />
      {showAPIRole && <Heading title={t("action.api")} description={t("attendance.client.apiCalls")} />}
      <Separator />
      <ApiList entityIdName="" entityName="manageattendance" />
    </>
  );
};

export default AttendanceClient;

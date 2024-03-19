"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ManageAttendancesColumn, columns } from "./column";

interface AttendanceClientProps {
  data: ManageAttendancesColumn[];
}

const AttendanceClient: React.FC<AttendanceClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Điểm danh (${data.length})`}
          description="Quản lý điểm danh"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {showAPIRole && <Heading title="Api" description="API calls for Staff" />}
      <Separator />
      <ApiList entityIdName="" entityName="manageattendance" />
    </>
  );
};

export default AttendanceClient;

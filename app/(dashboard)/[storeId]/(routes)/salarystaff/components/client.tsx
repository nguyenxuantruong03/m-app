"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { SalaryStaffsColumn, columns } from "./column";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";

interface SalaryStaffClientProps {
  data: SalaryStaffsColumn[];
}

const SalaryStaffClient: React.FC<SalaryStaffClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const [open, setOpen] = useState(false);
  const showAPIRole = isRole;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Lương (${data.length})`}
          description="Quản lý lương nhân viên"
        />
        <Downloadfile data={data} filename="salarystaff" />
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
      />
      {showAPIRole && <Heading title="Api" description="API calls for User" />}
      <Separator />
      <ApiList entityIdName="" entityName="salarystaff" />
    </>
  );
};

export default SalaryStaffClient;

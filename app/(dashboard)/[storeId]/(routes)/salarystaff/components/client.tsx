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
import { useCurrentUser } from "@/hooks/use-current-user";
import { getSalaryStaffClient } from "@/translate/translate-dashboard";

interface SalaryStaffClientProps {
  data: SalaryStaffsColumn[];
}

const SalaryStaffClient: React.FC<SalaryStaffClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const [open, setOpen] = useState(false);
  const showAPIRole = isRole;
    //language
    const user = useCurrentUser();
    const languageToUse = user?.language || "vi";
    const salaryStaffClientMessage = getSalaryStaffClient(languageToUse);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${salaryStaffClientMessage.salary} (${data.length})`}
          description={salaryStaffClientMessage.manageSalaryStaff} 
        />
        <Downloadfile data={data} filename="salarystaff" languageToUse={languageToUse}/>
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
        languageToUse={languageToUse}
      />
      {showAPIRole && <Heading title={salaryStaffClientMessage.api}  description={salaryStaffClientMessage.apiCallsForSalaryStaff}  />}
      <Separator />
      <ApiList entityIdName="" entityName="salarystaff" />
    </>
  );
};

export default SalaryStaffClient;

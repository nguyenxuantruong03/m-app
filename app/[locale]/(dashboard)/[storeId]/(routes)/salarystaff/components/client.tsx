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
import { useTranslations } from "next-intl";

interface SalaryStaffClientProps {
  data: SalaryStaffsColumn[];
}

const SalaryStaffClient: React.FC<SalaryStaffClientProps> = ({ data }) => {
  const t = useTranslations()
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const [open, setOpen] = useState(false);
  const showAPIRole = isRole;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t("salarystaff.client.salary")} (${data.length})`}
          description={t("salarystaff.client.manageSalaryStaff")} 
        />
        <Downloadfile data={data} filename="salarystaff" />
      </div>
      <Separator />
      <DataTable
        placeholder={t("salarystaff.client.enterEmail")}
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
      />
      {showAPIRole && <Heading title={t("action.api")}  description={t("salarystaff.client.apiCallsForSalaryStaff")}  />}
      <Separator />
      <ApiList entityIdName="" entityName="salarystaff" />
    </>
  );
};

export default SalaryStaffClient;

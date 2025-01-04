"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { WheelSpinColumn, columns } from "./column";
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface WheelSpinClientProps {
  data: WheelSpinColumn[];
}

const WheelSpinClient: React.FC<WheelSpinClientProps> = ({ data }) => {
  const t = useTranslations()
  const role = useCurrentRole();
  const [open, setOpen] = useState(false);
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t("spinLucky.client.wheelSpin")} (${data.length})`}
          description={t("spinLucky.client.manageWheelSpin")}
        />
        <Downloadfile data={data} filename="wheelSpin" />
      </div>
      <Separator />
      <DataTable
        placeholder={t("spinLucky.client.enterEmail")}
        searchKey="email"
        columns={columns}
        data={data}
        onSelect={() => {}}
        onDelete={() => {}}
        setOpen={setOpen}
        open={open}
      />
      {showAPIRole && <Heading title={t("action.api")} description={t("spinLucky.client.apiCalls")} />}
      <Separator />
      <ApiList entityIdName="wheelSpinId" entityName="wheelSpin" />
    </>
  );
};

export default WheelSpinClient;

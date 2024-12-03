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
import { useCurrentUser } from "@/hooks/use-current-user";
import { getWheelSpinClient } from "@/translate/translate-dashboard";

interface WheelSpinClientProps {
  data: WheelSpinColumn[];
}

const WheelSpinClient: React.FC<WheelSpinClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const [open, setOpen] = useState(false);
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
    //language
    const user = useCurrentUser();
    const languageToUse = user?.language || "vi";
    const wheelSpinClientMessage = getWheelSpinClient(languageToUse);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${wheelSpinClientMessage.wheelSpin} (${data.length})`}
          description={wheelSpinClientMessage.manageWheelSpin}
        />
        <Downloadfile data={data} filename="wheelSpin" languageToUse={languageToUse}/>
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
      {showAPIRole && <Heading title={wheelSpinClientMessage.api} description={wheelSpinClientMessage.apiCalls} />}
      <Separator />
      <ApiList entityIdName="wheelSpinId" entityName="wheelSpin" />
    </>
  );
};

export default WheelSpinClient;

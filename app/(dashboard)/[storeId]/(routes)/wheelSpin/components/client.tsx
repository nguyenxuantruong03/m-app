"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { WheelSpinColumn, columns } from "./column";
import Downloadfile from "@/components/file/downloadfilepage";

interface WheelSpinClientProps {
  data: WheelSpinColumn[];
}

const WheelSpinClient: React.FC<WheelSpinClientProps> = ({ data }) => {
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Vòng quay (${data.length})`}
          description="Quản lý Vòng quay"
        />
        <Downloadfile data={data} filename="wheelSpin" />
      </div>
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} />
      {showAPIRole && <Heading title="Api" description="API calls for Spin" />}
      <Separator />
      <ApiList entityIdName="wheelSpinId" entityName="wheelSpin" />
    </>
  );
};

export default WheelSpinClient;

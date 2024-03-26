"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { BillboardTimeColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface BillboardTimeClientProps {
  data: BillboardTimeColumn[];
}

const BillboardTimeClient: React.FC<BillboardTimeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Ảnh quảng cáo có thời gian (${data.length})`}
          description="Quản lý ảnh quảng cáo có thời gian hiển thị."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboardstime/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      {showAPIRole && (
        <Heading title="Api" description="API calls for BillboardTimes" />
      )}
      <Separator />
      <ApiList entityIdName="billboardstimeId" entityName="billboardstime" />
    </>
  );
};

export default BillboardTimeClient;

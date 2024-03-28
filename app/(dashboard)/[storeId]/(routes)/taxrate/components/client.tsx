"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { TaxRateColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import Downloadfile from "@/components/file/downloadfilepage";

interface TaxRateClientProps {
  data: TaxRateColumn[];
}

const TaxRateClient: React.FC<TaxRateClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sản phẩm (${data.length})`}
          description="Quản lý thuế"
        />
        <div className="flex space-x-3">
          <Downloadfile data={data} filename="taxrate" />=
          <Button onClick={() => router.push(`/${params.storeId}/taxrate/new`)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm mới
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {showAPIRole && (
        <Heading title="Api" description="API calls for Taxrate" />
      )}
      <Separator />
      <ApiList entityIdName="taxrateId" entityName="taxrate" />
    </>
  );
};

export default TaxRateClient;

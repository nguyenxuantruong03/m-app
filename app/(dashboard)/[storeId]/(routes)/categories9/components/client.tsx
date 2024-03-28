"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { CategoriesColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import Downloadfile from "@/components/file/downloadfilepage";

interface CategoriesClientProps {
  data: CategoriesColumn[];
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Loại sản phẩm (${data.length})`}
          description="Quản lý loại sản phẩm cửa hàng"
        />
        <div className=" flex space-x-3">
          <Downloadfile data={data} filename="categories9" />
          <Button
            onClick={() => router.push(`/${params.storeId}/categories9/new`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm mới
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {showAPIRole && (
        <Heading title="Api" description="API calls for Category" />
      )}
      <Separator />
      <ApiList entityIdName="category9Id" entityName="categories9" />
    </>
  );
};

export default CategoriesClient;

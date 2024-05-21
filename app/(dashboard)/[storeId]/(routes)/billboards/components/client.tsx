"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { BillboardColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import Downloadfile from "@/components/file/downloadfilepage";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<BillboardColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const role = useCurrentRole();
  const isRole = role === UserRole.ADMIN;
  const showAPIRole = isRole;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const ids = selectedRows.map((row) => row.id);
      await axios.delete(`/api/${params.storeId}/billboards`, {
        data: { ids },
      });
      setLoading(false);
      setOpen(false);
      toast.success("Billboards deleted successfully");
      // Optionally, refresh data or handle post-delete state
    } catch (error) {
      setLoading(false);
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error(
          "Make sure you removed all billboard using this billboard first."
        );
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Ảnh quảng cáo (${data.length})`}
          description="Quản lý ảnh quảng cáo cửa hàng"
        />
        <div className="flex space-x-3">
          <Downloadfile data={data} filename="billboard" />
          <Button
            onClick={() => router.push(`/${params.storeId}/billboards/new`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm mới
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        searchKey="label"
        columns={columns}
        data={data}
        onSelect={(rows) => {
          setSelectedRows(rows.map((row) => row.original));
        }}
        disable={loading}
        onDelete={handleDelete}
        setOpen={setOpen}
        open={open}
      />
      {showAPIRole && (
        <>
          <Heading title="Api" description="API calls for Billboards" />
          <Separator />
          <ApiList entityIdName="billboardId" entityName="billboards" />
        </>
      )}
    </>
  );
};

export default BillboardClient;

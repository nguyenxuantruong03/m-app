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
import Downloadfile from "@/components/file/downloadfilepage";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface BillboardTimeClientProps {
  data: BillboardTimeColumn[];
}

const BillboardTimeClient: React.FC<BillboardTimeClientProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<BillboardTimeColumn[]>([]);
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
      await axios.delete(`/api/${params.storeId}/billboardstime`, {
        data: { ids },
      });
      setLoading(false);
      setOpen(false);
      toast.success("Billboardstime deleted successfully");
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
          title={`Ảnh quảng cáo có thời gian (${data.length})`}
          description="Quản lý ảnh quảng cáo có thời gian hiển thị."
        />
        <div className="flex space-x-3">
          <Downloadfile data={data} filename="billboardtime" />
          <Button
            onClick={() => router.push(`/${params.storeId}/billboardstime/new`)}
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
        <Heading title="Api" description="API calls for BillboardTimes" />
      )}
      <Separator />
      <ApiList entityIdName="billboardstimeId" entityName="billboardstime" />
    </>
  );
};

export default BillboardTimeClient;

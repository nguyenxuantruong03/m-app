"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";
import Downloadfile from "@/components/file/downloadfilepage";

interface OrderProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderProps> = ({ data }) => {
  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
        title={`Đơn hàng đang giao (${data.length})`}
        description="Quản lý xác nhận đơn hàng đang giao"
      />
      <Downloadfile data={data} filename="orders" />
    </div>
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} onSelect={()=>{}} onDelete={()=>{}} open={false} setOpen={() => false}/>
    </>
  );
};

export default OrderClient;
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
        title={`Đơn hàng của bạn (${data.length})`}
        description="Quản lý đơn hàng đã giao hoặc đã hủy"
      />
      <Downloadfile data={data} filename="orders" />
    </div>
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} onSelect={()=>{}} onDelete={()=>{}} open={false} setOpen={() => false}/>
    </>
  );
};

export default OrderClient;

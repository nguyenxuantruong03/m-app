"use client"

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";


interface OrderProps{
    data: OrderColumn[]
}

const OrderClient:React.FC<OrderProps> = ({data}) => {
    return ( 
        <>
            <Heading 
            title ={`Đơn hàng (${data.length})`}
            description="Quản lý đơn hàng sản phẩm"
            />

        <Separator />
        <DataTable searchKey="product" columns={columns} data={data} />
        </>
     );
}
 
export default OrderClient;
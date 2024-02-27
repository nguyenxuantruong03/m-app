"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { BillboardSaleColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface BillboardSaleClientProps{
    data: BillboardSaleColumn[]
}

const BillboardSaleClient:React.FC<BillboardSaleClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    const role = useCurrentRole();
    const isRole = role === UserRole.ADMIN;
    const showAPIRole = isRole;
    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title ={`Ảnh quảng cáo giảm giá (${data.length})`}
            description="Quản lý ảnh quảng cáo giảm giá cửa hàng"
            />
            <Button onClick={() => router.push(`/${params.storeId}/billboardssale/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm mới
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="label" columns={columns} data={data} />
        {showAPIRole && (
        <Heading title="Api" description="API calls for Billboard Sale" />
        )}
        <Separator />
        <ApiList 
        entityIdName="billboardsaleId"
        entityName="billboardssale"
        />
        </>
     );
}
 
export default BillboardSaleClient;
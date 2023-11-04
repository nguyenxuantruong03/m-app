"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { BillboardColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps{
    data: BillboardColumn[]
}

const BillboardClient:React.FC<BillboardClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title ={`Ảnh quảng cáo nhỏ(${data.length})`}
            description="Quản lý ảnh quảng cáo nhỏ cửa hàng"
            />
            <Button onClick={() => router.push(`/${params.storeId}/billboardsmini/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm mới
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="label" columns={columns} data={data} />
        <Heading title="Api" description="API calls for Billboards Mini" />
        <Separator />
        <ApiList 
        entityIdName="billboardminiId"
        entityName="billboardsmini"
        />
        </>
     );
}
 
export default BillboardClient;
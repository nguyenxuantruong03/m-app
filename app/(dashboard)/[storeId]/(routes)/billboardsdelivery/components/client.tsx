"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { BillboardDeliveryColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";

interface BillboardDeliveryClientProps{
    data: BillboardDeliveryColumn[]
}

const BillboardDeliveryClient:React.FC<BillboardDeliveryClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title ={`Billboard Delivery (${data.length})`}
            description="Manage Billboard Delivery for your store"
            />
            <Button onClick={() => router.push(`/${params.storeId}/billboardsdelivery/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="label" columns={columns} data={data} />
        <Heading title="Api" description="API calls for Billboard Delivery" />
        <Separator />
        <ApiList 
        entityIdName="billboarddeliveryId"
        entityName="billboardsdelivery"
        />
        </>
     );
}
 
export default BillboardDeliveryClient;
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
            <Heading 
            title ={`Order (${data.length})`}
            description="Manage order for your store"
            />

        <Separator />
        <DataTable searchKey="product" columns={columns} data={data} />
        </>
     );
}
 
export default BillboardClient;
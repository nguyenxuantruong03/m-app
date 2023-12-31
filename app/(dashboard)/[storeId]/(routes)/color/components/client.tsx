"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { ColorColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";

interface ColorClientProps{
    data: ColorColumn[]
}

const ColorClient:React.FC<ColorClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title ={`Màu (${data.length})`}
            description="Quản lý màu cửa hàng"
            />
            <Button onClick={() => router.push(`/${params.storeId}/color/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm mới
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />
        <Heading title="Api" description="API calls for Color" />
        <Separator />
        <ApiList 
        entityIdName="colorId"
        entityName="color"
        />
        </>
     );
}
 
export default ColorClient;
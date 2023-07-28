"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { ProductColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";

interface ProductClientProps{
    data: ProductColumn[]
}

const ProductClient:React.FC<ProductClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title ={`Tivi (${data.length})`}
            description="Manage tivi for your store"
            />
            <Button onClick={() => router.push(`/${params.storeId}/tivi/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />
        <Heading title="Api" description="API calls for Tivi" />
        <Separator />
        <ApiList 
        entityIdName="tiviId"
        entityName="tivi"
        />
        </>
     );
}
 
export default ProductClient;
"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { CategoriesColumn, columns } from "./columns";

import { ApiList } from "@/components/ui/api-list";

interface CategoriesClientProps{
    data: CategoriesColumn[]
}

const CategoriesClient:React.FC<CategoriesClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title ={`Category (${data.length})`}
            description="Manage categories for your store"
            />
            <Button onClick={() => router.push(`/${params.storeId}/categories9/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />
        <Heading title="Api" description="API calls for Category" />
        <Separator />
        <ApiList 
        entityIdName="category9Id"
        entityName="categories9"
        />
        </>
     );
}
 
export default CategoriesClient;
"use client"

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { Copy, Edit, MoreHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { TaxRateColumn } from "./columns";

interface CellActionProps{
    data: TaxRateColumn;
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router = useRouter()
    const params =useParams()
    const onCopy = (id: string) =>{
        navigator.clipboard.writeText(id)
        toast.success("TaxRate Id copied to the clipboard.")
    }

    return (  
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                    <Copy className="h-4 w-4 mr-2"/>
                    CopyId
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/taxrate/${data.id}`)}>
                    <Edit className="h-4 w-4 mr-2"/>
                    Update
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
}
 
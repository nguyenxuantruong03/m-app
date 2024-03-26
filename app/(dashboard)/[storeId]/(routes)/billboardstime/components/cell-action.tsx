"use client"

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { Copy, Edit, MoreHorizontal, Trash,RotateCcw  } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import {useState} from "react"
import axios from "axios"

import { BillboardTimeColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps{
    data: BillboardTimeColumn;
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router = useRouter()
    const params =useParams()

    const [loading,setLoading] = useState(false)
    const [open,setOpen]=useState(false)

    const onCopy = (id: string) =>{
        navigator.clipboard.writeText(id)
        toast.success("BillboardTime Id copied to the clipboard.")
    }

    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/billboardstime/${data.id}`);
          router.refresh();
          toast.success('Billboardtime deleted.');
        } catch (error: any) {
          toast.error('Make sure you removed all categories using this billboardstime first.');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }

      const onReset = async () => {
        try {
          setLoading(true);
          await axios.post(`/api/${params.storeId}/billboardstime/${data.id}`);
          router.refresh();
          toast.success('Billboardtime updated.');
        } catch (error: any) {
          toast.error('Make sure you removed all categories using this billboardstime first.');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }

    return (  
        <>
        <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        />
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
                <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/billboardstime/${data.id}`)}>
                    <Edit className="h-4 w-4 mr-2"/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4 mr-2"/>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onReset}>
                    <RotateCcw  className="h-4 w-4 mr-2"/>
                    Reset Time
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
}
 
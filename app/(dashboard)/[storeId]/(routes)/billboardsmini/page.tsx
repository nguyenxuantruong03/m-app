import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const BillboardsMiniPage = async ({params}:{params:{storeId:string}}) => {
    const billboardminis = await prismadb.billboardmini.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    const formattedBillboards: BillboardColumn[] = billboardminis.map((item)=>({
        id: item.id,
        label: item.label,
        createdAt:format(item.createdAt, 'MM/dd/yyyy')
    }))
    return ( 
        <div className="w-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
     );
}
 
export default BillboardsMiniPage;
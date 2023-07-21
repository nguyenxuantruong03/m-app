import prismadb from "@/lib/prismadb";
import BillboardMiniClient from "./components/client";
import { BillboardMiniColumn } from "./components/columns";
import { format } from "date-fns";

const BillboardMiniPage = async ({params}:{params:{storeId:string}}) => {
    const billboardMinis = await prismadb.billboardmini.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    const formattedBillboardMini: BillboardMiniColumn[] = billboardMinis.map((item)=>({
        id: item.id,
        label: item.label,
        createdAt:format(item.createdAt, 'MM/dd/yyyy')
    }))
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardMiniClient data={formattedBillboardMini} />
            </div>
        </div>
     );
}
 
export default BillboardMiniPage;
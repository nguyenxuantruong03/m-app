import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardSaleColumn } from "./components/columns";
import { format } from "date-fns";

const BillboardSalePage = async ({params}:{params:{storeId:string}}) => {
    const billboardSale = await prismadb.billboardsale.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    const formattedBillboardSale: BillboardSaleColumn[] = billboardSale.map((item)=>({
        id: item.id,
        label: item.label,
        createdAt:format(item.createdAt, 'MM/dd/yyyy')
    }))
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboardSale} />
            </div>
        </div>
     );
}
 
export default BillboardSalePage;
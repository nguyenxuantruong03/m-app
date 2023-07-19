import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const CategoriesPage = async ({params}:{params:{storeId:string}}) => {
    const sizes = await prismadb.size.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    const formattedBillboards: BillboardColumn[] = sizes.map((item)=>({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt:format(item.createdAt, 'MM/dd/yyyy')
    }))
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
     );
}
 
export default CategoriesPage;
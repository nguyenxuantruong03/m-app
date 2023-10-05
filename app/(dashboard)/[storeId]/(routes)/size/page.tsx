import prismadb from "@/lib/prismadb";
import SizeClient from "./components/client";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";

const SizePage = async ({params}:{params:{storeId:string}}) => {
    const sizes = await prismadb.size.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    const formattedSize: SizeColumn[] = sizes.map((item)=>({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt:format(item.createdAt, 'MM/dd/yyyy')
    }))
    return ( 
        <div className="w-full">
            <div className="space-y-4 p-8 pt-6">
                <SizeClient data={formattedSize} />
            </div>
        </div>
     );
}
 
export default SizePage;
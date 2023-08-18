import prismadb from "@/lib/prismadb";
import CategoriesClient from "./components/client";
import { CategoriesColumn } from "./components/columns";
import { format } from "date-fns";

const CategoriesPage = async ({params}:{params:{storeId:string}}) => {
    const categories = await prismadb.category1.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    const formattedCategories: CategoriesColumn[] = categories.map((item)=>({
        id: item.id,
        name: item.name,
        createdAt:format(item.createdAt, 'MM/dd/yyyy')
    }))
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoriesClient data={formattedCategories} />
            </div>
        </div>
     );
}
 
export default CategoriesPage;
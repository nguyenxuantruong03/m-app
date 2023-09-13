import prismadb from "@/lib/prismadb";
import CategoriesClient from "./components/client";
import { CategoriesColumn } from "./components/columns";
import { format } from "date-fns";
import { CategoryType } from "@prisma/client";

const CategoriesPage = async ({params}:{params:{storeId:string}}) => {
    const categoryType = CategoryType.CATEGORY10;
    const categories = await prismadb.category.findMany({
        where:{
            storeId:params.storeId,
            categoryType:categoryType
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
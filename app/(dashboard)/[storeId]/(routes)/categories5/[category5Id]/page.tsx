import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({params}:{params: {storeId: string,category5Id: string}}) => {
    const categorys = await prismadb.category5.findUnique({
        where:{
            id: params.category5Id
        }
    })
    const billboards = await prismadb.billboard.findMany({
        where:{
            storeId: params.storeId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm 
                initialData={categorys} 
                billboards={billboards}
                />
            </div>
        </div>
     );
}
 
export default CategoryPage;
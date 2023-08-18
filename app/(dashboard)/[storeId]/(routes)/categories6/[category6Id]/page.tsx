import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({params}:{params: {storeId: string,category6Id: string}}) => {
    const categorys = await prismadb.category6.findUnique({
        where:{
            id: params.category6Id
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm 
                initialData={categorys} 
                />
            </div>
        </div>
     );
}
 
export default CategoryPage;
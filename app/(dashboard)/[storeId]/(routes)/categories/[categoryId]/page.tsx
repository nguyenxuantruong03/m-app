import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";
import { CategoryType } from "@prisma/client";

const CategoryPage = async ({params}:{params: {storeId: string,categoryId: string}}) => {
    const categoryType = CategoryType.CATEGORY;
    const categorys = await prismadb.category.findUnique({
        where:{
            id: params.categoryId,
            categoryType:categoryType
        },
        include:{
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
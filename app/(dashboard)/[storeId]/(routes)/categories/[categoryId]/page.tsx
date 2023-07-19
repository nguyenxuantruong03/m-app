import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({params}:{params: {storeId: string,categoryId: string}}) => {
    const category = await prismadb.category.findUnique({
        where:{
            id: params.categoryId
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
                <BillboardForm 
                initialData={category} 
                billboards={billboards}
                />
            </div>
        </div>
     );
}
 
export default BillboardPage;
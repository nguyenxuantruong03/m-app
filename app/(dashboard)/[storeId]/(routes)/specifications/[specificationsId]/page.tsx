import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({params}:{params: {storeId: string,specificationsId: string}}) => {
    const specifications = await prismadb.specifications.findUnique({
        where:{
            id: params.specificationsId
        },
    })
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm 
                initialData={specifications} 
                />
            </div>
        </div>
     );
}
 
export default BillboardPage;
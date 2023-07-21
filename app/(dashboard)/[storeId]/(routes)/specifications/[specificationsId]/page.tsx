import prismadb from "@/lib/prismadb";
import { SpecificationForm } from "./components/specification-form";

const SpecificationPage = async ({params}:{params: {storeId: string,specificationsId: string}}) => {
    const specifications = await prismadb.specifications.findUnique({
        where:{
            id: params.specificationsId
        },
    })
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SpecificationForm 
                initialData={specifications} 
                />
            </div>
        </div>
     );
}
 
export default SpecificationPage;
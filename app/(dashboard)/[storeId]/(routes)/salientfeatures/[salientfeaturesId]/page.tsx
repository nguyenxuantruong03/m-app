import prismadb from "@/lib/prismadb";
import { SalientFeatureForm } from "./components/salientfeature-form";

const  SalientFeaturePage = async ({params}:{params: {storeId: string,salientfeaturesId: string}}) => {
    const salientfeatures = await prismadb.salientfeatures.findUnique({
        where:{
            id: params.salientfeaturesId
        },
        include:{
            imagesalientfeatures: true
        }
    })
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SalientFeatureForm 
                initialData={salientfeatures} 
                />
            </div>
        </div>
     );
}
 
export default SalientFeaturePage;
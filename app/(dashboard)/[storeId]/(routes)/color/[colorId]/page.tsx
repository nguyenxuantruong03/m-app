import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({params}:{params: {storeId: string,colorId: string}}) => {
    const color = await prismadb.color.findUnique({
        where:{
            id: params.colorId
        }
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm 
                initialData={color} 
                />
            </div>
        </div>
     );
}
 
export default BillboardPage;
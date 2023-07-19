import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({params}:{params: {billboarddeliveryId: string}}) => {
    const billboard = await prismadb.billboarddelivery.findUnique({
        where:{
            id: params.billboarddeliveryId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
     );
}
 
export default BillboardPage;
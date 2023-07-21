import prismadb from "@/lib/prismadb";
import { BillboardDelivryForm } from "./components/billboarddelivery-form";

const BillboardPage = async ({params}:{params: {billboarddeliveryId: string}}) => {
    const billboardDelivery = await prismadb.billboarddelivery.findUnique({
        where:{
            id: params.billboarddeliveryId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardDelivryForm initialData={billboardDelivery} />
            </div>
        </div>
     );
}
 
export default BillboardPage;
import prismadb from "@/lib/prismadb";
import BillboardDeliveryForm from "./components/billboarddelivery-form";

const BillboardDeliveryPage = async ({params}:{params:{billboardDeliveryId: string} }) => {
    const billboardDelivery = await prismadb.billboardDelivery.findUnique({
        where:{
            id: params.billboardDeliveryId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardDeliveryForm initialData={billboardDelivery}/>
            </div>
        </div>
     );
}
 
export default BillboardDeliveryPage;
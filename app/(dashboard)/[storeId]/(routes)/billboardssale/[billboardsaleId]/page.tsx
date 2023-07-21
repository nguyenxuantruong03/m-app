import prismadb from "@/lib/prismadb";
import { BillboardSaleForm } from "./components/billboardsale-form";

const BillboardSalePage = async ({params}:{params: {billboardsaleId: string}}) => {
    const billboardSale = await prismadb.billboardsale.findUnique({
        where:{
            id: params.billboardsaleId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardSaleForm initialData={billboardSale} />
            </div>
        </div>
     );
}
 
export default BillboardSalePage;
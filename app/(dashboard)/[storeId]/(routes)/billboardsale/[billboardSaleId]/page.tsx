import prismadb from "@/lib/prismadb";
import BillboardSaleForm from "./components/billboardsale-form";

const BillboardSalePage = async ({params}:{params:{billboardSaleId: string} }) => {
    const billboardSale = await prismadb.billboardSale.findUnique({
        where:{
            id: params.billboardSaleId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardSaleForm initialData={billboardSale}/>
            </div>
        </div>
     );
}
 
export default BillboardSalePage;
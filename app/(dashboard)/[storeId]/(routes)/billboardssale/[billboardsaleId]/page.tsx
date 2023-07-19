import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({params}:{params: {billboardsaleId: string}}) => {
    const billboard = await prismadb.billboardsale.findUnique({
        where:{
            id: params.billboardsaleId
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
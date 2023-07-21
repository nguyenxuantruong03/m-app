import prismadb from "@/lib/prismadb";
import { BillboardMiniForm } from "./components/billboardmini-form";

const BillboardMiniPage = async ({params}:{params: {billboardminiId: string}}) => {
    const billboardMini = await prismadb.billboardmini.findUnique({
        where:{
            id: params.billboardminiId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardMiniForm initialData={billboardMini} />
            </div>
        </div>
     );
}
 
export default BillboardMiniPage;
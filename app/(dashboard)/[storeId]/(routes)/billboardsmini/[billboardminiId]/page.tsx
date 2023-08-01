import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({params}:{params: {billboardminiId: string}}) => {
    const billboardmini = await prismadb.billboardmini.findUnique({
        where:{
            id: params.billboardminiId
        },
        include:{
            imagebillboardmini: true
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboardmini} />
            </div>
        </div>
     );
}
 
export default BillboardPage;
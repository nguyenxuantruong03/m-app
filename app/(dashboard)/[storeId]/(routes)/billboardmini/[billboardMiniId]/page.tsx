import prismadb from "@/lib/prismadb";
import BillboardMiniForm from "./components/billboardmini-form";

const BillboardMiniPage = async ({params}:{params:{billboardMiniId: string} }) => {
    const billboardMini = await prismadb.billboardMini.findUnique({
        where:{
            id: params.billboardMiniId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardMiniForm initialData={billboardMini}/>
            </div>
        </div>
     );
}
 
export default BillboardMiniPage;
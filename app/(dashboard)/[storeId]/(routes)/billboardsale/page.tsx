import BillboardSaleClient from "./components/client";

const BillboardSalePage = () => {
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardSaleClient />
            </div>
        </div>
     );
}
 
export default BillboardSalePage;
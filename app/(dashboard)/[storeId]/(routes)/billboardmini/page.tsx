import BillboardMiniClient from "./components/client";

const BillboardMiniPage = () => {
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardMiniClient />
            </div>
        </div>
     );
}
 
export default BillboardMiniPage;
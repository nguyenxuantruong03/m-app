import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({params}:{params: {storeId: string,productId: string}}) => {
    const product = await prismadb.product.findUnique({
        where:{
            id: params.productId
        },
        include:{
            images: true
        }
    })
    const categories = await prismadb.category.findMany({
        where:{
            storeId: params.storeId
        }
    })

    const sizes = await prismadb.size.findMany({
        where:{
            storeId: params.storeId
        }
    })

    const colors = await prismadb.color.findMany({
        where:{
            storeId: params.storeId
        }
    })
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm 
                initialData={product} 
                categories={categories}
                sizes={sizes}
                colors={colors}
                />
            </div>
        </div>
     );
}
 
export default BillboardPage;
import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/ipad-form";

const ProductPage = async ({params}:{params: {storeId: string,ipadId: string}}) => {
    const ipads = await prismadb.ipad.findUnique({
        where:{
            id: params.ipadId
        },
        include:{
            imagesipad: true
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

    const specifications = await prismadb.specifications.findMany({
        where:{
            storeId: params.storeId
        }
    })

    const salientfeatures = await prismadb.salientfeatures.findMany({
        where:{
            storeId: params.storeId
        }
    })
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm 
                initialData={ipads} 
                categories={categories}
                sizes={sizes}
                colors={colors}
                specifications={specifications}
                salientfeatures={salientfeatures}
                />
            </div>
        </div>
     );
}
 
export default ProductPage;
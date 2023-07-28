import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/tivi-form";

const ProductPage = async ({params}:{params: {storeId: string,tiviId: string}}) => {
    const tivi = await prismadb.tivi.findUnique({
        where:{
            id: params.tiviId
        },
        include:{
            imagestivi: true
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
                initialData={tivi} 
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
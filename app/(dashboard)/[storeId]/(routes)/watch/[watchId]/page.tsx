import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/watch-form";

const ProductPage = async ({params}:{params: {storeId: string,watchId: string}}) => {
    const watch = await prismadb.watch.findUnique({
        where:{
            id: params.watchId
        },
        include:{
            images: true,
            imagesalientfeatures: true
        }
    })
    const categories = await prismadb.category3.findMany({
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
                <ProductForm 
                initialData={watch} 
                categories={categories}
                sizes={sizes}
                colors={colors}
                />
            </div>
        </div>
     );
}
 
export default ProductPage;
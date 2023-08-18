import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/laptop-form";

const ProductPage = async ({params}:{params: {storeId: string,laptopId: string}}) => {
    const laptop = await prismadb.laptop.findUnique({
        where:{
            id: params.laptopId
        },
        include:{
            images: true,
            imagesalientfeatureslaptop: true
        }
    })
    const categories = await prismadb.category10.findMany({
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
                initialData={laptop} 
                categories={categories}
                sizes={sizes}
                colors={colors}
                />
            </div>
        </div>
     );
}
 
export default ProductPage;
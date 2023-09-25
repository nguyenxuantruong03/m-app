import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { CategoryType, ProductType } from "@prisma/client";

const ProductPage = async ({params}:{params: {storeId: string,product7Id: string}}) => {
    const productType = ProductType.PRODUCT7;
    const categoryType = CategoryType.CATEGORY7
    const product = await prismadb.product.findUnique({
        where:{
            name: params.product7Id,
            productType:productType
        },
        include:{
            images: true,
            imagesalientfeatures: true
        }
    })
    const categories = await prismadb.category.findMany({
        where:{
            storeId: params.storeId,
            categoryType:categoryType
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
                initialData={product} 
                categories={categories}
                sizes={sizes}
                colors={colors}
                />
            </div>
        </div>
     );
}
 
export default ProductPage;
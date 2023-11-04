import prismadb from "@/lib/prismadb";

export const getStockCount = async(storeId:string) =>{
    const paidOrders = await prismadb.product.count({
            where:{
                storeId,
                isArchived: false
            },
        })
        return paidOrders
}


export const getStockCount2 = async(storeId:string) =>{
    const paidOrders = await prismadb.product.count({
            where:{
                storeId,
                isArchived: true
            },
        })
        return paidOrders
}


import prismadb from "@/lib/prismadb";

export const getTotalPriceOldRevenue = async(storeId:string) =>{
    const paidOrders = await prismadb.order.findMany({
            where:{
                storeId,
                isPaid: true,
            },
            include:{
                orderItem:{
                    include:{
                        product:true
                    }
                }
            }
        })
        const totalRevenue = paidOrders.reduce((total,order)=>{
                const orderTotal = order.orderItem.reduce((orderSum,item)=>{
                    return orderSum + Number(item.priceold)
                },0)
                return total + orderTotal
        },0)
        return totalRevenue
}

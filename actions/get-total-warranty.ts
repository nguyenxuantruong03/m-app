import prismadb from "@/lib/prismadb";

export const getTotalWarrantyRevenue = async(storeId:string) =>{
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
        const totalRevenue = paidOrders.reduce((total, order) => {
            const firstItem = order.orderItem[0];
        
            if (firstItem) {
                const orderTotal = Number(firstItem.warranty);
                return total + orderTotal;
            }
        
            return total;
        }, 0);
        return totalRevenue
}

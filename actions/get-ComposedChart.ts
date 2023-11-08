import prismadb from "@/lib/prismadb"

interface GraphData {
    name: string;
    totalpricesales: number;
    totalpriceold: number;
    totalwarranty: number;
}

export const getComposedChart = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItem: {
                include: {
                    product: true
                }
            }
        }
    })

    const monthlyRevenue: { [key: number]: number } = {};
    const monthlyRevenue1: { [key: number]: number } = {};
    const monthlyRevenue2: { [key: number]: number } = {};

    for (const order of paidOrders) {
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0;
        let warrantyTaken = false;
        let priceOldTaken = false;
        let priceSalesTaken = false;

        for (const item of order.orderItem) {
            if (!warrantyTaken) {
                monthlyRevenue2[month] = (monthlyRevenue2[month] || 0) + Number(item.warranty);
                warrantyTaken = true;
            }

            if (!priceOldTaken) {
                monthlyRevenue1[month] = (monthlyRevenue1[month] || 0) + Number(item.priceold);
                priceOldTaken = true;
            }

            if (!priceSalesTaken) {
                monthlyRevenue[month] = (monthlyRevenue[month] || 0) + Number(item.pricesales);
                priceSalesTaken = true;
            }
        }
    }

    const graphData: GraphData[] = [
        { name: "Tháng 1", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 2", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 3", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 4", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 5", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 6", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 7", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 8", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 9", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 10", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 11", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
        { name: "Tháng 12", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0 },
    ]

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].totalpricesales = monthlyRevenue[parseInt(month)];
    }
    for (const month1 in monthlyRevenue1) {
        graphData[parseInt(month1)].totalpriceold = monthlyRevenue1[parseInt(month1)];
    }
    for (const month2 in monthlyRevenue2) {
        graphData[parseInt(month2)].totalwarranty = monthlyRevenue2[parseInt(month2)];
    }
    return graphData;
}

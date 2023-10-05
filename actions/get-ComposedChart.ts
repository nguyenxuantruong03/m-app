import prismadb from "@/lib/prismadb"

interface GraphData{
    name: string;
    totalpricesales: number;
    totalpriceold: number;
    totalwarranty: number;
}


export const getComposedChart = async (storeId: string)=>{
    const paidOrders= await prismadb.order.findMany({
       where:{
        storeId,
        isPaid: true
       },
       include:{
        orderItem:{
            include:{
                product: true
            }
        }
       }
    })
   
    const monthlyRevenue: {[key:number]:number}={};
    const monthlyRevenue1: {[key:number]:number}={};
    const monthlyRevenue2: {[key:number]:number}={};

    for (const order of paidOrders){
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0;
        for(const item of order.orderItem){
            revenueForOrder += Number(item.pricesales)
        }
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder
    }
    for (const order of paidOrders){
        const month1 = order.createdAt.getMonth();
        let revenueForOrder = 0;
        for(const item of order.orderItem){
            revenueForOrder += Number(item.priceold)
        }
        monthlyRevenue1[month1] = (monthlyRevenue1[month1] || 0) + revenueForOrder
    }
    for (const order of paidOrders){
        const month2 = order.createdAt.getMonth();
        let revenueForOrder = 0;
        for(const item of order.orderItem){
            revenueForOrder += Number(item.warranty)
        }
        monthlyRevenue2[month2] = (monthlyRevenue2[month2] || 0) + revenueForOrder
    }

    const graphData: GraphData[] =[
        {name: "Tháng 1",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 2",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 3",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 4",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 5",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 6",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 7",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 8",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 9",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 10",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 11",totalwarranty:0,totalpriceold:0,totalpricesales:0},
        {name: "Tháng 12",totalwarranty:0,totalpriceold:0,totalpricesales:0},
    ]

    for(const month in monthlyRevenue){
        graphData[parseInt(month)].totalpricesales = monthlyRevenue[parseInt(month)]
    }
    for(const month1 in monthlyRevenue1){
        graphData[parseInt(month1)].totalpriceold = monthlyRevenue1[parseInt(month1)]
    }
    for(const month2 in monthlyRevenue2){
        graphData[parseInt(month2)].totalwarranty = monthlyRevenue2[parseInt(month2)]
    }
    return (graphData)
}
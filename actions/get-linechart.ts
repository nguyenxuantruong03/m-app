import prismadb from "@/lib/prismadb"

interface GraphData{
    name: string;
    totaldate: number
}

export const getLineChart = async (storeId: string)=>{
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

    for (const order of paidOrders){
        const date = order.createdAt.getDate();
        let revenueForOrder = 0;
        for(const item of order.orderItem){
            revenueForOrder += Number(item.pricesales)
        }
        monthlyRevenue[date] = (monthlyRevenue[date] || 0) + revenueForOrder
    }

    const graphData: GraphData[] =[
        {name: "1",totaldate: 0},
        {name: "2",totaldate: 0},
        {name: "3",totaldate: 0},
        {name: "4",totaldate: 0},
        {name: "5",totaldate: 0},
        {name: "6",totaldate: 0},
        {name: "7",totaldate: 0},
        {name: "8",totaldate: 0},
        {name: "9",totaldate: 0},
        {name: "10",totaldate: 0},
        {name: "11",totaldate: 0},
        {name: "12",totaldate: 0},
        {name: "13",totaldate: 0},
        {name: "14",totaldate: 0},
        {name: "15",totaldate: 0},
        {name: "16",totaldate: 0},
        {name: "17",totaldate: 0},
        {name: "18",totaldate: 0},
        {name: "19",totaldate: 0},
        {name: "20",totaldate: 0},
        {name: "21",totaldate: 0},
        {name: "22",totaldate: 0},
        {name: "23",totaldate: 0},
        {name: "24",totaldate: 0},
        {name: "25",totaldate: 0},
        {name: "26",totaldate: 0},
        {name: "27",totaldate: 0},
        {name: "28",totaldate: 0},
        {name: "29",totaldate: 0},
        {name: "30",totaldate: 0},
        {name: "31",totaldate: 0},
    ]

    for(const date in monthlyRevenue){
        graphData[parseInt(date)].totaldate = monthlyRevenue[parseInt(date)]
    }
    return graphData
}
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface GraphData {
    name: string;
    total: number;
    createdAt: Date; // Giữ nguyên kiểu là Date
}

export async function POST(req: Request) {
    const body = await req.json();
    const { storeId, dateRange } = body;

    try {
        const paidOrders = await prismadb.order.findMany({
            where: {
                storeId,
                isPaid: true,
                ...(dateRange && {
                    createdAt: {
                      gte: new Date(dateRange.from), // Filter by start date
                      lte: new Date(dateRange.to), // Filter by end date
                    },
                  }),
            },
            include: {
                orderItem: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        const monthlyRevenue: { [key: number]: { total: number; createdAt: Date } } = {}; // Đảm bảo kiểu là Date

        for (const order of paidOrders) {
            const month = order.createdAt.getMonth();
            let revenueForOrder = 0;
            for (const item of order.orderItem) {
                if (item.pricesales) {
                    revenueForOrder += Number(item.pricesales);
                    break; 
                }
            }

            // Gán giá trị cho monthlyRevenue
            if (!monthlyRevenue[month]) {
                monthlyRevenue[month] = { total: 0, createdAt: order.createdAt }; // Đảm bảo order.createdAt không phải null
            }
            monthlyRevenue[month].total += revenueForOrder;
        }

        const graphData: GraphData[] = [
            { name: "Tháng 1", total: 0, createdAt: new Date() },
            { name: "Tháng 2", total: 0, createdAt: new Date() },
            { name: "Tháng 3", total: 0, createdAt: new Date() },
            { name: "Tháng 4", total: 0, createdAt: new Date() },
            { name: "Tháng 5", total: 0, createdAt: new Date() },
            { name: "Tháng 6", total: 0, createdAt: new Date() },
            { name: "Tháng 7", total: 0, createdAt: new Date() },
            { name: "Tháng 8", total: 0, createdAt: new Date() },
            { name: "Tháng 9", total: 0, createdAt: new Date() },
            { name: "Tháng 10", total: 0, createdAt: new Date() },
            { name: "Tháng 11", total: 0, createdAt: new Date() },
            { name: "Tháng 12", total: 0, createdAt: new Date() },
        ];

        for (const month in monthlyRevenue) {
            graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)].total;
            graphData[parseInt(month)].createdAt = monthlyRevenue[parseInt(month)].createdAt; // Gán createdAt
        }

        return NextResponse.json(graphData);
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Internal error get composed." }),
            { status: 500 }
        );
    }
}

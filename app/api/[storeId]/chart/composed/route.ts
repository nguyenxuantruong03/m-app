import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

interface GraphData {
    name: string;
    totalpricesales: number;
    totalpriceold: number;
    totalwarranty: number;
    createdAt: Date; // Thêm thuộc tính createdAt
}

export async function POST(req: Request) {
  const body = await req.json();
  const { storeId, dateRange } = body;
  const userId = await currentUser();

  try {
    if (!userId) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy user id!" }),
          { status: 403 }
        );
      }
  
      if (userId.role !== UserRole.ADMIN && userId.role !== UserRole.STAFF) {
        return new NextResponse(
          JSON.stringify({ error: "Bạn không có quyền xem chart!" }),
          { status: 403 }
        );
      }
      
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
        { name: "Tháng 1", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 2", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 3", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 4", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 5", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 6", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 7", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 8", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 9", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 10", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 11", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
        { name: "Tháng 12", totalwarranty: 0, totalpriceold: 0, totalpricesales: 0, createdAt: new Date() },
    ];

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].totalpricesales = monthlyRevenue[parseInt(month)];
    }
    for (const month1 in monthlyRevenue1) {
        graphData[parseInt(month1)].totalpriceold = monthlyRevenue1[parseInt(month1)];
    }
    for (const month2 in monthlyRevenue2) {
        graphData[parseInt(month2)].totalwarranty = monthlyRevenue2[parseInt(month2)];
    }

    // Cập nhật createdAt cho từng mục trong graphData
    for (let i = 0; i < graphData.length; i++) {
        graphData[i].createdAt = new Date(new Date().setMonth(i)); // Thay đổi giá trị createdAt theo tháng
    }

    return NextResponse.json(graphData);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get composed." }),
      { status: 500 }
    );
  }
}

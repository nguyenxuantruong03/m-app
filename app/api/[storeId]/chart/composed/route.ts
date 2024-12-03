import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateComposedChart } from "@/translate/translate-api";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

// Define month names in multiple languages
const monthNames: { [key: string]: string[] } = {
  vi: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  zh: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
};

interface GraphData {
  name: string;
  totalpricesales: number;
  totalpriceold: number;
  totalwarranty: number;
  createdAt: Date;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { storeId, dateRange } = body;
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const composedChartMessage = translateComposedChart(LanguageToUse)
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: composedChartMessage.name1 }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: composedChartMessage.name2 }),
        { status: 403 }
      );
    }

    // Get the user's preferred language from user.language
    const language = user.language || 'vi'; // Default to 'vi' if language is not set

    const paidOrders = await prismadb.order.findMany({
      where: {
        storeId,
        isPaid: true,
        ...(dateRange && {
          createdAt: {
            gte: new Date(dateRange.from),
            lte: new Date(dateRange.to),
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

    const monthlyRevenue: { [key: number]: number } = {};
    const monthlyRevenue1: { [key: number]: number } = {};
    const monthlyRevenue2: { [key: number]: number } = {};

    // Calculate the revenues based on orders
    for (const order of paidOrders) {
      const month = order.createdAt.getMonth();
      let warrantyTaken = false;
      let priceOldTaken = false;
      let priceSalesTaken = false;

      for (const item of order.orderItem) {
        // Update warranty, price old, and price sales once for each order item
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

    // Initialize graph data for all months using the language from user.language
    const graphData: GraphData[] = Array.from({ length: 12 }, (_, i) => ({
      name: monthNames[language][i], // Use the language to set the correct month name
      totalpricesales: 0,
      totalpriceold: 0,
      totalwarranty: 0,
      createdAt: new Date(new Date().setMonth(i)), // Set `createdAt` to the first day of the respective month
    }));

    // Update graphData with the calculated monthly revenue data
    Object.keys(monthlyRevenue).forEach((month) => {
      const monthIndex = parseInt(month);
      graphData[monthIndex].totalpricesales = monthlyRevenue[monthIndex];
    });

    Object.keys(monthlyRevenue1).forEach((month1) => {
      const monthIndex = parseInt(month1);
      graphData[monthIndex].totalpriceold = monthlyRevenue1[monthIndex];
    });

    Object.keys(monthlyRevenue2).forEach((month2) => {
      const monthIndex = parseInt(month2);
      graphData[monthIndex].totalwarranty = monthlyRevenue2[monthIndex];
    });

    return NextResponse.json(graphData);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: composedChartMessage.name3 }),
      { status: 500 }
    );
  }
}

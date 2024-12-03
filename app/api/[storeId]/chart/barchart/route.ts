import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateBarChart } from "@/translate/translate-api";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

interface GraphData {
  name: string;
  total: number;
  createdAt: Date; // Giữ nguyên kiểu là Date
}

// Define the available languages
type Language = "vi" | "en" | "zh" | "fr" | "ja";

const monthNames: Record<Language, string[]> = {
  vi: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  zh: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
};

export async function POST(req: Request) {
  const body = await req.json();
  const { storeId, dateRange } = body;
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const barChartMessage = translateBarChart(LanguageToUse)

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: barChartMessage.name1 }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: barChartMessage.name2 }),
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
            product: true,
          },
        },
      },
    });

    const monthlyRevenue: {
      [key: number]: { total: number; createdAt: Date };
    } = {}; // Đảm bảo kiểu là Date

    for (const order of paidOrders) {
      const month = order.createdAt.getMonth();
      let revenueForOrder = 0;
      for (const item of order.orderItem) {
        if (item.pricesales) {
          revenueForOrder += Number(item.pricesales);
          break;
        }
      }

      if (!monthlyRevenue[month]) {
        monthlyRevenue[month] = { total: 0, createdAt: order.createdAt };
      }
      monthlyRevenue[month].total += revenueForOrder;
    }

    // Safely access the language or default to 'vi' if undefined
    const language: Language = (LanguageToUse as Language) || "vi"; // Type assertion here
    const months = monthNames[language]; // TypeScript knows language is valid now

    const graphData: GraphData[] = months.map((monthName, index) => ({
      name: monthName,
      total: monthlyRevenue[index] ? monthlyRevenue[index].total : 0,
      createdAt: monthlyRevenue[index]
        ? monthlyRevenue[index].createdAt
        : new Date(),
    }));

    return NextResponse.json(graphData);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: barChartMessage.name3 }),
      { status: 500 }
    );
  }
}

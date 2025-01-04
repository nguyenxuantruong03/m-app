import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

interface GraphData {
  name: string;
  totaldate: number;
  createdAt: Date; // Thêm thuộc tính createdAt
}

export async function POST(req: Request) {
  const body = await req.json();
  const { storeId, dateRange } = body;
  const user = await currentUser();
    //language
    const languageToUse = user?.language || "vi";
    let messages;
      messages = (await import(`@/messages/${languageToUse}.json`)).default;
      const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    const paidOrders = await prismadb.order.findMany({
      where: {
        isPaid: true,
        storeId: storeId,
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

    const monthlyRevenue: { [key: number]: { revenue: number; createdAt: Date } } = {};

    for (const order of paidOrders) {
      const date = order.createdAt.getDate();
      let revenueForOrder = 0;

      // Chỉ lấy giá đầu tiên từ mảng orderItem
      const firstItem = order.orderItem[0];
      if (firstItem) {
        revenueForOrder = Number(firstItem.pricesales);
      }

      // Nếu ngày chưa có trong monthlyRevenue, khởi tạo
      if (!monthlyRevenue[date]) {
        monthlyRevenue[date] = { revenue: 0, createdAt: order.createdAt }; // Lưu createdAt
      }
      monthlyRevenue[date].revenue += revenueForOrder; // Cộng dồn doanh thu
    }

    const graphData: GraphData[] = Array.from({ length: 31 }, (_, i) => ({
      name: (i + 1).toString(),
      totaldate: 0,
      createdAt: new Date(), // Khởi tạo createdAt trống
    }));

    for (const date in monthlyRevenue) {
      graphData[parseInt(date)].totaldate = monthlyRevenue[parseInt(date)].revenue;
      graphData[parseInt(date)].createdAt = monthlyRevenue[parseInt(date)].createdAt; // Gán createdAt
    }


    return NextResponse.json(graphData);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.chart.intternalErrorLine") }),
      { status: 500 }
    );
  }
}

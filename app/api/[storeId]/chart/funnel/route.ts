import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { dateRange } = body;
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
    
    // Lấy tất cả người dùng
    const users = await prismadb.user.findMany({
      where: {
        ...(dateRange && {
          createdAt: {
            gte: new Date(dateRange.from), // Lọc theo ngày bắt đầu
            lte: new Date(dateRange.to), // Lọc theo ngày kết thúc
          },
        }),
      },
    });

    // Tìm createdAt cũ nhất trong toàn bộ người dùng
    const allCreatedAtList = users.map(user => new Date(user.createdAt));
    const oldestCreatedAt = allCreatedAtList.length > 0 ? new Date(Math.min(...allCreatedAtList.map(date => date.getTime()))) : null;

    // Lấy số lượng người dùng theo từng vai trò
    const roleCounts = Object.values(UserRole).map(role => {
      const roleUsers = users.filter(user => user.role === role);

      return {
        role,
        value: roleUsers.length,
        createdAt: oldestCreatedAt, // Sử dụng createdAt cũ nhất cho mỗi vai trò
      };
    });

    return NextResponse.json(roleCounts);

  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: t("toastError.chart.intternalErrorFunnel") }),
      { status: 500 }
    );
  }
}

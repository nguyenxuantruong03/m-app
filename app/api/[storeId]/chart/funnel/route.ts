import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { dateRange } = body;

  try {
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
      JSON.stringify({ error: "Internal error while fetching data." }),
      { status: 500 }
    );
  }
}

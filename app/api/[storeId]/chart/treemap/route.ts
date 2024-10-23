import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// Định nghĩa kiểu cho người dùng
interface User {
  name: string | null;
  email: string | null;
  createdAt: Date; // Thêm createdAt vào kiểu User
}

// Định nghĩa kiểu cho vai trò
interface GroupedUser {
  role: string;
  user: User[];
}

export async function POST(req: Request) {
  const body = await req.json();
  const { dateRange } = body; // Chỉ lấy dateRange từ body

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
      select: {
        name: true,
        email: true,
        role: true, // Lấy thêm vai trò để phân loại người dùng
        createdAt: true, // Thêm createdAt vào select
      },
    });

    // Tổ chức dữ liệu theo vai trò
    const groupedUsers: { [key: string]: GroupedUser } = {}; // Khai báo kiểu cho groupedUsers

    users.forEach(user => {
      if (!groupedUsers[user.role]) {
        groupedUsers[user.role] = {
          role: user.role,
          user: [],
        };
      }
      groupedUsers[user.role].user.push({
        name: user.name,
        email: user.email,
        createdAt: user.createdAt, // Thêm createdAt vào đối tượng người dùng
      });
    });

    // Chuyển đổi đối tượng thành mảng
    const response = Object.values(groupedUsers);

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal error while fetching data." }),
      { status: 500 }
    );
  }
}

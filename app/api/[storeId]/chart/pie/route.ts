import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

interface GraphData {
  deliveryMethod: {
    pickup: number;
    online: number;
    createdAt: Date; // Thêm thuộc tính createdAt
  };
  returnProduct: {
    pickup: number;
    online: number;
    createdAt: Date; // Thêm thuộc tính createdAt
  };
  gender: {
    male: number;
    female: number;
    other: number;
    createdAt: Date; // Thêm thuộc tính createdAt
  };
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

    // Lấy tất cả đơn hàng
    const orders = await prismadb.order.findMany({
      where: {
        isPaid: true,
        storeId: storeId,
        ...(dateRange && {
          createdAt: {
            gte: new Date(dateRange.from), // Lọc theo ngày bắt đầu
            lte: new Date(dateRange.to), // Lọc theo ngày kết thúc
          },
        }),
      },
    });

    // Dữ liệu deliveryMethod
    const deliveryMethodCount = {
      pickup: orders.filter(order => order.deliveryMethod === "pickup").length,
      online: orders.filter(order => order.deliveryMethod === "online").length,
    };

    // Dữ liệu returnProduct
    const returnProductCount = {
      pickup: orders.filter(order => order.returnProduct && order.deliveryMethod === "pickup").length,
      online: orders.filter(order => order.returnProduct && order.deliveryMethod === "online").length,
    };

    // Dữ liệu gender
    const genderCount = {
      male: orders.filter(order => order.gender === "male").length,
      female: orders.filter(order => order.gender === "female").length,
      other: orders.filter(order => order.gender === "other").length,
    };

    // Tìm giá trị createdAt cũ nhất từ tất cả các đơn hàng
    const createdAt = orders.length > 0 
      ? new Date(Math.min(...orders.map(order => order.createdAt.getTime()))) 
      : new Date(); // Hoặc giá trị mặc định nếu không có đơn hàng nào

    // Trả về dữ liệu
    const responseData: GraphData = {
      deliveryMethod: {
        ...deliveryMethodCount,
        createdAt, // Thêm createdAt vào deliveryMethod
      },
      returnProduct: {
        ...returnProductCount,
        createdAt, // Thêm createdAt vào returnProduct
      },
      gender: {
        ...genderCount,
        createdAt, // Thêm createdAt vào gender
      },
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal error while fetching data." }),
      { status: 500 }
    );
  }
}
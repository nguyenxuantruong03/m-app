import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { ProductType, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

interface ProductData {
  totalSold: number;
  totalReviews: number;
  totalComments: number;
  totalOrderItems: number;
  createdAt?: Date; // Thêm trường để lưu createdAt cũ nhất
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

    const products = await prismadb.product.findMany({
      where: {
        storeId: storeId,
        ...(dateRange && {
          createdAt: {
            gte: new Date(dateRange.from), // Lọc theo ngày bắt đầu
            lte: new Date(dateRange.to), // Lọc theo ngày kết thúc
          },
        }),
      },
      include: {
        review: {
          where: {
            ...(dateRange && {
              createdAt: {
                gte: new Date(dateRange.from), // Lọc theo ngày bắt đầu
                lte: new Date(dateRange.to), // Lọc theo ngày kết thúc
              },
            }),
          },
        },
        comment: {
          where: {
            ...(dateRange && {
              createdAt: {
                gte: new Date(dateRange.from), // Lọc theo ngày bắt đầu
                lte: new Date(dateRange.to), // Lọc theo ngày kết thúc
              },
            }),
          },
        },
        orderItems:  {
          where: {
            ...(dateRange && {
              createdAt: {
                gte: new Date(dateRange.from), // Lọc theo ngày bắt đầu
                lte: new Date(dateRange.to), // Lọc theo ngày kết thúc
              },
            }),
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Tổng hợp dữ liệu theo productType
    const result: Record<string, ProductData> = {}; // Định nghĩa kiểu cho result

    let createdAt: Date | undefined; // Biến để lưu createdAt cũ nhất

    products.forEach((product) => {
      const { productType } = product;
      if (!result[productType]) {
        result[productType] = {
          totalSold: 0,
          totalReviews: 0,
          totalComments: 0,
          totalOrderItems: 0,
        };
      }

      // Cộng dồn các giá trị
      result[productType].totalSold += product.sold || 0; // Giả định có trường sold
      result[productType].totalReviews += product.review.length;
      result[productType].totalComments += product.comment.length;
      result[productType].totalOrderItems += product.orderItems.length; // Giả định có trường orderItems

      // Tìm createdAt cũ nhất
      if (!createdAt || product.createdAt < createdAt) {
        createdAt = product.createdAt;
      }
    });

    // Thêm trường createdAt vào mỗi productType
    for (const productType in result) {
      result[productType].createdAt = createdAt;
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal error while fetching data." }),
      { status: 500 }
    );
  }
}

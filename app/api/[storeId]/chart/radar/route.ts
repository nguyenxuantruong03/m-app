import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

// Định nghĩa kiểu cho các đối tượng
interface User {
  favorite: string[];
  createdAt: Date; // Thêm createdAt vào User
}

interface UserFavoriteCount {
  [key: string]: number; // Các text trong favorite sẽ là key, số lượng là value
}

interface ProductTypeCount {
  [key: string]: number; // Các productType sẽ là key, số lượng là value
}

// Định nghĩa kiểu cho các đối tượng khác nhau trong response
interface UserFavoriteResponse {
  subject: string;
  totalFavoriteType: number;
}

interface ProductFavoriteResponse {
  subject: string;
  totalFavoriteProduct: number;
}

interface CreatedAtResponse {
  createdAt: number;
}

// Union type để gom các kiểu response
type ResponseData =
  | UserFavoriteResponse
  | ProductFavoriteResponse
  | CreatedAtResponse;

export async function POST(req: Request) {
  const body = await req.json();
  const { dateRange } = body; // Chỉ lấy dateRange từ body
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

    const favoriteProduct = await prismadb.favoriteProduct.findMany({
      where: {
        ...(dateRange && {
          createdAt: {
            gte: new Date(dateRange.from), // Lọc theo ngày bắt đầu
            lte: new Date(dateRange.to), // Lọc theo ngày kết thúc
          },
        }),
      },
      select: {
        createdAt: true, // Lấy createdAt của favoriteProduct
        product: {
          select: {
            productType: true,
          },
        },
      },
    });

    const users: User[] = await prismadb.user.findMany({
      where: {
        ...(dateRange && {
          createdAt: {
            gte: new Date(dateRange.from), // Lọc theo ngày bắt đầu
            lte: new Date(dateRange.to), // Lọc theo ngày kết thúc
          },
        }),
      },
      select: {
        favorite: true,
        createdAt: true,
      },
    });

    // Nếu không có dữ liệu nào trong users và favoriteProduct, trả về mảng rỗng
    if (users.length === 0 && favoriteProduct.length === 0) {
      return NextResponse.json([]);
    }

    const userFavoriteCounts: UserFavoriteCount = users.reduce((acc, user) => {
      user.favorite.forEach((fav) => {
        acc[fav] = (acc[fav] || 0) + 1;
      });
      return acc;
    }, {} as UserFavoriteCount);

    const productTypeCounts: ProductTypeCount = favoriteProduct.reduce(
      (acc, favProd) => {
        const type = favProd.product.productType;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      {} as ProductTypeCount
    );

    const earliestCreatedAtUser = users.reduce((earliest, user) => {
      return user.createdAt < earliest ? user.createdAt : earliest;
    }, users[0]?.createdAt);

    const earliestCreatedAtFavoriteProduct = favoriteProduct.reduce(
      (earliest, fav) => {
        return fav.createdAt < earliest ? fav.createdAt : earliest;
      },
      favoriteProduct[0]?.createdAt
    );

    const earliestCreatedAt =
      earliestCreatedAtUser < earliestCreatedAtFavoriteProduct
        ? earliestCreatedAtUser
        : earliestCreatedAtFavoriteProduct;

    // Tạo mảng response với các kiểu dữ liệu khác nhau
    const response: ResponseData[] = [
      ...Object.entries(userFavoriteCounts).map(([subject, count]) => ({
        subject,
        totalFavoriteType: count,
      })),
      ...Object.entries(productTypeCounts).map(([subject, count]) => ({
        subject,
        totalFavoriteProduct: count,
      })),
    ];

    // Thêm đối tượng createdAt vào mảng nếu có dữ liệu
    if (response.length > 0) {
      response.push({
        createdAt: earliestCreatedAt.getTime(),
      });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal error while fetching data." }),
      { status: 500 }
    );
  }
}

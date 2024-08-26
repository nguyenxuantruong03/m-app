import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const body = await req.json();
  const { coin, rotation, userId, isCheckPayment, idOrderItem } = body;

  try {
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Kiểm tra sự tồn tại của người dùng với userId
    const existingEntry = await prismadb.wheelSpin.findFirst({
      where: {
        userId: userId,
        storeId: params.storeId,
      },
    });

    let finalCoin;

    if (isCheckPayment) {
      // Nếu isCheckPayment, luôn đặt coin là 0
      finalCoin = 0;
    } else {
      // Nếu không có isCheckPayment, cộng giá trị hiện tại với adjustedCoin
      finalCoin = existingEntry ? existingEntry.coin + coin : coin;
    }

    let result;

    if (existingEntry) {
      // Nếu đã tồn tại, cập nhật thông tin
      result = await prismadb.wheelSpin.update({
        where: { id: existingEntry.id },
        data: {
          coin: finalCoin,
          rotation: existingEntry.rotation + rotation,
        },
      });
    } else {
      // Nếu chưa tồn tại, tạo mới
      result = await prismadb.wheelSpin.create({
        data: {
          coin: finalCoin,
          rotation,
          userId: userId || "",
          storeId: params.storeId,
        },
      });
    }

    if(isCheckPayment){
      //Cập nhật isGiff thành true để khi tránh phát quà liên tục
      await prismadb.orderItem.update({
        where: {
          id: idOrderItem,
        },
        data: {
          isGift: true,
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const userId = await currentUser();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const coins = await prismadb.wheelSpin.findMany({
      where: {
        userId: userId.id || "",
      },
    });
    // Return the sum of all coins
    // Tính tổng số lượng coin
    const totalCoins = coins.reduce((total, coin) => {
      const coinAmount = coin.coin;
      return total + coinAmount;
    }, 0);
    // Tính tổng rotation
    const latestRotation = coins.reduce((total, coin) => {
      return total + coin.rotation;
    }, 0);
    return NextResponse.json({ totalCoins, latestRotation });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
//--------------Delete xóa tất cả bao gôm rotation và coin --------------------------------

// export async function DELETE(req: Request) {
//   try {
//     await prismadb.wheelSpin.deleteMany();  // Delete all wheel spins
//     return new NextResponse('Total coins reset successfully', { status: 200 });
//   } catch (error) {
//     console.error('Error resetting total coins:', error);
//     return new NextResponse('Internal error', { status: 500 });
//   }
// }

//--------------Delete xóa coins --------------------------------
// export async function DELETE({ params }: { params: { storeId: string } }) {
//   try {
//     const userId = await currentUser();

//     if (!userId) {
//       return new NextResponse("Unauthenticated", { status: 403 });
//     }

//     // Find the specific wheelSpin record for the authenticated user
//     const existingWheelSpin = await prismadb.wheelSpin.findFirst({
//       where: {
//         userId: userId.id || "",
//         storeId: params.storeId,
//       },
//     });

//     if (!existingWheelSpin) {
//       return new NextResponse("No wheelSpin record found for the user", {
//         status: 404,
//       });
//     }

//     // Update only the 'coin' field to 0
//     await prismadb.wheelSpin.update({
//       where: { id: existingWheelSpin.id },
//       data: { coin: 0 },
//     });

//     return new NextResponse("Coin reset successfully", { status: 200 });
//   } catch (error) {
//     console.error("Error resetting coin:", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

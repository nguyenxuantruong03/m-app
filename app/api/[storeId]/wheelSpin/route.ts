import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const body = await req.json();
  const { coin, rotation } = body;

  try {
    const userId = await currentUser();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const Coin = await prismadb.wheelSpin.create({
      data: {
        coin,
        rotation,
        userId: userId.id || "",
        storeId: params.storeId,
      },
    });
    await prismadb.wheelSpin.update({
      where: { id: Coin.id },
      data: { rotation },
    });

    return NextResponse.json(Coin);
  } catch (error) {
    console.error("Error creating comment:", error);
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

import { currentUser } from "@/lib/auth";
import { sendSpin, sendunSpin } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const userId = await currentUser();
     
      const WheelSpin = await prismadb.wheelSpin.findMany({
        where: { userId: userId?.id || ""},
      });
      return NextResponse.json(WheelSpin);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Internal error get wheelspin." }),
        { status: 500 }
      );
    }
  }

  export async function PATCH(
    req: Request,{ params }: { params: { storeId: string } }
  ) {
    const userId = await currentUser();
    const body = await req.json();
  
    const { bonusAmount, bonusTitle, bonus, coinAmount, coinbonus } = body;
  
    try {
      if (!userId) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy user id!" }),
          { status: 403 }
        );
      }
  
      if(!bonus){
        return new NextResponse(
          JSON.stringify({ error: "Bonus is required." }),
          { status: 400 }
        );
      }
  
      if(!coinbonus){
          return new NextResponse(
            JSON.stringify({ error: "Coin is required." }),
            { status: 400 }
          );
        }
  
      if(!bonusTitle){
        return new NextResponse(
          JSON.stringify({ error: "Bonus title is required." }),
          { status: 400 }
        );
      }
      const today = new Date();
      const formattedDate = format(today, "E '-' dd/MM/yyyy '-' HH:mm:ss a");
      await sendSpin(
        userId?.email,
        userId?.name,
        bonus,
        bonusAmount,
        coinbonus,
        coinAmount,
        bonusTitle,
        formattedDate
      );
      const existingWheelSpin = await prismadb.wheelSpin.findFirst({
        where: {
          storeId: params.storeId,
          userId: userId?.id || ""
        }
      });
  
      if (!existingWheelSpin) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy bản ghi cần cập nhật." }),
          { status: 404 }
        );
      }
  
      const updatedWheelSpin = await prismadb.wheelSpin.update({
        where: {
          id: existingWheelSpin.id
        },
        data: {
          rotation: bonusAmount || existingWheelSpin.rotation,
          coin: coinAmount || existingWheelSpin.coin
        }
      });
  
      return NextResponse.json(updatedWheelSpin);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Lỗi nội bộ khi cập nhật vòng quay." }),
        { status: 500 }
      );
    }
  }
  

export async function POST(
  req: Request,{ params }: { params: { storeId: string } }
) {
  const userId = await currentUser();
  const body = await req.json();

  const { unbonusAmount, unbonusTitle, unbonus,unbonusCoinsupdated,unbonuscoinnew } = body;

  try {
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }
    
    if(!unbonus){
      return new NextResponse(
        JSON.stringify({ error: "Unbonus is required." }),
        { status: 400 }
      );
    }

    if(!unbonuscoinnew){
        return new NextResponse(
          JSON.stringify({ error: "UnCoin is required." }),
          { status: 400 }
        );
      }

    if(!unbonusTitle){
      return new NextResponse(
        JSON.stringify({ error: "Unbonus title is required." }),
        { status: 400 }
      );
    }
    const existingWheelSpin = await prismadb.wheelSpin.findFirst({
      where: {
        storeId: params.storeId,
        userId: userId?.id || ""
      }
    });

    if (!existingWheelSpin) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy bản ghi cần cập nhật." }),
        { status: 404 }
      );
    }
    const today = new Date();
    const formattedDate = format(today, "E '-' dd/MM/yyyy '-' HH:mm:ss a");
     await sendunSpin(
       userId?.email,
       userId?.name,
       unbonus,
       unbonusAmount,
       unbonuscoinnew,
       unbonusCoinsupdated,
       unbonusTitle,
       formattedDate
     );
     //Cập nhật điểm vào cơ sở dữ liệu
    const wheelSpin = await prismadb.wheelSpin.update({
      where: {
        id: existingWheelSpin.id
      },
      data: {
        rotation: unbonusAmount || existingWheelSpin.rotation,
        coin: unbonusCoinsupdated || existingWheelSpin.coin
      }
    });

    return NextResponse.json(wheelSpin);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post wheelspin." }),
      { status: 500 }
    );
  }
}
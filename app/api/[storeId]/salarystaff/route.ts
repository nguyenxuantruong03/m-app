import { currentUser } from "@/lib/auth";
import { sendBonus, sendunBonus } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const salarystaff = await prismadb.caculateSalary.findMany();
    return NextResponse.json(salarystaff);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const userId = await currentUser();
  const body = await req.json();

  const { bonusAmount, bonusTitle, bonus } = body;

  try {
    const formatterbonus = formatter.format(bonus);
    const formattercurrentmoney = formatter.format(bonusAmount);
    const today = new Date();
    const formattedDate = format(today, "E '-' dd/MM/yyyy '-' HH:mm:ss a");
    await sendBonus(
      userId?.email,
      userId?.name,
      formatterbonus,
      formattercurrentmoney,
      bonusTitle,
      formattedDate
    );
    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: userId?.id },
    });

    let existingSalary = await prismadb.caculateSalary.findFirst({
      where: {
        userId: userId?.id,
        eventcalendarId: eventcalendar?.id,
      },
    });
    // Cập nhật điểm vào cơ sở dữ liệu
    const caculateSalary = await prismadb.caculateSalary.update({
      where: { id: existingSalary?.id },
      data: {
        bonus: bonusAmount,
      },
    });

    return NextResponse.json(caculateSalary);
  } catch (error) {
    console.error("Lỗi", error);
    return new NextResponse("Lỗi nội bộ", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const userId = await currentUser();
  const body = await req.json();

  const { unbonusAmount, unbonusTitle, unbonus } = body;

  try {
    const formatteunbonus = formatter.format(unbonus);
    const formattercurrentmoney = formatter.format(unbonusAmount);
    const today = new Date();
    const formattedDate = format(today, "E '-' dd/MM/yyyy '-' HH:mm:ss a");
    await sendunBonus(
      userId?.email,
      userId?.name,
      formatteunbonus,
      formattercurrentmoney,
      unbonusTitle,
      formattedDate
    );
    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: userId?.id },
    });

    let existingSalary = await prismadb.caculateSalary.findFirst({
      where: {
        userId: userId?.id,
        eventcalendarId: eventcalendar?.id,
      },
    });
    // Cập nhật điểm vào cơ sở dữ liệu
    const caculateSalary = await prismadb.caculateSalary.update({
      where: { id: existingSalary?.id },
      data: {
        bonus: unbonusAmount,
      },
    });

    return NextResponse.json(caculateSalary);
  } catch (error) {
    console.error("Lỗi", error);
    return new NextResponse("Lỗi nội bộ", { status: 500 });
  }
}

// async function main() {
//   try {
//     // Xóa tất cả các bản ghi từ bảng CaculateSalary
//     await prismadb.caculateSalary.deleteMany();
//     console.log("Dữ liệu của CaculateSalary đã được xóa thành công.");
//   } catch (error) {
//     console.error("Đã xảy ra lỗi khi xóa dữ liệu của CaculateSalary:", error);
//   } finally {
//     // Đóng kết nối
//     await prismadb.$disconnect();
//   }
// }

// main();

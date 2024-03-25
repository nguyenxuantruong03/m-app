import { currentUser } from "@/lib/auth";
import { sendSalarytotal } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { format, subHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { NextResponse } from "next/server";
import viLocale from "date-fns/locale/vi";
import { formatter } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const userId = await currentUser();
    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: userId?.id },
    });

    let existingSalary = await prismadb.caculateSalary.findFirst({
      where: {
        userId: userId?.id,
        eventcalendarId: eventcalendar?.id,
      },
    });
    const salarystaff = await prismadb.caculateSalary.findUnique({
      where: { id: existingSalary?.id },
      include: {
        eventcalendar: true,
        user: true,
      },
    });

    return NextResponse.json(salarystaff);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const userId = await currentUser();
  try {
    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: userId?.id },
    });

    let existingSalary = await prismadb.caculateSalary.findFirst({
      where: {
        userId: userId?.id,
        eventcalendarId: eventcalendar?.id,
      },
    });
    const totalsalary =Number(existingSalary?.bonus) + Number(existingSalary?.salaryday);
    const formattersalary = formatter.format(totalsalary)
    const today = new Date();
    const formattedDate = format(today, "E '-' dd/MM/yyyy '-' HH:mm:ss a");
    await sendSalarytotal(
      userId?.email,
      userId?.name,
      formattersalary,
      formattedDate
    );
    const caculateSalary = await prismadb.caculateSalary.update({
      where: { id: existingSalary?.id },
      data: {
        bonus: 0,
        isPaid: true,
        isSent: true,
        salaryday: 0,
        salarytotal: 0,
      },
    });

    return NextResponse.json(caculateSalary);
  } catch (error) {
    console.error("Lỗi", error);
    return new NextResponse("Lỗi nội bộ", { status: 500 });
  }
}

export async function POST(req: Request) {
  const userId = await currentUser();
  try {
    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: userId?.id },
    });

    let existingSalary = await prismadb.caculateSalary.findFirst({
      where: {
        userId: userId?.id,
        eventcalendarId: eventcalendar?.id,
      },
    });
    const caculateSalary = await prismadb.caculateSalary.update({
      where: { id: existingSalary?.id },
      data: {
        bonus: 0,
        isPaid: false,
        isSent: false,
        salaryday: 0,
        salarytotal: 0,
      },
    });

    return NextResponse.json(caculateSalary);
  } catch (error) {
    console.error("Lỗi", error);
    return new NextResponse("Lỗi nội bộ", { status: 500 });
  }
}

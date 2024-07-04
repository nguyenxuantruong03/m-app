import { currentUser } from "@/lib/auth";
import { sendSalarytotal } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { NextResponse } from "next/server";
import { formatter } from "@/lib/utils";
import { Decimal } from "@prisma/client/runtime/library";

type SalaryStaffValue =string | number | boolean | Date | Decimal | null | undefined;

interface ChangeRecord {
  oldValue: SalaryStaffValue;
  newValue: SalaryStaffValue;
}

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
    return new NextResponse(
      JSON.stringify({ error: "Internal error get salarystaff." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
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
    const totalsalary =
      Number(existingSalary?.bonus) + Number(existingSalary?.salaryday);
    const formattersalary = formatter.format(totalsalary);
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

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingSalary) {
      if (
        existingSalary.hasOwnProperty(key) &&
        caculateSalary.hasOwnProperty(key)
      ) {
        if (
          existingSalary[key as keyof typeof existingSalary] !==
          caculateSalary[key as keyof typeof caculateSalary]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingSalary[key as keyof typeof existingSalary],
              newValue: caculateSalary[key as keyof typeof caculateSalary],
            };
          }
        }
      }
    }

    //Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
    const oldChanges = Object.keys(changes).map((key) => {
      return `${key}: { Old: '${changes[key].oldValue}'}`;
    });
    const newChanges = Object.keys(changes).map((key) => {
      return `${key}: { New: '${changes[key].newValue}'}`;
    });

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        oldChange: oldChanges,
        newChange: newChanges,
        type: "UPDATECACULATESALARY",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(caculateSalary);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch salarystaff." }),
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
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

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingSalary) {
      if (
        existingSalary.hasOwnProperty(key) &&
        caculateSalary.hasOwnProperty(key)
      ) {
        if (
          existingSalary[key as keyof typeof existingSalary] !==
          caculateSalary[key as keyof typeof caculateSalary]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingSalary[key as keyof typeof existingSalary],
              newValue: caculateSalary[key as keyof typeof caculateSalary],
            };
          }
        }
      }
    }

    //Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
    const oldChanges = Object.keys(changes).map((key) => {
      return `${key}: { Old: '${changes[key].oldValue}'}`;
    });
    const newChanges = Object.keys(changes).map((key) => {
      return `${key}: { New: '${changes[key].newValue}'}`;
    });

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        oldChange: oldChanges,
        newChange: newChanges,
        type: "UPDATERESETSALARY",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(caculateSalary);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post salarystaff." }),
      { status: 500 }
    );
  }
}

import { currentUser } from "@/lib/auth";
import { sendBonus, sendunBonus } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { EventCalendar, User, UserRole } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { format } from "date-fns";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

type SalaryStaffValue = string | number |EventCalendar | User |  boolean | Decimal | Date | undefined | null;

interface ChangeRecord {
  oldValue: SalaryStaffValue;
  newValue: SalaryStaffValue;
}

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    const salarystaff = await prismadb.caculateSalary.findMany();
    return NextResponse.json(salarystaff);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.salarystaff.internalErrorGetSalaryStaff") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  const body = await req.json();
  const { bonusAmount, bonusTitle, bonus } = body;

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!bonus) {
      return new NextResponse(JSON.stringify({ error: t("toastError.salarystaff.bonusRequired") }), {
        status: 400,
      });
    }

    if (!bonusTitle) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.salarystaff.bonusTitleRequired") }),
        { status: 400 }
      );
    }

    //Dùng để kiểm tra cũ chưa update
    const existingEventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: user?.id },
    });

    let existingSalaryNotUpdate = await prismadb.caculateSalary.findFirst({
      where: {
        userId: user?.id,
        eventcalendarId: existingEventcalendar?.id,
      },
    });
    const salarystaff = await prismadb.caculateSalary.findUnique({
      where: { id: existingSalaryNotUpdate?.id },
      include: {
        eventcalendar: true,
        user: true,
      },
    });

    const formatterbonus = formatter.format(bonus);
    const formattercurrentmoney = formatter.format(bonusAmount);
    const today = new Date();
    const formattedDate = format(today, "E '-' dd/MM/yyyy '-' HH:mm:ss a");
    await sendBonus(
      user?.language,
      user?.email,
      user?.name,
      formatterbonus,
      formattercurrentmoney,
      bonusTitle,
      formattedDate
    );
    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: user?.id },
    });

    let existingSalary = await prismadb.caculateSalary.findFirst({
      where: {
        userId: user?.id,
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

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in salarystaff) {
      if (
        salarystaff.hasOwnProperty(key) &&
        caculateSalary.hasOwnProperty(key)
      ) {
        if (
          salarystaff[key as keyof typeof salarystaff] !==
          caculateSalary[key as keyof typeof caculateSalary]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: salarystaff[key as keyof typeof salarystaff],
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
        type: "UPDATEBONUS",
        user: user?.email || "",
      },
    });

    return NextResponse.json(caculateSalary);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.salarystaff.internalErrorPatchSalaryStaff") }),
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  const body = await req.json();
  const { unbonusAmount, unbonusTitle, unbonus } = body;

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!unbonus) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.salarystaff.unbonusRequired") }),
        { status: 400 }
      );
    }

    if (!unbonusTitle) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.salarystaff.unbonusTitleRequired") }),
        { status: 400 }
      );
    }

    //Dùng để kiểm tra cũ chưa update
    const existingEventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: user?.id },
    });

    let existingSalaryNotUpdate = await prismadb.caculateSalary.findFirst({
      where: {
        userId: user?.id,
        eventcalendarId: existingEventcalendar?.id,
      },
    });
    const salarystaff = await prismadb.caculateSalary.findUnique({
      where: { id: existingSalaryNotUpdate?.id },
      include: {
        eventcalendar: true,
        user: true,
      },
    });

    const formatteunbonus = formatter.format(unbonus);
    const formattercurrentmoney = formatter.format(unbonusAmount);
    const today = new Date();
    const formattedDate = format(today, "E '-' dd/MM/yyyy '-' HH:mm:ss a");
    await sendunBonus(
      user?.language,
      user?.email,
      user?.name,
      formatteunbonus,
      formattercurrentmoney,
      unbonusTitle,
      formattedDate
    );
    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: user?.id },
    });

    let existingSalary = await prismadb.caculateSalary.findFirst({
      where: {
        userId: user?.id,
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

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in salarystaff) {
      if (
        salarystaff.hasOwnProperty(key) &&
        caculateSalary.hasOwnProperty(key)
      ) {
        if (
          salarystaff[key as keyof typeof salarystaff] !==
          caculateSalary[key as keyof typeof caculateSalary]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: salarystaff[key as keyof typeof salarystaff],
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
        type: "UPDATEUNBONUS",
        user: user?.email || "",
      },
    });

    return NextResponse.json(caculateSalary);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.salarystaff.internalErrorPostSalaryStaff") }),
      { status: 500 }
    );
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

import { currentUser } from "@/lib/auth";
import { sendAttendanceEnd } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { Degree, UserRole } from "@prisma/client";
import { format, subHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { NextResponse } from "next/server";
import viLocale from "date-fns/locale/vi";
import { translateEventCalendarEndGet, translateEventCalendarEndPost } from "@/translate/translate-api";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const eventCalendarEndGetMessage = translateEventCalendarEndGet(LanguageToUse)
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndGetMessage.userIdNotFound }),
        { status: 403 }
      );
    }
    
    if (user.role === UserRole.GUEST || user.role === UserRole.USER) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndGetMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndGetMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndGetMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Find all events of the store, ordered by end time descending
    const allEvents = await prismadb.eventCalendar.findMany({
      where: {
        storeId: params.storeId,
        userId: user?.id || "",
      },
      orderBy: {
        end: "desc",
      },
    });

    // Find the latest event with non-null end time
    let latestEvent = null;
    for (const event of allEvents) {
      if (event.end !== null) {
        latestEvent = event;
        break;
      }
    }

     //Check nếu như đã điểm danh thì lọt vào đây
     if(latestEvent?.isEnd === true) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndGetMessage.dayEnded }),
        { status: 400 }
      );
    }

    //Hiện tại không thể dùng cách utcToZonedTime để change sang giờ VN nên tôi + 7 tiếng để chuyển giờ quốc tế sang giờ VN
    const currentTimeVN = new Date();
    currentTimeVN.setHours(currentTimeVN.getHours() + 7);

    if (latestEvent) {
      const latestEventEnd = new Date(latestEvent.end!);
      if (currentTimeVN >= latestEventEnd) {
        return NextResponse.json(latestEvent);
      } else {
        return new NextResponse(
          JSON.stringify({
            error: `${eventCalendarEndGetMessage.attendanceNotFinished}: ${
              latestEventEnd
                ? format(
                    utcToZonedTime(
                      subHours(new Date(latestEventEnd), 7),
                      vietnamTimeZone
                    ),
                    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                    { locale: viLocale }
                  )
                : null
            }.`,
          }),
          { status: 400 }
        );
      }
    } else {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndGetMessage.noAttendanceFound }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: eventCalendarEndGetMessage.internalError }),
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
  const LanguageToUse = user?.language || "vi";
  const eventCalendarEndPostMessage = translateEventCalendarEndPost(LanguageToUse)

  try {
    const body = await req.json();
    const { title, start, allDay, attendancestart, attendanceend } = body;

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndPostMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndPostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role === UserRole.GUEST || user.role === UserRole.USER) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndPostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndPostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    //Check nếu hôm nay ko phải ngày làm thì error
    const today = new Date();
    today.setHours(today.getHours() + 7);
    const dayName = format(today, "EEEE"); // 'EEEE' là định dạng để lấy tên của thứ trong tiếng Anh

    const dateWorkAttendance = user?.daywork.join(", ");

    if (dateWorkAttendance && !dateWorkAttendance.includes(dayName)) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarEndPostMessage.notYourWorkingDay }),
        { status: 403 }
      );
    }

    const allEvents = await prismadb.eventCalendar.findMany({
      where: {
        storeId: params.storeId,
        userId: user?.id || "",
      },
      orderBy: {
        end: "desc",
      },
    });

    // Find the latest event with non-null end time
    let latestEvent = null;
    for (const event of allEvents) {
      if (event.end !== null) {
        latestEvent = event;
        break;
      }
    }

    //Chuyển isEnd thành true để disable button kết thúc
    if (latestEvent && !latestEvent.isEnd) {
      // Update latestEvent with isEnd: true
      await prismadb.eventCalendar.update({
        where: { id: latestEvent.id },
        data: { isEnd: true },
      });
    }

    // Chuyển đổi start và end sang múi giờ của Việt Nam
    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start: start,
        end: null,
        allDay,
        storeId: params.storeId,
        attendancestart,
        attendanceend,
        userId: user?.id || "",
      },
    });
    
    const vnTimeZone = "Asia/Ho_Chi_Minh";
    const emailTimeStart = eventCalendar.start
      ? format(
          utcToZonedTime(
            subHours(new Date(eventCalendar.start), 7),
            vnTimeZone
          ),
          "E '-' dd/MM/yyyy '-' HH:mm:ss a",
          { locale: viLocale }
        )
      : null;
    await sendAttendanceEnd(user?.language, user?.email, user?.name, emailTimeStart);

    //Đây là khi check với totle ✅ là đc cộng lương nhưng tôi đã làm ở bên camera và nfc
    // const eventcalendar = await prismadb.eventCalendar.findUnique({
    //   where: { id: userId?.id },
    // });

    // let totalPoints = 0; // Khởi tạo tổng điểm

    // let checkCount = 0;
    // for (const title of eventcalendar?.title || "") {
    //   if (title.includes("✅")) {
    //     checkCount++;
    //   }
    // }

    // // Kiểm tra nếu đủ 26 "✅" thì thêm 500 điểm
    // if (checkCount >= 26) {
    //   totalPoints += 500000;
    // }

    // const user = await prismadb.user.findUnique({
    //   where: { id: userId?.id },
    // });

    // switch (user?.degree) {
    //   case Degree.Elementary:
    //   case Degree.JuniorHighSchool:
    //     totalPoints += 250000;
    //     break;
    //   case Degree.HighSchool:
    //   case Degree.JuniorColleges:
    //     totalPoints += 300000;
    //     break;
    //   case Degree.University:
    //   case Degree.MastersDegree:
    //     totalPoints += 400000;
    //     break;
    //   default:
    //     totalPoints += 0;
    //     break;
    // }

    // // Tìm và cập nhật bản ghi tồn tại nếu có, nếu không, tạo mới
    // let existingSalary = await prismadb.caculateSalary.findFirst({
    //   where: {
    //     userId: userId?.id,
    //     eventcalendarId: eventcalendar?.id,
    //   },
    // });

    // if (existingSalary) {
    //   // Chuyển đổi giá trị từ Decimal thành number trước khi thêm vào totalPoints
    //   const existingSalaryValue = existingSalary.salaryday
    //     ? parseFloat(existingSalary.salaryday.toString())
    //     : 0;
    //   totalPoints += existingSalaryValue;
    //   await prismadb.caculateSalary.update({
    //     where: { id: existingSalary.id },
    //     data: {
    //       storeId: params.storeId, // Include the required fields
    //       salaryday: totalPoints,
    //       eventcalendarId: eventcalendar?.id || "",
    //       userId: userId?.id || "",
    //     },
    //   });
    // } else {
    //   // Tạo bản ghi mới nếu không có bản ghi tồn tại
    //   await prismadb.caculateSalary.create({
    //     data: {
    //       storeId: params.storeId, // Include the required fields
    //       userId: userId?.id || "",
    //       eventcalendarId: eventcalendar?.id || "",
    //       salaryday: totalPoints,
    //     },
    //   });
    // }

    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: eventCalendarEndPostMessage.internalError }),
      { status: 500 }
    );
  }
}

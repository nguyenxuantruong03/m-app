import { currentUser } from "@/lib/auth";
import { sendAttendanceEnd } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { Degree, UserRole } from "@prisma/client";
import { format, subHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { NextResponse } from "next/server";
import viLocale from "date-fns/locale/vi";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });

     if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    // Find all events of the store, ordered by end time descending
    const allEvents = await prismadb.eventCalendar.findMany({
      where: {
        storeId: params.storeId,
        userId: userId?.id || "",
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

    //Hiện tại không thể dùng cách utcToZonedTime để change sang giờ VN nên tôi + 7 tiếng để chuyển giờ quốc tế sang giờ VN
    const currentTimeVN = new Date();
    currentTimeVN.setHours(currentTimeVN.getHours() + 7);

    if (latestEvent) {
      const latestEventEnd = new Date(latestEvent.end!);
      const vnTimeZone = "Asia/Ho_Chi_Minh";
      const latestEventEndVN = utcToZonedTime(latestEventEnd, vnTimeZone);
      if (currentTimeVN >= latestEventEndVN) {
        return NextResponse.json(latestEvent);
      } else {
          return new NextResponse(
            JSON.stringify({ error: "Sự kiện chưa kết thúc!" }),
            { status: 400 }
          );
      }
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Không có sự kiện nào diễn ra!" }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get eventcalendarend." }),
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { title, start, allDay, attendancestart, attendanceend } = body;

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    // Chuyển đổi start và end sang múi giờ của Việt Nam
    const vnTimeZone = "Asia/Ho_Chi_Minh";
    const zonedStart = utcToZonedTime(new Date(start), vnTimeZone);
    const formattedStart = format(zonedStart, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start: formattedStart,
        end: null,
        allDay,
        storeId: params.storeId,
        attendancestart,
        attendanceend,
        userId: userId?.id || "",
      },
    });

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
    await sendAttendanceEnd(userId?.email, userId?.name, emailTimeStart);

    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: userId?.id },
    });

    let totalPoints = 0; // Khởi tạo tổng điểm

    let checkCount = 0;
    for (const title of eventcalendar?.title || "") {
      if (title.includes("✅")) {
        checkCount++;
      }
    }

    // Kiểm tra nếu đủ 26 "✅" thì thêm 500 điểm
    if (checkCount >= 26) {
      totalPoints += 500000;
    }

    const user = await prismadb.user.findUnique({
      where: { id: userId?.id },
    });

    switch (user?.degree) {
      case Degree.Elementary:
      case Degree.JuniorHighSchool:
        totalPoints += 250000;
        break;
      case Degree.HighSchool:
      case Degree.JuniorColleges:
        totalPoints += 300000;
        break;
      case Degree.University:
      case Degree.MastersDegree:
        totalPoints += 400000;
        break;
      default:
        totalPoints += 0;
        break;
    }

    // Tìm và cập nhật bản ghi tồn tại nếu có, nếu không, tạo mới
    let existingSalary = await prismadb.caculateSalary.findFirst({
      where: {
        userId: userId?.id,
        eventcalendarId: eventcalendar?.id,
      },
    });

    if (existingSalary) {
      // Chuyển đổi giá trị từ Decimal thành number trước khi thêm vào totalPoints
      const existingSalaryValue = existingSalary.salaryday
        ? parseFloat(existingSalary.salaryday.toString())
        : 0;
      totalPoints += existingSalaryValue;
      await prismadb.caculateSalary.update({
        where: { id: existingSalary.id },
        data: {
          storeId: params.storeId, // Include the required fields
          salaryday: totalPoints,
          eventcalendarId: eventcalendar?.id || "",
          userId: userId?.id || "",
        },
      });
    } else {
      // Tạo bản ghi mới nếu không có bản ghi tồn tại
      await prismadb.caculateSalary.create({
        data: {
          storeId: params.storeId, // Include the required fields
          userId: userId?.id || "",
          eventcalendarId: eventcalendar?.id || "",
          salaryday: totalPoints,
        },
      });
    }

    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post eventcalendar." }),
      { status: 500 }
    );
  }
}

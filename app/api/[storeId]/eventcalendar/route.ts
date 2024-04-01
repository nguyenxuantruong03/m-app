import { currentUser } from "@/lib/auth";
import { sendAttendanceStart } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { Degree, UserRole, WorkingTime } from "@prisma/client";
import { format, subHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { NextResponse } from "next/server";
import viLocale from "date-fns/locale/vi";

export async function GET(req: Request) {
  try {
    const eventCalendar = await prismadb.eventCalendar.findMany();
    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get eventcalendar." }),
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

    if (!start) {
      return new NextResponse(
        JSON.stringify({ error: "Start is required!" }),
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

    const user = await prismadb.user.findUnique({
      where: { id: userId?.id },
    });

    // Calculate end based on working time
    let endTime: Date | undefined;
    switch (user?.workingTime) {
      case WorkingTime.Parttime4h:
        endTime = new Date(start);
        endTime.setHours(endTime.getHours() + 4);
        break;
      case WorkingTime.Parttime8h:
      case WorkingTime.SeasonalJob:
        endTime = new Date(start);
        endTime.setHours(endTime.getHours() + 8);
        break;
      case WorkingTime.Fulltime:
        endTime = new Date(start);
        endTime.setHours(endTime.getHours() + 12);
        break;
      default:
        return new NextResponse(
          JSON.stringify({ error: "Invalid working time!" }),
          { status: 400 }
        );
    }

    //Chuyển sang giờ VIỆT NAM
    const vnTimeZone = "Asia/Ho_Chi_Minh";
    const zonedStartTime = utcToZonedTime(new Date(start), vnTimeZone);
    const zonedEndTime = utcToZonedTime(endTime, vnTimeZone);

    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start: zonedStartTime,
        end: zonedEndTime,
        allDay,
        storeId: params.storeId,
        attendancestart,
        attendanceend,
        userId: userId?.id || "",
      },
    });
    const emailtimestart = eventCalendar.start
      ? format(
          utcToZonedTime(
            subHours(new Date(eventCalendar.start), 7),
            vnTimeZone
          ),
          "E '-' dd/MM/yyyy '-' HH:mm:ss a",
          { locale: viLocale }
        )
      : null;
    const emailTimeend = eventCalendar.end
      ? format(
          utcToZonedTime(subHours(new Date(eventCalendar.end), 7), vnTimeZone),
          "E '-' dd/MM/yyyy '-' HH:mm:ss a",
          { locale: viLocale }
        )
      : null;
    await sendAttendanceStart(
      userId?.email,
      userId?.name,
      emailtimestart,
      emailTimeend
    );

    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post eventcalendar." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { title, start, allDay, attendancestart, attendanceend } = body;

    if (!start) {
      return new NextResponse(
        JSON.stringify({ error: "Start is required!" }),
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

    //Chuyển sang giờ VIỆT NAM
    const vnTimeZone = "Asia/Ho_Chi_Minh";
    const zonedStartTime = utcToZonedTime(new Date(start), vnTimeZone);
    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start: zonedStartTime,
        allDay,
        end: null,
        storeId: params.storeId,
        attendancestart,
        attendanceend,
        userId: userId?.id || "",
      },
    });

    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch eventcalendar." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    // Extract event ID from the request body
    const { eventId } = await req.json();

    if (!eventId) {
      return new NextResponse("Event id is required!", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    // Check if the user has access to the specified store
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
    
    // Delete the event with the specified ID
    const deletedEvent = await prismadb.eventCalendar.delete({
      where: {
        id: eventId,
        userId: userId?.id,
      },
    });

    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: userId?.id },
    });

    let totalPoints = 0; // Khởi tạo tổng điểm

    const user = await prismadb.user.findUnique({
      where: { id: userId?.id },
    });

    switch (user?.degree) {
      case Degree.Elementary:
      case Degree.JuniorHighSchool:
        totalPoints -= 250000;
        break;
      case Degree.HighSchool:
      case Degree.JuniorColleges:
        totalPoints -= 300000;
        break;
      case Degree.University:
      case Degree.MastersDegree:
        totalPoints -= 400000;
        break;
      default:
        totalPoints -= 0;
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
    }
    return NextResponse.json(deletedEvent);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete eventcalendar." }),
      { status: 500 }
    );
  }
}

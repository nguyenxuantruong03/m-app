import { currentUser } from "@/lib/auth";
import { sendAttendanceStart } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { User, UserRole, WorkingTime } from "@prisma/client";
import { format, subHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { NextResponse } from "next/server";
import viLocale from "date-fns/locale/vi";

export async function GET(req: Request) {
  try {
    const userId = await currentUser();
    const eventCalendar = await prismadb.eventCalendar.findMany({
      where: {
        userId: userId?.id,
      },
    });
    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get eventcalendar." }),
      { status: 500 }
    );
  }
}

//Dùng để chuyển timestartwork thành Date nếu không chuyển nó là string
async function getCurrentTimeWithWorkingTime(user: User) {
  if (!user || !user.timestartwork) {
    throw new Error("Invalid user or missing working time!");
  }

  const currentTime = new Date();
  const [hours, minutes] = user.timestartwork.split(":");
  const currentDate = new Date();
  currentDate.setHours(parseInt(hours, 10));
  currentDate.setMinutes(parseInt(minutes, 10));

  return { currentTime, currentDate };
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
      return new NextResponse(JSON.stringify({ error: "Start is required!" }), {
        status: 403,
      });
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

    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: userId?.id },
    });

    let totalPoints = 0; // Khởi tạo tổng điểm
    let delayHours: number | undefined; // Khỏi tạo delayHours

    const user = await prismadb.user.findUnique({
      where: { id: userId?.id },
    });

    if (!user?.workingTime) {
      return new NextResponse(
        JSON.stringify({ error: "Missing working time!" }),
        { status: 403 }
      );
    }

    if (!user?.timestartwork) {
      return new NextResponse(
        JSON.stringify({ error: "Missing time start work!" }),
        { status: 403 }
      );
    }

    //Check nếu hôm nay ko phải ngày làm thì error
    const today = new Date();
    today.setHours(today.getHours() + 7);
    const dayName = format(today, "EEEE"); // 'EEEE' là định dạng để lấy tên của thứ trong tiếng Anh

    const dateWorkAttendance = userId?.daywork.join(", ");

    if (dateWorkAttendance && !dateWorkAttendance.includes(dayName)) {
      return new NextResponse(
        JSON.stringify({ error: "Hôm nay không phải lịch làm của bạn!" }),
        { status: 403 }
      );
    }

    //currentTime: là thời gian hiện tại  còn curentDate là chuyển đổi thành Date của user.timestartwork
    const { currentTime, currentDate } = await getCurrentTimeWithWorkingTime(
      user
    );

    // Tính toán thời gian chậm trễ (tính bằng mili giây)
    const delayTime = currentTime.getTime() - currentDate.getTime();

    // Chuyển đổi thời gian chậm trễ từ mili giây sang giờ
    delayHours = delayTime / (1000 * 60 * 60); // 1000 milliseconds * 60 seconds * 60 minutes = 1 hour

    // Kiểm tra xem thời gian chậm trễ có lớn hơn một giờ không
    if (delayHours >= 1) {
      // Nếu thời gian chậm trễ lớn hơn hoặc bằng một giờ, trừ điểm
      totalPoints -= 50000;
    }
    //Kiểm tra nếu như delay  2 tiếng thì ko cho điểm danh
    if (delayHours >= 2) {
      return new NextResponse(
        JSON.stringify({
          error: "Bạn đã điểm danh trễ nên hãy quay lại vào ngày mai!",
        }),
        { status: 500 }
      );
    }
    // console.log(
    //   "delayTime:",
    //   Math.floor(delayTime / (1000 * 60 * 60)) +
    //     " hours " +
    //     Math.floor((delayTime % (1000 * 60 * 60)) / (1000 * 60)) +
    //     " minutes " +
    //     Math.floor((delayTime % (1000 * 60)) / 1000) +
    //     " seconds"
    // );
    // console.log(
    //   "delayHours:",
    //   Math.floor(delayHours) +
    //     " hours " +
    //     Math.floor((delayHours % 1) * 60) +
    //     " minutes"
    // );

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

    const vnTimeZone = "Asia/Ho_Chi_Minh";
    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start: start,
        end: endTime,
        allDay,
        storeId: params.storeId,
        attendancestart,
        delayTime:
          Math.floor(delayHours) +
          " giờ " +
          Math.floor((delayHours % 1) * 60) +
          " phút",
        attendanceend,
        isEnd: false,
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

    if ((delayHours ?? 0) >= 1) {
      await sendAttendanceStart(
        userId?.email,
        userId?.name,
        emailtimestart,
        emailTimeend,
        delayHours
      );
    } else {
      await sendAttendanceStart(
        userId?.email,
        userId?.name,
        emailtimestart,
        emailTimeend
      );
    }
    //Dùng để kiểm tra thời gian hiện tại phải lớn hơn hoặc bằng thời gian timestartwork mới được điểm danh
    if (currentTime.getTime() >= currentDate.getTime()) {
      return NextResponse.json(eventCalendar);
    } else {
      return new NextResponse(
        JSON.stringify({
          error: `Hãy quay lại vào lúc ${user.timestartwork}!`,
        }),
        { status: 500 }
      );
    }
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
      return new NextResponse(JSON.stringify({ error: "Start is required!" }), {
        status: 403,
      });
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

    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start: start,
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

    return NextResponse.json(deletedEvent);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete eventcalendar." }),
      { status: 500 }
    );
  }
}

import { currentUser } from "@/lib/auth";
import { sendAttendanceStart } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { User, UserRole, WorkingTime } from "@prisma/client";
import { format, subHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { NextResponse } from "next/server";
import viLocale from "date-fns/locale/vi";
import {
  translateEvenCalendarDelete,
  translateEvenCalendarGet,
  translateEvenCalendarPatch,
  translateEvenCalendarPost,
} from "@/translate/translate-api";

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const eventCalendarGetMessage = translateEvenCalendarGet(LanguageToUse);
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarGetMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role === UserRole.GUEST || user.role === UserRole.USER) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarGetMessage.permissionDenied }),
        { status: 403 }
      );
    }

    const eventCalendar = await prismadb.eventCalendar.findMany({
      where: {
        userId: user?.id,
      },
    });
    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: eventCalendarGetMessage.internalError }),
      { status: 500 }
    );
  }
}

//Dùng để chuyển timestartwork thành Date nếu không chuyển nó là string
async function getCurrentTimeWithWorkingTime(user: User, toastError: string) {
  if (!user || !user.timestartwork) {
    throw new Error(toastError);
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
  const userId = await currentUser();
    const body = await req.json();
    const { title, start, allDay, attendancestart, attendanceend } = body;

    const user = await prismadb.user.findUnique({
      where: { id: userId?.id },
    });

    //language
    const LanguageToUse = user?.language || "vi";
    const eventCalendarPostMessage = translateEvenCalendarPost(LanguageToUse, user?.timestartwork);
    
    if (!user?.timestartwork) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarPostMessage.missingTimeStartWork }),
        { status: 403 }
      );
    }
  try {
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarPostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (userId.role === UserRole.GUEST || userId.role === UserRole.USER) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarPostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!start) {
      return new NextResponse(JSON.stringify({ error: eventCalendarPostMessage.startRequired }), {
        status: 403,
      });
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarPostMessage.storeIdRequired  }),
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
        JSON.stringify({ error: eventCalendarPostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    const eventcalendar = await prismadb.eventCalendar.findUnique({
      where: { id: userId?.id },
    });

    let totalPoints = 0; // Khởi tạo tổng điểm
    let delayHours: number | undefined; // Khỏi tạo delayHours

    if (!user?.workingTime) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarPostMessage.missingWorkingTime }),
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
        JSON.stringify({ error: eventCalendarPostMessage.notYourWorkingDay }),
        { status: 403 }
      );
    }

    //currentTime: là thời gian hiện tại  còn curentDate là chuyển đổi thành Date của user.timestartwork
    const { currentTime, currentDate } = await getCurrentTimeWithWorkingTime(
      user,eventCalendarPostMessage.invalidUserOrMissingWorkingTime
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
          error: eventCalendarPostMessage.lateAttendance,
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
          JSON.stringify({ error: eventCalendarPostMessage.invalidWorkingTime }),
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
          error: eventCalendarPostMessage.timeStartWorkMessage,
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: eventCalendarPostMessage.internalError }),
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
  const LanguageToUse = user?.language || "vi";
  const eventCalendarPatchMessage = translateEvenCalendarPatch(LanguageToUse)
  try {
    const body = await req.json();
    const { title, start, allDay, attendancestart, attendanceend } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarPatchMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role === UserRole.GUEST || user.role === UserRole.USER) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarPatchMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!start) {
      return new NextResponse(JSON.stringify({ error: eventCalendarPatchMessage.startRequired }), {
        status: 403,
      });
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarPatchMessage.storeIdRequired }),
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
        JSON.stringify({ error: eventCalendarPatchMessage.storeIdNotFound }),
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
        userId: user?.id || "",
      },
    });

    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: eventCalendarPatchMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const eventCalendarDeleteMessage = translateEvenCalendarDelete(LanguageToUse)

  try {
    // Extract event ID from the request body
    const { eventId } = await req.json();

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarDeleteMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role === UserRole.GUEST || user.role === UserRole.USER) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!eventId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarDeleteMessage.eventIdRequired }),
        { status: 403 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarDeleteMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    // Check if the user has access to the specified store
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: eventCalendarDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Delete the event with the specified ID
    const deletedEvent = await prismadb.eventCalendar.delete({
      where: {
        id: eventId,
        userId: user?.id,
      },
    });

    return NextResponse.json(deletedEvent);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: eventCalendarDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

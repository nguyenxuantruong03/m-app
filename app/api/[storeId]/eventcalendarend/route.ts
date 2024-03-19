import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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
      return new NextResponse("Unauthorized", { status: 405 });
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
        return new NextResponse("Sự kiện chưa kết thúc", { status: 400 });
      }
    } else {
      return new NextResponse("Không có sự kiện nào diễn ra", { status: 400 });
    }
  } catch (error) {
    return new NextResponse("Lỗi nội bộ", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const {
      title,
      start,
      allDay,
      attendancestart,
      attendanceend,
    } = body;

    if (!start) {
      return new NextResponse("Invalid Error!", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const user = await prismadb.user.findUnique({
      where: { id: userId?.id },
    });

    // Chuyển đổi start và end sang múi giờ của Việt Nam
    const vnTimeZone = "Asia/Ho_Chi_Minh";
    const zonedStart = utcToZonedTime(new Date(start), vnTimeZone);
    const formattedStart = format(zonedStart, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start: formattedStart,
        end:null,
        allDay,
        storeId: params.storeId,
        attendancestart,
        attendanceend,
        userId: userId?.id || "",
      },
    });

    return NextResponse.json(eventCalendar);
  } catch (error) {
    console.log("[EVENTCALENDAR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

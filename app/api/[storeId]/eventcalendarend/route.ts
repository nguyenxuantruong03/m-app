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

    const currentTime = new Date();
    if (latestEvent) {
      // Nếu có sự kiện mới nhất
      const latestEventEnd = new Date(latestEvent.end!);
      if (currentTime >= latestEventEnd) {
        return NextResponse.json(latestEvent);
      } else {
        return new NextResponse("Event has not ended yet", { status: 400 });
      }
    } else {
      return new NextResponse("Event has not ended yet", { status: 400 });
    }
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
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
      currentselectedDate,
      attendancestart,
      attendanceend,
      end,
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

    const zonedEnd = utcToZonedTime(new Date(end), vnTimeZone);
    const formattedEnd = format(zonedEnd, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start: formattedStart,
        end: formattedEnd,
        allDay,
        storeId: params.storeId,
        currentselectedDate,
        attendancestart,
        attendanceend,
        userId: user?.id || "",
      },
    });

    return NextResponse.json(eventCalendar);
  } catch (error) {
    console.log("[EVENTCALENDAR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

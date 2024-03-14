import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
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

    // Use findFirst to get the latest event based on storeId
    const latestEvent = await prismadb.eventCalendar.findFirst({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        end: 'desc' // Sắp xếp theo thời gian giảm dần (tức là end mới nhất sẽ ở đầu)
      }
    });

    const currentTime = new Date();
    if (latestEvent) {
      // Nếu có sự kiện mới nhất
      if (latestEvent.end !== null && currentTime >= new Date(latestEvent.end)) {
        console.log("Current time is greater than or equal to latest event's end");
        return NextResponse.json(latestEvent);
      } else {
        console.log("Current time is less than latest event's end or latest event's end is null");
        return new NextResponse("Event has not ended yet", { status: 400 });
      }
    } else {
      // Nếu không có sự kiện nào
      console.log("No events found for the store");
      return new NextResponse("No events found for the store", { status: 404 });
    }
  } catch (error) {
    console.log("[EVENTCALENDAR_PATCH]", error);
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

    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start,
        end,
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

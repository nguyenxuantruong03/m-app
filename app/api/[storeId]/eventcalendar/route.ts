import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole, WorkingTime } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const eventCalendar = await prismadb.eventCalendar.findMany();
    return NextResponse.json(eventCalendar);
  } catch (error) {
    console.error("[EVENTCALENDAR_GET] Error:", error);
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

    // Calculate end based on working time
    let endTime;
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
        return new NextResponse("Invalid working time", { status: 400 });
    }

    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start,
        end: endTime,
        allDay,
        storeId: params.storeId,
        currentselectedDate,
        attendancestart,
        attendanceend,
        userId: user.id,
      },
    });

    return NextResponse.json(eventCalendar);
  } catch (error) {
    console.log("[EVENTCALENDAR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
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

    if (!eventId || !params.storeId) {
      return new NextResponse("Invalid Error!", { status: 403 });
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
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // Delete the event with the specified ID
    const deletedEvent = await prismadb.eventCalendar.delete({
      where: {
        id: eventId,
      },
    });

    return NextResponse.json(deletedEvent);
  } catch (error) {
    console.log("[EVENTCALENDAR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

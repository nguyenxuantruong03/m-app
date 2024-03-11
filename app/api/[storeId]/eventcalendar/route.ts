import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
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

    const { title, start, allDay } = body;

    if (!title || !start || !allDay) {
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
          }
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    const eventCalendar = await prismadb.eventCalendar.create({
      data: {
        title,
        start,
        allDay,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(eventCalendar);
  } catch (error) {
    console.log("[EVENTCALENDAR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

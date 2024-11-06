import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET() {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN && userId.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền xem system!" }),
        { status: 403 }
      );
    }

    const system = await prismadb.size.findMany();

    return NextResponse.json(system);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get system." }),
      { status: 500 }
    );
  }
}

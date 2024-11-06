import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser()
  const body = await req.json();
  const { userId } = body;

  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: "Không tìm thấy user id!" }),
      { status: 403 }
    );
  }

  if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
    return new NextResponse(
      JSON.stringify({ error: "Bạn không có quyền cập nhật settinguser!" }),
      { status: 403 }
    );
  }

  try {
    const banuser = await prismadb.user.update({
      where: { id: userId },
      data: {
        isCitizen: true,
      },
    });
    return NextResponse.json(banuser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Lỗi cục bộ khi xác thực!" }),
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { userId } = body;
  const user = await currentUser()

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Không tìm thấy user id!" }), {
      status: 400,
    });
  }

  if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
    return new NextResponse(
      JSON.stringify({ error: "Bạn không có quyền cập nhật settinguser!" }),
      { status: 403 }
    );
  }

  try {
    const banuser = await prismadb.user.update({
      where: { id: userId },
      data: {
        isCitizen: false,
      },
    });
    return NextResponse.json(banuser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Lỗi cục bộ khi bỏ xác thực!" }),
      {
        status: 500,
      }
    );
  }
}

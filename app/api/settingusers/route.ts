import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const settinguser = await prismadb.user.findMany();

    return NextResponse.json(settinguser);
  } catch (error) {
    console.log("[SETTINGUSER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { userId, newRole } = body;
  try {
    const adminCount = await prismadb.user.count({
      where: { role: "ADMIN" },
    });

    // Check if there are at least 1 admin before updating the role
    if (adminCount <= 1 && newRole !== "ADMIN") {
      return new NextResponse(
        "Cannot update role. At least 1 Admin is required.",
        { status: 400 }
      );
    }

    // Update the user's role in the database using Prisma
    const roleupdate = await prismadb.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return NextResponse.json(roleupdate);
  } catch (error) {
    console.error("Error updating user role:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  try {
    // Delete the user from the database using Prisma
    const userDeletion = await prismadb.user.delete({
      where: { id: id },
    });

    return NextResponse.json(userDeletion);
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { userId } = body;
  try {
    const user = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Kiểm tra nếu người dùng có quyền là ADMIN không thể bị ban
    if (user?.role === "ADMIN") {
      return new NextResponse("Cannot ban an ADMIN user.", { status: 400 });
    }

    const banuser = await prismadb.user.update({
      where: { id: userId },
      data: {
        ban: true,
        banExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
    return NextResponse.json(banuser);
  } catch (error) {
    console.error("Error banning user:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

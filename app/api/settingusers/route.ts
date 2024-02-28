import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const product = await prismadb.user.findMany();

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
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

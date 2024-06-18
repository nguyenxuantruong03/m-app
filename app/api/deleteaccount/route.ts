import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }

    const user = await prismadb.user.delete({
      where: {
        id: userId?.id,
      },
    });

    const sentUser = {
      email: user.email,
      name: user.name,
      nameuser: user.nameuser,
      dateofbirth: user.dateofbirth,
      address: user.address,
      phonenumber: user.phonenumber,
    };

    const changes = [
      `email: ${sentUser.email}, name: ${sentUser.name}, nameuser: ${sentUser.nameuser}, dateofbirth: ${sentUser.dateofbirth}, address: ${sentUser.address}, phonenumber: ${sentUser.phonenumber}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        delete: changes,
        type: "DELETE-USER",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    return new NextResponse(
      JSON.stringify({ error: "Lỗi nội bộ khi xóa người dùng." }),
      { status: 500 }
    );
  }
}

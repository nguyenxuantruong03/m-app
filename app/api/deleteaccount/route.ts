import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { translateUserDeleteAccount } from "@/translate/translate-api";
import { NextResponse } from "next/server";

export async function DELETE() {
  const userId = await currentUser();
//language
const LanguageToUse = userId?.language || "vi";
const userDeleteAccountMessage = translateUserDeleteAccount(LanguageToUse)

  try {

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: userDeleteAccountMessage.userIdNotFound }),
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
    return new NextResponse(
      JSON.stringify({ error: userDeleteAccountMessage.internalError }),
      { status: 500 }
    );
  }
}

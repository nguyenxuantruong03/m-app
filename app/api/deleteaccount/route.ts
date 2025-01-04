import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function DELETE() {
  const userId = await currentUser();
  //language
  const languageToUse = userId?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
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
      JSON.stringify({ error: t("toastError.internalErrorDeleteUser") }),
      { status: 500 }
    );
  }
}

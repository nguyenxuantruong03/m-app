import { currentUser } from "@/lib/auth";
import {
  sendBanUser,
  sendDeleteUser,
  sendVerifyAccountisCitizenMaketing,
  sendVerifyAccountisCitizenShipper,
} from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { format, subHours } from "date-fns";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

type SettingUserValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | null
  | undefined;

interface ChangeRecord {
  oldValue: SettingUserValue;
  newValue: SettingUserValue;
}

export async function GET(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    const isAdmin = user.role === UserRole.ADMIN;
    const userCondition = isAdmin ? {} : UserRole.USER;

    const settinguser = await prismadb.user.findMany({
      where: {
        role: userCondition,
      },
      include: {
        imageCredential: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(settinguser);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: t("toastError.user.internalErrorGetUser") }), {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const body = await req.json();
  const { userId, newRole } = body;
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    const existingUser = await prismadb.user.findUnique({
      where: { id: userId },
    });

    const adminCount = await prismadb.user.count({
      where: { role: "ADMIN" },
    });

    // Kiểm tra nếu chỉ có một quản trị viên và đang cố gắng cập nhật vai trò của họ
    if (
      adminCount <= 1 &&
      newRole !== "ADMIN" &&
      existingUser?.role === "ADMIN"
    ) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.user.adminRequired")
        }),
        { status: 400 }
      );
    }

    if (existingUser?.isbanforever) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.user.userBanned")
        }),
        { status: 400 }
      );
    }

    // Update the user's role in the database using Prisma
    const roleupdate = await prismadb.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    if (roleupdate.role === UserRole.SHIPPER) {
      await sendVerifyAccountisCitizenShipper(roleupdate.language ,roleupdate.email);
    }

    if (roleupdate.role === UserRole.MARKETING) {
      await sendVerifyAccountisCitizenMaketing(roleupdate.language, roleupdate.email);
    }

    // Danh sách các trường cần loại bỏ
    const ignoredFields = [
      "createdAt",
      "updatedAt",
      "emailVerified",
      "imageCredential",
      "lastlogin",
      "daywork",
    ];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingUser) {
      if (existingUser.hasOwnProperty(key) && roleupdate.hasOwnProperty(key)) {
        if (
          existingUser[key as keyof typeof existingUser] !==
          roleupdate[key as keyof typeof roleupdate]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingUser[key as keyof typeof existingUser],
              newValue: roleupdate[key as keyof typeof roleupdate],
            };
          }
        }
      }
    }

    //Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
    const oldChanges = Object.keys(changes).map((key) => {
      return `${key}: { Old: '${changes[key].oldValue}'}`;
    });
    const newChanges = Object.keys(changes).map((key) => {
      return `${key}: { New: '${changes[key].newValue}'}`;
    });

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        oldChange: oldChanges,
        newChange: newChanges,
        type: "UPDATEROLEUSER",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(roleupdate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.user.internalErrorPatchUser") }),
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  const body = await req.json();
  const { id } = body;

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    const existingUser = await prismadb.user.findUnique({
      where: { id: id },
    });

    const adminCount = await prismadb.user.count({
      where: { role: "ADMIN" },
    });

    if (existingUser?.isbanforever) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.user.userBanned")
        }),
        { status: 400 }
      );
    }

    // Kiểm tra nếu chỉ có một quản trị viên và đang cố gắng cập nhật vai trò của họ
    if (adminCount <= 1 && existingUser?.role === "ADMIN") {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.user.adminRequired")
        }),
        { status: 400 }
      );
    }

    if (user?.id === id) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.user.selfBanError")
        }),
        { status: 400 }
      );
    }

    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 7);

    const banforeverUser = await prismadb.user.update({
      where: {
        id: existingUser?.id || "",
      },
      data: {
        isbanforever: true,
        timebanforever: dateNow,
      },
    });

    const sentUser = {
      name: existingUser?.name,
      email: existingUser?.email,
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentUser.name}, Email: ${sentUser.email}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "BANFOREVER-USER",
        delete: changes,
        user: user?.email || "",
      },
    });

    const createdAt = banforeverUser.createdAt
      ? format(banforeverUser.createdAt, "dd/MM/yyyy '-' HH:mm:ss a")
      : "";

    await sendDeleteUser(existingUser?.language, existingUser?.email, existingUser?.name, createdAt);

    return NextResponse.json(banforeverUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.user.internalErrorDeleteUser") }),
      { status: 400 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  const body = await req.json();
  const userCheck = await currentUser();
  const { userId, descriptionBan, time } = body;
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    const existingUser = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if (userCheck?.id === existingUser?.id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.user.selfBanError") }),
        {
          status: 404,
        }
      );
    }

    if (existingUser?.ban) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.user.userBanned")
        }),
        { status: 400 }
      );
    }

    if (user?.id === userId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.user.selfBanProhibited")
        }),
        { status: 400 }
      );
    }

    if (!existingUser?.id) {
      return new NextResponse(JSON.stringify({ error: t("toastError.userNotFound") }), {
        status: 404,
      });
    }

    if (existingUser?.isbanforever) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.user.userPermanentlyBanned")
        }),
        { status: 400 }
      );
    }

    const banuser = await prismadb.user.update({
      where: { id: userId },
      data: {
        ban: true,
        banExpires: new Date(time),
      },
    });

    const sentUser = {
      name: banuser?.name,
      email: banuser?.email,
      descriptionBan: descriptionBan,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentUser.name}, Email: ${sentUser.email}, Description Ban:${sentUser.descriptionBan}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    const response = await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "UPDATEBANUSER",
        newChange: changes,
        user: userCheck?.email || "",
      },
    });

    const dateonow = response.createdAt
      ? format(response.createdAt, "dd/MM/yyyy '-' HH:mm:ss a")
      : "";

    const timeBan = banuser.banExpires
      ? format(
          subHours(new Date(banuser.banExpires), 7),
          "dd/MM/yyyy '-' HH:mm:ss a"
        )
      : "";

    await sendBanUser(
      banuser.language,
      banuser.email,
      banuser.name,
      dateonow,
      timeBan,
      descriptionBan
    );

    return NextResponse.json(banuser);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: t("toastError.user.internalErrorBanUser") }), {
      status: 500,
    });
  }
}

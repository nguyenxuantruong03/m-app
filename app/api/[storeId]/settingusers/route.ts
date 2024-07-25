import { currentRole, currentUser } from "@/lib/auth";
import {
  sendBanUser,
  sendDeleteUser,
  sendVerifyAccountisCitizenMaketing,
  sendVerifyAccountisCitizenShipper,
} from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { format, subHours } from "date-fns";
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
  try {
    const settinguser = await prismadb.user.findMany();

    return NextResponse.json(settinguser);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Lỗi cục bộ khi get!" }), {
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
  try {
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
          error: "Yêu cầu cần có 1 ADMIN!",
        }),
        { status: 400 }
      );
    }

    if (existingUser?.isbanforever) {
      return new NextResponse(
        JSON.stringify({
          error: "Người dùng nay đã bị ban vĩnh viễn!",
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
      await sendVerifyAccountisCitizenShipper(roleupdate.email);
    }

    if (roleupdate.role === UserRole.MARKETING) {
      await sendVerifyAccountisCitizenMaketing(roleupdate.email);
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
      JSON.stringify({ error: "Lỗi cục bộ khi thay đổi user!" }),
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const userId = await currentUser();
  const role = await currentRole()
  const body = await req.json();
  const { id } = body;

  try {
    const existingUser = await prismadb.user.findUnique({
      where: { id: id },
    });
    const adminCount = await prismadb.user.count({
      where: { role: "ADMIN" },
    });

    if (existingUser?.isbanforever) {
      return new NextResponse(
        JSON.stringify({
          error: "Người dùng nay đã bị ban vĩnh viễn!",
        }),
        { status: 400 }
      );
    }

    // Kiểm tra nếu chỉ có một quản trị viên và đang cố gắng cập nhật vai trò của họ
    if (adminCount <= 1 && existingUser?.role === "ADMIN") {
      return new NextResponse(
        JSON.stringify({
          error: "Yêu cầu cần có 1 ADMIN!",
        }),
        { status: 400 }
      );
    }

    if(userId?.id === id) {
      return new NextResponse(
        JSON.stringify({
          error: "Bạn không thể tự ban bản thân!",
        }),
        { status: 400 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền để ban." }),
        {
          status: 404,
        }
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
        user: userId?.email || "",
      },
    });

    const createdAt = banforeverUser.createdAt
      ? format(banforeverUser.createdAt, "dd/MM/yyyy '-' HH:mm:ss a")
      : "";

    await sendDeleteUser(existingUser?.email, existingUser?.name, createdAt);

    return NextResponse.json(banforeverUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Lỗi cục bộ khi delete user!" }),
      { status: 400 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const body = await req.json();
  const user = await currentUser();
  const userCheck = await currentUser();
  const role = await currentRole();
  const { userId, descriptionBan, time } = body;
  try {
    const existingUser = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if (userCheck?.id === existingUser?.id) {
      return new NextResponse(
        JSON.stringify({ error: "Không thể tự ban chỉnh mình!" }),
        {
          status: 404,
        }
      );
    }

    if (existingUser?.ban) {
      return new NextResponse(
        JSON.stringify({
          error: "Người dùng này đã bị ban!",
        }),
        { status: 400 }
      );
    }

    if(user?.id === userId) {
      return new NextResponse(
        JSON.stringify({
          error: "Bạn không thể tự ban bản thân!",
        }),
        { status: 400 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền để ban." }),
        {
          status: 404,
        }
      );
    }

    if (!existingUser?.id) {
      return new NextResponse(JSON.stringify({ error: "User not found!" }), {
        status: 404,
      });
    }

    if (existingUser?.isbanforever) {
      return new NextResponse(
        JSON.stringify({
          error: "Người dùng nay đã bị ban vĩnh viễn!",
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
      banuser.email,
      banuser.name,
      dateonow,
      timeBan,
      descriptionBan
    );

    return NextResponse.json(banuser);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Lỗi cục bộ khi ban!" }), {
      status: 500,
    });
  }
}

import { currentUser } from "@/lib/auth";
import {
  sendBanUser,
  sendDeleteUser,
  sendVerifyAccountisCitizenMaketing,
  sendVerifyAccountisCitizenShipper,
} from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { format } from "date-fns";
import { NextResponse } from "next/server";

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
          error: "Cannot update role. At least 1 Admin is required.",
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
    const changes: { [key: string]: { oldValue: any; newValue: any } } = {};
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
  const body = await req.json();
  const { id } = body;

  try {
    const existingUser = await prismadb.user.findUnique({
      where: { id: id },
    });
    const adminCount = await prismadb.user.count({
      where: { role: "ADMIN" },
    });

    // Kiểm tra nếu chỉ có một quản trị viên và đang cố gắng cập nhật vai trò của họ
    if (adminCount <= 1 && existingUser?.role === "ADMIN") {
      return new NextResponse(
        JSON.stringify({
          error: "Yêu cầu cần có 1 ADMIN.",
        }),
        { status: 400 }
      );
    }

    // Delete the user from the database using Prisma
    const userDeletion = await prismadb.user.delete({
      where: { id: id },
    });

    const sentUser = {
      name: existingUser?.name,
      email: existingUser?.email,
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentUser.name}, Email: ${sentUser.email}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    const response = await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETEUSER",
        delete: changes,
        user: userId?.email || "",
      },
    });

    const dateonow = response.createdAt
      ? format(response.createdAt, "dd/MM/yyyy '-' HH:mm a")
      : "";

    await sendDeleteUser(userDeletion.email, userDeletion.name, dateonow);

    return NextResponse.json(userDeletion);
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
  const { userId } = body;
  try {
    const user = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found!" }), {
        status: 404,
      });
    }

    if (user?.ban) {
      return new NextResponse(
        JSON.stringify({ error: "Người dùng này đã bị bạn!" }),
        {
          status: 404,
        }
      );
    }

    // Kiểm tra nếu người dùng có quyền là ADMIN không thể bị ban
    if (user?.role === "ADMIN") {
      return new NextResponse(
        JSON.stringify({ error: "Cannot ban an ADMIN user!" }),
        { status: 400 }
      );
    }

    const timeBanUser = new Date();
    timeBanUser.setDate(timeBanUser.getDate() + 30); // Thêm 30 ngày

    const banuser = await prismadb.user.update({
      where: { id: userId },
      data: {
        ban: true,
        banExpires: timeBanUser,
      },
    });

    const sentUser = {
      name: banuser?.name,
      email: banuser?.email,
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentUser.name}, Email: ${sentUser.email}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    const response = await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "UPDATEBANUSER",
        newChange: changes,
        user: userId?.email || "",
      },
    });

    const dateonow = response.createdAt
      ? format(response.createdAt, "dd/MM/yyyy '-' HH:mm a")
      : "";

    const timeBan = banuser.banExpires
      ? format(banuser.banExpires, "dd/MM/yyyy '-' HH:mm a")
      : "";

    await sendBanUser(banuser.email, banuser.name, dateonow, timeBan);

    return NextResponse.json(banuser);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Lỗi cục bộ khi ban!" }), {
      status: 500,
    });
  }
}

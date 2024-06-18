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

    //Set-up1: const settinguser = await prismadb.user.findMany();
    const system = await prismadb.system.findMany();
    const banforeverValues = system
      .filter((item) => item.banforever) // Lọc các mục có thuộc tính `banforever`
      .map((item) => item.banforever) // Lấy giá trị của thuộc tính `banforever`
      .reduce((acc, currentValue) => {
        // Nếu currentValue không phải mảng rỗng, thêm vào mảng kết quả
        if (currentValue.length > 0) {
          acc.push(...currentValue);
        }
        return acc;
      }, []);

    //Set-up2: Gộp các giá trị lặp lại bằng cách chuyển sang Set và sau đó trở lại dạng mảng
    const uniqueBanforeverValues = Array.from(new Set(banforeverValues));
    //Lấy banforever so sanh với userId lấy ra email tương ứng
    const user = await prismadb.user.findMany();
    // Tạo một mảng chứa các ID người dùng mà bạn muốn lấy
    const matchedUsers = user.filter((userData) =>
      uniqueBanforeverValues.includes(userData.id)
    );
    const findEmail = matchedUsers.map((item) => item.email);

    if (
      existingUser &&
      findEmail.some((email) => email === existingUser.email)
    ) {
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

    //Set-up1: const settinguser = await prismadb.user.findMany();
    const system = await prismadb.system.findMany();
    const banforeverValues = system
      .filter((item) => item.banforever) // Lọc các mục có thuộc tính `banforever`
      .map((item) => item.banforever) // Lấy giá trị của thuộc tính `banforever`
      .reduce((acc, currentValue) => {
        // Nếu currentValue không phải mảng rỗng, thêm vào mảng kết quả
        if (currentValue.length > 0) {
          acc.push(...currentValue);
        }
        return acc;
      }, []);

    //Set-up2: Gộp các giá trị lặp lại bằng cách chuyển sang Set và sau đó trở lại dạng mảng
    const uniqueBanforeverValues = Array.from(new Set(banforeverValues));
    //Lấy banforever so sanh với userId lấy ra email tương ứng
    const user = await prismadb.user.findMany();
    // Tạo một mảng chứa các ID người dùng mà bạn muốn lấy
    const matchedUsers = user.filter((userData) =>
      uniqueBanforeverValues.includes(userData.id)
    );
    const findEmail = matchedUsers.map((item) => item.email);

    if (
      existingUser &&
      findEmail.some((email) => email === existingUser.email)
    ) {
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
          error: "Yêu cầu cần có 1 ADMIN.",
        }),
        { status: 400 }
      );
    }

    const sentUser = {
      name: existingUser?.name,
      email: existingUser?.email,
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentUser.name}, Email: ${sentUser.email}`];

    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 7);

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    const response = await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "BANFOREVER-USER",
        delete: changes,
        user: userId?.email || "",
        banforever: [id],
        isbanforever: true,
        timebanforever: dateNow,
        createdAt: dateNow,
      },
    });

    const createdAt = response.createdAt
      ? format(response.createdAt, "dd/MM/yyyy '-' HH:mm:ss a")
      : "";

    await sendDeleteUser(existingUser?.email, existingUser?.name, createdAt);

    return NextResponse.json(response);
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
  const userCheck = await currentUser();
  const role = await currentRole()
  const { userId,descriptionBan,time } = body;
  try {
    const existingUser = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if(userCheck?.id === existingUser?.id){
      return new NextResponse(JSON.stringify({ error: "Không thể tự ban chỉnh mình!" }), {
        status: 404,
      });
    }

    if(role !== UserRole.ADMIN) {
      return new NextResponse(JSON.stringify({ error: "Bạn không có quyền để ban." }), {
        status: 404,
      });
    }

    if (!existingUser?.id) {
      return new NextResponse(JSON.stringify({ error: "User not found!" }), {
        status: 404,
      });
    }

    //Set-up1: const settinguser = await prismadb.user.findMany();
    const system = await prismadb.system.findMany();
    const banforeverValues = system
      .filter((item) => item.banforever) // Lọc các mục có thuộc tính `banforever`
      .map((item) => item.banforever) // Lấy giá trị của thuộc tính `banforever`
      .reduce((acc, currentValue) => {
        // Nếu currentValue không phải mảng rỗng, thêm vào mảng kết quả
        if (currentValue.length > 0) {
          acc.push(...currentValue);
        }
        return acc;
      }, []);

    //Set-up2: Gộp các giá trị lặp lại bằng cách chuyển sang Set và sau đó trở lại dạng mảng
    const uniqueBanforeverValues = Array.from(new Set(banforeverValues));
    //Lấy banforever so sanh với userId lấy ra email tương ứng
    const user = await prismadb.user.findMany();
    // Tạo một mảng chứa các ID người dùng mà bạn muốn lấy
    const matchedUsers = user.filter((userData) =>
      uniqueBanforeverValues.includes(userData.id)
    );
    const findEmail = matchedUsers.map((item) => item.email);

    if (existingUser && findEmail.some((email) => email === existingUser.email)) {
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
      descriptionBan:descriptionBan
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentUser.name}, Email: ${sentUser.email}, Description Ban:${sentUser.descriptionBan}`];

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
      ? format(subHours(new Date(banuser.banExpires), 7), "dd/MM/yyyy '-' HH:mm:ss a")
      : "";

    await sendBanUser(banuser.email, banuser.name, dateonow, timeBan,descriptionBan);

    return NextResponse.json(banuser);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Lỗi cục bộ khi ban!" }), {
      status: 500,
    });
  }
}

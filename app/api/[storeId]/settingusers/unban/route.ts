import { sendUnBanUser } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const body = await req.json();
  const { userId } = body;

  try {
    const existingUser = await prismadb.user.findUnique({
      where: { id: userId },
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

    if (!existingUser?.ban) {
      return new NextResponse(
        JSON.stringify({ error: "Người dùng này hiện tại không bị ban!" }),
        {
          status: 404,
        }
      );
    }

    const unbanUser = await prismadb.user.update({
      where: { id: userId },
      data: {
        ban: false,
        resendCount: 0,
        resendTokenVerify: 0,
        resendEmailResetPassword: 0,
        resendTokenResetPassword: 0,
        resendBanUserNotStart: 0,
        resendUnBanUser: 0,
        banExpires: null,
      },
    });

    await sendUnBanUser(unbanUser.email, unbanUser.name);

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: { [key: string]: { oldValue: any; newValue: any } } = {};
    for (const key in existingUser) {
      if (existingUser.hasOwnProperty(key) && unbanUser.hasOwnProperty(key)) {
        if (
          existingUser[key as keyof typeof existingUser] !==
          unbanUser[key as keyof typeof unbanUser]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingUser[key as keyof typeof existingUser],
              newValue: unbanUser[key as keyof typeof unbanUser],
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
        type: "UPDATEUNBANUSER",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(unbanUser);
  } catch (error) {
    console.error("Error unbanning user:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

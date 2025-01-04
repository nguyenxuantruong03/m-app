import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { User, UserRole } from "@prisma/client";
import { sendSpamEmail } from "@/lib/mail";
import { createTranslator } from "next-intl";

type SentEmailUserValue =
  | string
  | boolean
  | Date
  | User
  | string[]
  | undefined
  | null;

interface ChangeRecord {
  oldValue: SentEmailUserValue;
  newValue: SentEmailUserValue;
}

export async function GET(
  req: Request,
  { params }: { params: { sentmailuserId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
  try {
    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.sentemail.sentMailUserIdRequired")
        }),
        { status: 400 }
      );
    }

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

    const sentEmailUser = await prismadb.sentEmailUser.findUnique({
      where: {
        id: params.sentmailuserId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(sentEmailUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.sentemail.internalErrorGetSentEmail") }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sentmailuserId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const role = await currentRole();

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.permissionDenied"),
        }),
        { status: 403 }
      );
    }

    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.sentemail.sentMailUserIdRequired")
        }),
        { status: 400 }
      );
    }

    const sentEmailUser = await prismadb.sentEmailUser.delete({
      where: {
        id: params.sentmailuserId,
      },
    });

    const sentMailUserSystem = {
      description: sentEmailUser.description,
      subject: sentEmailUser.subject,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Description: ${sentMailUserSystem.description}, Subject: ${sentMailUserSystem.subject}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETESENTMAILUSER",
        delete: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(sentEmailUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.sentemail.internalErrorDeleteSentEmail") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sentmailuserId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { subject, description, sentemailuser } = body;

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

    if (!subject) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.sentemail.subjectRequired") }),
        { status: 400 }
      );
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.description")
        }),
        { status: 400 }
      );
    }

    if (!sentemailuser) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.sentemail.userRequired") }),
        { status: 400 }
      );
    }

    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.sentemail.sentMailUserIdRequired")
        }),
        { status: 400 }
      );
    }

    // Kiểm tra nếu có bản ghi khác với subject giống và id khác
    const duplicateSubject = await prismadb.sentEmailUser.findFirst({
      where: {
        subject: subject,
        id: {
          not: params.sentmailuserId, // Loại trừ id hiện tại
        },
      },
    });

    if (duplicateSubject) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.sentemail.subjectAlreadyExists")
        }),
        { status: 400 }
      );
    }

    const existingSentEmailUser = await prismadb.sentEmailUser.findUnique({
      where: {
        id: params.sentmailuserId,
      },
      include: {
        user: true,
      },
    });

    if (!existingSentEmailUser) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.sentemail.sentEmailUserNotFound")
        }),
        { status: 404 }
      );
    }

    const sentEmailUser = await prismadb.sentEmailUser.update({
      where: {
        id: params.sentmailuserId,
      },
      data: {
        subject,
        description,
        sentemailuser,
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingSentEmailUser) {
      if (
        existingSentEmailUser.hasOwnProperty(key) &&
        sentEmailUser.hasOwnProperty(key)
      ) {
        if (
          existingSentEmailUser[key as keyof typeof existingSentEmailUser] !==
          sentEmailUser[key as keyof typeof sentEmailUser]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue:
                existingSentEmailUser[
                  key as keyof typeof existingSentEmailUser
                ],
              newValue: sentEmailUser[key as keyof typeof sentEmailUser],
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
        type: "UPDATESENTMAILUSER",
        user: user?.email || "",
      },
    });

    return NextResponse.json(sentEmailUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.sentemail.internalErrorPatchSentEmail") }),
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { sentmailuserId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
  try {
    const body = await req.json();
    const { sentuser } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 404 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    const cleanedStrsentuser = sentuser
      .join(", ")
      .replace(/@\[(.*?)\]\(.*?\)/g, "$1");

    if (!sentuser || !cleanedStrsentuser) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 404 }
      );
    }

    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({
          error: t("toastError.sentemail.sentMailUserIdRequired")
        }),
        { status: 404 }
      );
    }

    const sentEmailUser = await prismadb.sentEmailUser.update({
      where: {
        id: params.sentmailuserId,
      },
      data: {
        isSent: true,
      },
    });

    // Check if the sentEmailUser update was successful before proceeding
    if (!sentEmailUser) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.sentemail.errorUpdating") }),
        { status: 405 }
      );
    }

    const sentEmailUsers = await prismadb.user.findMany();
    const favoriteAll = await prismadb.favorite.findMany();
    // Lấy danh sách email cụ thể từ cleanedStrsentuser (nếu có)
    const specificEmails = cleanedStrsentuser
      .split(", ")
      .map((email: string) => email.trim());

    // Tạo danh sách để tránh gửi trùng
    let sentEmails: string[] = [];

    // Nếu cleanedStrsentuser không phải "all", gửi email cá nhân trước
    if (cleanedStrsentuser !== "all") {
      for (const email of specificEmails) {
        // Tìm người dùng dựa trên email
        const user = sentEmailUsers.find((u) => u.email === email);

        if (user && user.email) {
          // Kiểm tra nếu email tồn tại
          // Nếu email đã được gửi, bỏ qua
          if (sentEmails.includes(user.email)) {
            continue;
          }

          // Gửi email với nội dung đã dịch (chỉ gửi một lần)
          await sendSpamEmail(
            [user.email],
            sentEmailUser.subject,
            sentEmailUser.description,
          );

          // Thêm email vào danh sách đã gửi
          sentEmails.push(user.email);
        }
      }
    }

    // Xử lý trường hợp "all" hoặc gửi theo favorite
    if (cleanedStrsentuser === "all") {
      // Lấy tất cả người dùng có role là "USER", trừ những người đã được gửi riêng lẻ
      const allUsers = sentEmailUsers.filter(
        (user) =>
          user.role === "USER" && user.email && !sentEmails.includes(user.email)
      );

      for (const user of allUsers) {
        // Kiểm tra nếu email tồn tại
        if (user.email) {
          // Nếu email đã được gửi, bỏ qua
          if (sentEmails.includes(user.email)) {
            continue;
          }

          // Gửi email riêng lẻ cho từng user với nội dung đã dịch
          await sendSpamEmail(
            [user.email],
            sentEmailUser.subject,
            sentEmailUser.description,
          );

          // Thêm email vào danh sách đã gửi
          sentEmails.push(user.email);
        }
      }
    } else {
      // Lọc các người dùng có email hợp lệ, role là "USER", có favorite phù hợp, chưa gửi email
      const usersWithMatchingFavorite = sentEmailUsers.filter(
        (user) =>
          user.role === "USER" &&
          user.email && // Kiểm tra user.email không phải là null hoặc undefined
          user.favorite.includes(cleanedStrsentuser) &&
          !sentEmails.includes(user.email) // Loại bỏ người đã được gửi riêng lẻ
      );

      for (const user of usersWithMatchingFavorite) {
        // Kiểm tra nếu email tồn tại
        if (user.email) {
          // Nếu email đã được gửi, bỏ qua
          if (sentEmails.includes(user.email)) {
            continue;
          }

          // Gửi email riêng lẻ cho từng user với nội dung đã dịch
          await sendSpamEmail(
            [user.email],
            sentEmailUser.subject,
            sentEmailUser.description
          );

          // Thêm email vào danh sách đã gửi
          sentEmails.push(user.email);
        }
      }
    }

    // Chuyển người dùng và favorite thành email và name
    const ChangeStringUser = sentEmailUser.sentemailuser
      .map((item) => item)
      .join(",");
    const matchingUser = sentEmailUsers.filter((user) =>
      ChangeStringUser.includes(user.id)
    );
    const checkMatchingUser = matchingUser.map((item) => item.email);
    const matchingFavorite = favoriteAll.filter((favorite) =>
      ChangeStringUser.includes(favorite.id)
    );
    const checkMatchingFavorite = matchingFavorite.map((item) => item.name);

    const sentMailUserSystem = {
      description: sentEmailUser.description,
      subject: sentEmailUser.subject,
      sentemailuser: ["all", "phobien"].includes(sentEmailUser.sentemailuser[0])
        ? sentEmailUser.sentemailuser
        : checkMatchingUser.length > 0
        ? checkMatchingUser.join(", ")
        : checkMatchingFavorite.join(", "),
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Description: ${sentMailUserSystem.description}, Subject: ${sentMailUserSystem.subject}, SentEmailUser: ${sentMailUserSystem.sentemailuser}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATESENTMAILUSER",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(sentEmailUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.sentemail.internalErrorPostSentEmail") }),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { User, UserRole } from "@prisma/client";
import { sendSpamEmail } from "@/lib/mail";
import {
  translateSentEmailIdGet,
  translateSentEmailIdDelete,
  translateSentEmailIdPatch,
  translateSentEmailIdPost,
} from "@/translate/translate-api";
import { translateText } from "@/translate/translate-client";

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
  const LanguageToUse = user?.language || "vi";
  const sentEmailUserIdGetMessage = translateSentEmailIdGet(LanguageToUse);
  try {
    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({
          error: sentEmailUserIdGetMessage.sentMailUserIdRequired,
        }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdGetMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdGetMessage.permissionDenied }),
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
      JSON.stringify({ error: sentEmailUserIdGetMessage.internalError }),
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
  const LanguageToUse = user?.language || "vi";
  const sentEmailUserIdDeleteMessage =
    translateSentEmailIdDelete(LanguageToUse);
  try {
    const role = await currentRole();

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdDeleteMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({
          error: sentEmailUserIdDeleteMessage.permissionDenied,
        }),
        { status: 403 }
      );
    }

    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({
          error: sentEmailUserIdDeleteMessage.sentMailUserIdRequired,
        }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({
          error: sentEmailUserIdDeleteMessage.rolePermissionDenied,
        }),
        { status: 403 }
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
      JSON.stringify({ error: sentEmailUserIdDeleteMessage.internalError }),
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
  const LanguageToUse = user?.language || "vi";
  const sentEmailUserIdPatchMessage = translateSentEmailIdPatch(LanguageToUse);
  try {
    const body = await req.json();
    const { subject, description, sentemailuser } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdPatchMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdPatchMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!subject) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdPatchMessage.subjectRequired }),
        { status: 400 }
      );
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({
          error: sentEmailUserIdPatchMessage.descriptionRequired,
        }),
        { status: 400 }
      );
    }

    if (!sentemailuser) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdPatchMessage.userRequired }),
        { status: 400 }
      );
    }

    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({
          error: sentEmailUserIdPatchMessage.sentMailUserIdRequired,
        }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdPatchMessage.storeIdNotFound }),
        { status: 405 }
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
          error: sentEmailUserIdPatchMessage.subjectAlreadyExists,
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
          error: sentEmailUserIdPatchMessage.sentEmailUserNotFound,
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
      JSON.stringify({ error: sentEmailUserIdPatchMessage.internalError }),
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
  const LanguageToUse = user?.language || "vi";
  const sentEmailUserIdPostMessage = translateSentEmailIdPost(LanguageToUse);
  try {
    const body = await req.json();
    const { sentuser } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdPostMessage.userIdNotFound }),
        { status: 404 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdPostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    const cleanedStrsentuser = sentuser
      .join(", ")
      .replace(/@\[(.*?)\]\(.*?\)/g, "$1");

    if (!sentuser || !cleanedStrsentuser) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdPostMessage.userNotFound }),
        { status: 404 }
      );
    }

    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({
          error: sentEmailUserIdPostMessage.sentMailUserIdRequired,
        }),
        { status: 404 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailUserIdPostMessage.storeIdNotFound }),
        {
          status: 405,
        }
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
        JSON.stringify({ error: sentEmailUserIdPostMessage.errorUpdating }),
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

          const userLanguage = user.language ?? "en"; // Ngôn ngữ mặc định là "en" nếu là null hoặc undefined

          // Dịch tiêu đề và nội dung email theo ngôn ngữ của người dùng
          const translatedSubject = await translateText(
            sentEmailUser.subject,
            userLanguage
          );
          const translatedDescription = await translateText(
            sentEmailUser.description,
            userLanguage
          );

          // Gửi email với nội dung đã dịch (chỉ gửi một lần)
          await sendSpamEmail(
            [user.email],
            translatedSubject,
            translatedDescription
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

          const userLanguage = user.language ?? "en"; // Ngôn ngữ mặc định là "en" nếu là null hoặc undefined
          const translatedSubject = await translateText(
            sentEmailUser.subject,
            userLanguage
          );
          const translatedDescription = await translateText(
            sentEmailUser.description,
            userLanguage
          );

          // Gửi email riêng lẻ cho từng user với nội dung đã dịch
          await sendSpamEmail(
            [user.email],
            translatedSubject,
            translatedDescription
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

          const userLanguage = user.language ?? "en"; // Ngôn ngữ mặc định là "en" nếu là null hoặc undefined
          const translatedSubject = await translateText(
            sentEmailUser.subject,
            userLanguage
          );
          const translatedDescription = await translateText(
            sentEmailUser.description,
            userLanguage
          );

          // Gửi email riêng lẻ cho từng user với nội dung đã dịch
          await sendSpamEmail(
            [user.email],
            translatedSubject,
            translatedDescription
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
      JSON.stringify({ error: sentEmailUserIdPostMessage.internalError }),
      { status: 500 }
    );
  }
}

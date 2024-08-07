import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { User, UserRole } from "@prisma/client";
import { sendSpamEmail } from "@/lib/mail";

type SentEmailUserValue = string | boolean | Date | User | string[] | undefined | null;

interface ChangeRecord {
  oldValue: SentEmailUserValue;
  newValue: SentEmailUserValue;
}

export async function GET(
  req: Request,
  { params }: { params: { sentmailuserId: string } }
) {
  try {
    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({ error: "Sentmailuser id is required!" }),
        { status: 400 }
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
      JSON.stringify({ error: "Internal error get sentmailUser." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sentmailuserId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({ error: "Sentmailuser id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
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
        user: userId?.email || "",
      },
    });

    return NextResponse.json(sentEmailUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete sentmailUser." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sentmailuserId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { subject, description, sentemailuser } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!subject) {
      return new NextResponse(
        JSON.stringify({ error: "Subject is required!" }),
        { status: 400 }
      );
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: "Description is required!" }),
        { status: 400 }
      );
    }

    if (!sentemailuser) {
      return new NextResponse(
        JSON.stringify({ error: "Yêu cầu chọn người dùng!" }),
        { status: 400 }
      );
    }

    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({ error: "Sentmailuser id is required!" }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
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
        user: userId?.email || "",
      },
    });

    return NextResponse.json(sentEmailUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch sentmailUser." }),
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { sentmailuserId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { sentuser } = body;
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy id người dùng!" }),
        { status: 404 }
      );
    }
    const cleanedStrsentuser = sentuser.join(", ").replace(/@\[(.*?)\]\(.*?\)/g, '$1');

    if (!sentuser || !cleanedStrsentuser) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy người dùng để gửi!" }),
        { status: 404 }
      );
    }

    if (!params.sentmailuserId) {
      return new NextResponse(
        JSON.stringify({ error: "Sentmailuser Id  is required!" }),
        { status: 404 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: {
          equals: UserRole.USER,
        },
      },
    });

    if (!storeByUserId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 405,
      });
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
        JSON.stringify({ error: "Error updating sentEmailUser" }),
        { status: 405 }
      );
    }

    const sentEmailUsers = await prismadb.user.findMany();
    const favoriteAll = await prismadb.favorite.findMany();

    // Lọc những người dùng có favorite chứa cleanedStr
    const usersWithMatchingFavorite = sentEmailUsers.filter((user) =>
      user.favorite.includes(cleanedStrsentuser)
    );
    // Lấy ra danh sách email của những người dùng thỏa mãn điều kiện
    const emailsToSend = usersWithMatchingFavorite.map((user) => user.email);

    if (emailsToSend.length > 0) {
      await sendSpamEmail(
        emailsToSend,
        sentEmailUser.subject,
        sentEmailUser.description
      );
    }

    const allEmails = sentEmailUsers.map((user) => user.email);
    // Wait for sendSpamEmail to complete before returning
    if (cleanedStrsentuser === "all") {
      // Send email to all users
      await sendSpamEmail(
        allEmails,
        sentEmailUser.subject,
        sentEmailUser.description
      );
    } else {
      // Send email to specific user
      const emailArray = cleanedStrsentuser
        .split(", ")
        .map((email: string) => email.trim());
      await sendSpamEmail(
        emailArray,
        sentEmailUser.subject,
        sentEmailUser.description
      );
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
        user: userId?.email || "",
      },
    });

    return NextResponse.json(sentEmailUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch sentmailUser." }),
      { status: 500 }
    );
  }
}

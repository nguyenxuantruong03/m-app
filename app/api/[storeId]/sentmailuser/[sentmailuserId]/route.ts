import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { sendSpamEmail } from "@/lib/mail";

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

    const { subject, description } = body;

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
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: { [key: string]: { oldValue: any; newValue: any } } = {};
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

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sentmailuserId) {
      return new NextResponse("Sentmailuser Id  is required", { status: 400 });
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
      return new NextResponse("Unauthorized", { status: 405 });
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
        isSent: true,
      },
    });

    // Check if the sentEmailUser update was successful before proceeding
    if (!sentEmailUser) {
      return new NextResponse("Error updating sentEmailUser", { status: 500 });
    }

    const sentEmailUsers = await prismadb.user.findMany();

    const allEmails = sentEmailUsers.map((user) => user.email);
    // Wait for sendSpamEmail to complete before returning
    await sendSpamEmail(
      allEmails,
      sentEmailUser.subject,
      sentEmailUser.description
    );

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: { [key: string]: { oldValue: any; newValue: any } } = {};
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
        type: "UPDATESENTSPAMMAIL",
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

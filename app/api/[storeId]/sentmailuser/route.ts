import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { translateSentEmailDelete, translateSentEmailGet, translateSentEmailPost } from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const sentEmailPostMessage = translateSentEmailPost(LanguageToUse)

  try {
    const body = await req.json();
    const { subject, description, sentemailuser } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailPostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailPostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!subject) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailPostMessage.subjectRequired }),
        { status: 400 }
      );
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailPostMessage.descriptionRequired }),
        { status: 400 }
      );
    }

    if (!sentemailuser) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailPostMessage.userRequired }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailPostMessage.storeIdRequired }),
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
        JSON.stringify({ error: sentEmailPostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    const sentEmailUser = await prismadb.sentEmailUser.create({
      data: {
        subject,
        description,
        sentemailuser,
        userId: user?.id || "",
        storeId: params.storeId,
      },
    });

    const sentEmailUsers = await prismadb.user.findMany();
    const favoriteAll = await prismadb.favorite.findMany();
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
      JSON.stringify({ error: sentEmailPostMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const sentEmailGetMessage = translateSentEmailGet(LanguageToUse)

  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailGetMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailGetMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailGetMessage.permissionDenied }),
        { status: 403 }
      );
    }

    const sentEmailUsers = await prismadb.sentEmailUser.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(sentEmailUsers);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: sentEmailGetMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const sentEmailDeleteMessage = translateSentEmailDelete(LanguageToUse)
  try {
    const body = await req.json();
    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailDeleteMessage.userNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: sentEmailDeleteMessage.idsArrayNotEmpty }),
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
        JSON.stringify({ error: sentEmailDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Fetch all cartegories to delete, including their images
    const SentMailToDelete = await prismadb.sentEmailUser.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = SentMailToDelete.map((item) => ({
      subject: item.subject,
      description: item.description,
      isSent: item.isSent,
    }));

    // Delete all the cartegories in one operation
    await prismadb.sentEmailUser.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Log the changes in a single database operation
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changesArray.map(
          (change) =>
            `DeleteSubject: ${change.subject}, Description: ${change.description}, IsSent: ${change.isSent}`
        ),
        type: "DELETEMANYSENTMAILUSER",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: sentEmailDeleteMessage.deleteSuccess });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: sentEmailDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

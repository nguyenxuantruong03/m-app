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

    const sentEmailUser = await prismadb.sentEmailUser.update({
      where: {
        id: params.sentmailuserId,
      },
      data: {
        subject,
        description
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

    const allEmails = sentEmailUsers.map(user => user.email);
    // Wait for sendSpamEmail to complete before returning
    await sendSpamEmail(allEmails, sentEmailUser.subject, sentEmailUser.description);

    return NextResponse.json(sentEmailUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch sentmailUser." }),
      { status: 500 }
    );
  }
}

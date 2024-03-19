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
      return new NextResponse("Sentmailuser Id is required", { status: 400 });
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
    console.log("[SENTEMAILUSER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
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
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sentmailuserId) {
      return new NextResponse("Sent Email User id is required", { status: 400 });
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

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Access denied. Only Admins can perform this action.", { status: 403 });
    }

    const sentEmailUser = await prismadb.sentEmailUser.delete({
      where: {
        id: params.sentmailuserId,
      },
    });
      return NextResponse.json(sentEmailUser);
  } catch (error) {
    console.log("[SENTEMAILUSER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
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
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!subject || !description) {
      return new NextResponse("Invalid Error", { status: 400 });
    }

    if (!params.sentmailuserId) {
      return new NextResponse("Sentmailuser Id is required", { status: 400 });
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
        subject,
        description
      },
    });

    return NextResponse.json(sentEmailUser);
  } catch (error) {
    console.log("[SENTEMAILUSER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
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
    console.log("[SENTEMAILUSER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

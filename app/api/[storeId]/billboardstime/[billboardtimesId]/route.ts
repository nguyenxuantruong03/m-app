import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { billboardtimesId: string } }
) {
  try {
    if (!params.billboardtimesId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const billboardTime = await prismadb.billboardTime.findUnique({
      where: {
        id: params.billboardtimesId,
      },
      include: {
        imagebillboardtime: true,
      },
    });

    return NextResponse.json(billboardTime);
  } catch (error) {
    console.log("[BILLBOARDTIME_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardtimesId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.billboardtimesId) {
      return new NextResponse("Billboard id is required", { status: 400 });
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
      return new NextResponse(
        "Access denied. Only Admins can perform this action.",
        { status: 403 }
      );
    }

    const billboardTime = await prismadb.billboardTime.delete({
      where: {
        id: params.billboardtimesId,
      },
    });
    return NextResponse.json(billboardTime);
  } catch (error) {
    console.log("[BILLBOARDTIME_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardtimesId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { label, imagebillboardtime, timeout } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (
      !imagebillboardtime ||
      !imagebillboardtime.length ||
      !label ||
      !timeout
    ) {
      return new NextResponse("Invalid Error", { status: 400 });
    }

    if (!params.billboardtimesId) {
      return new NextResponse("Billboard id is required", { status: 400 });
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

    await prismadb.billboardTime.update({
      where: {
        id: params.billboardtimesId,
      },
      data: {
        label,
        timeout,
        imagebillboardtime: {
          deleteMany: {},
        },
      },
    });
    const billboardTime = await prismadb.billboardTime.update({
      where: {
        id: params.billboardtimesId,
      },
      data: {
        imagebillboardtime: {
          createMany: {
            data: [...imagebillboardtime.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(billboardTime);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { billboardtimesId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const billboardTime = await prismadb.billboardTime.update({
      where: {
        id: params.billboardtimesId,
      },
      data: {
        timeout: 0,
        isTimeout: true
      },
    });

    return NextResponse.json(billboardTime);
  } catch (error) {
    console.log("[BILLBOARDTIME_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = currentUser();

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

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const billboard = await prismadb.billboardTime.create({
      data: {
        label,
        timeout,
        imagebillboardtime: {
          createMany: {
            data: [...imagebillboardtime.map((image: { url: string }) => image)],
          },
        },
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDSTIME_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await prismadb.billboardTime.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        imagebillboardtime: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDSTIME_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

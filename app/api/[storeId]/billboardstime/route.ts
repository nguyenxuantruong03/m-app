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
      return new NextResponse(
        JSON.stringify({ error: "Người dùng hiện tại không có id!" }),
        { status: 403 }
      );
    }

    if (!label) {
      return new NextResponse(
        JSON.stringify({ error: "Label is required!" }),
        { status: 400 }
      );
    }

    if (!timeout) {
      return new NextResponse(
        JSON.stringify({ error: "Label is required!" }),
        { status: 400 }
      );
    }

    if (
      !imagebillboardtime ||
      !imagebillboardtime.length 
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Imagebillboardtime is required!" }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
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
      if (!storeByUserId) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy store id!" }),
          { status: 405 }
        );
      }
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
    return new NextResponse(
      JSON.stringify({ error: "Internal error post billboardtime." }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required" }),
        { status: 400 }
      );
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
    return new NextResponse(
      JSON.stringify({ error: "Internal error get billboardtime." }),
      { status: 500 }
    );
  }
}

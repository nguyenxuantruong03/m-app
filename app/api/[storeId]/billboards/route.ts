import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { label, imagebillboard } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!label) {
      return new NextResponse(
        JSON.stringify({ error: "Label is required!" }),
        { status: 400 }
      );
    }

    if (!imagebillboard || !imagebillboard.length) {
      return new NextResponse(
        JSON.stringify({ error: "Images billboard is required!" }),
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
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imagebillboard: {
          createMany: {
            data: [...imagebillboard.map((image: { url: string }) => image)],
          },
        },
        storeId: params.storeId,
      },
    });

    const sentBillboard = {
      label: billboard?.label,
      imagebillboard:imagebillboard.map((image: { url: string }) => image.url),
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Label: ${sentBillboard.label}, ImageBillboard: ${sentBillboard.imagebillboard}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: changes,
        type: "CREATEBILLBOARD",
        user: userId?.email || ""
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post billboard." }),
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
        JSON.stringify({ error: "Store id is required!" }),
        { status: 400 }
      );
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        imagebillboard: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get billboard." }),
      { status: 500 }
    );
  }
}

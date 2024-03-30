import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required!" }),
        { status: 400 }
      );
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
      include: {
        imagebillboard: true,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get billboard." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }

    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required!" }),
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
        { status: 400 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
        { status: 403 }
      );
    }

    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete billboard." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
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

    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required!" }),
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

    await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imagebillboard: {
          deleteMany: {},
        },
      },
    });
    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        imagebillboard: {
          createMany: {
            data: [...imagebillboard.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch billboard." }),
      { status: 500 }
    );
  }
}

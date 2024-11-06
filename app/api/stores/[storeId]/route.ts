import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthenticated" }), {
        status: 403,
      });
    }

    if (userId.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền để sửa đổi cửa hàng!" }),
        { status: 405 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required" }), {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required" }),
        { status: 400 }
      );
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthenticated" }), {
        status: 403,
      });
    }

    if (userId.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền để xóa cửa hàng!" }),
        { status: 405 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required" }),
        { status: 400 }
      );
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

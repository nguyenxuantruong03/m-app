import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";


export async function GET(
  req: Request,
) {
  const userId = await currentUser();

  try {
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN && userId.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền xem imagebillboard!" }),
        { status: 403 }
      );
    }

    const billboards = await prismadb.imageBillboard.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get imagebillboard." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { ids } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN && userId.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền xóa imagebillboard!" }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Mảng IDs không được trống!" }),
        { status: 400 }
      );
    }

    // Fetch all billboards to delete from both tables
    const imageBillboardsToDelete = await prismadb.imageBillboard.findMany({
      where: {
        id: {
          in: ids,
        },
      }
    });

    // Create an array of changes for logging
    const changesArray = [
      ...imageBillboardsToDelete.map(billboard => ({
        label: billboard.label,
        description: billboard.description,
        valueImage: billboard.url,
      })),
    ];

    // Delete all the billboards in both tables
    await prismadb.imageBillboard.deleteMany({
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
        delete: changesArray.map(change => `DeleteLabel: ${change.label}, ImageBillboard: ${change.valueImage}, Description: ${change.description}`),
        type: "DELETEMANYIMAGEBILLBOARD",
        user: userId?.email || "",
      },
    });

    return NextResponse.json({ message: "Xóa thành công!" });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete imagebillboards." }),
      { status: 500 }
    );
  }
}

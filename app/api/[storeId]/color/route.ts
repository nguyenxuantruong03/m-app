import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { currentRole, currentUser } from '@/lib/auth';
import { UserRole } from '@prisma/client';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN && userId.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền tạo mới color!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: "Name is required!" }),
        { status: 400 }
      );
    }

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: "Color is required!" }),
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
      }
    });

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      }
    });

    const sentColor = {
      name: color?.name,
      value: color.value,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentColor.name}, Value: ${sentColor.value}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATE-COLOR",
        newChange: changes,
        user: userId?.email || "",
      },
    });
  
    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post color." }),
      { status: 500 }
    );
  }
};

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

    const color = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get color." }),
      { status: 500 }
    );
  }
};


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
        JSON.stringify({ error: "Bạn không có quyền xóa color!" }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Mảng IDs không được trống!" }),
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
        JSON.stringify({ error: "Không tìm thấy store id!" }),
        { status: 405 }
      );
    }

    // Fetch all color to delete, including their images
    const ColorToDelete = await prismadb.color.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = ColorToDelete.map(color => ({
      name: color.name,
      value: color.value,
    }));

    // Delete all the color in one operation
    await prismadb.color.deleteMany({
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
        delete: changesArray.map(change => `DeleteName: ${change.name}, Value: ${change.value}`),
        type: "DELETEMANYCOLOR",
        user: userId?.email || "",
      },
    });

    return NextResponse.json({ message: "Xóa thành công!" });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete color." }),
      { status: 500 }
    );
  }
}
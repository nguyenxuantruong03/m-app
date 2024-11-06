import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";

type ColorValue = string | Date | undefined;

interface ChangeRecord {
  oldValue: ColorValue;
  newValue: ColorValue;
}

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  const userId = await currentUser();

  try {
    if (!params.colorId) {
      return new NextResponse(
        JSON.stringify({ error: "Color id is required!" }),
        { status: 400 }
      );
    }

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN && userId.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền xem color!" }),
        { status: 403 }
      );
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get color." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (userId.role !== UserRole.ADMIN && userId.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: "Bạn không có quyền xóa color!" }),
        { status: 403 }
      );
    }

    if (!params.colorId) {
      return new NextResponse(
        JSON.stringify({ error: "Color id is required!" }),
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

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    const sentColor = {
      name: color?.name,
      value: color.value,
    };

    // Log sự thay đổi của sentVeirifi
    const changes = [
      `DeleteName: ${sentColor.name}, value: ${sentColor.value}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETECOLOR",
        delete: changes,
        user: userId?.email || "",
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete color." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
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
        JSON.stringify({ error: "Bạn không có quyền cập nhật color!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
    }

    if (!value) {
      return new NextResponse(JSON.stringify({ error: "Color is required!" }), {
        status: 400,
      });
    }

    if (!params.colorId) {
      return new NextResponse(
        JSON.stringify({ error: "Color id is required!" }),
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

    const existingColor = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingColor) {
      if (
        existingColor.hasOwnProperty(key) &&
        color.hasOwnProperty(key)
      ) {
        if (
          existingColor[key as keyof typeof existingColor] !==
          color[key as keyof typeof color]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingColor[key as keyof typeof existingColor],
              newValue: color[key as keyof typeof color],
            };
          }
        }
      }
    }

    //Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
    const oldChanges = Object.keys(changes).map((key) => {
      return `${key}: { Old: '${changes[key].oldValue}'}`;
    });
    const newChanges = Object.keys(changes).map((key) => {
      return `${key}: { New: '${changes[key].newValue}'}`;
    });

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        oldChange: oldChanges,
        newChange: newChanges,
        type: "UPDATECOLOR",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch color." }),
      { status: 500 }
    );
  }
}

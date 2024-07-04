import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

type FavoriteValue = string  | Date | undefined | null;

interface ChangeRecord {
  oldValue: FavoriteValue;
  newValue: FavoriteValue;
}

export async function GET(
  req: Request,
  { params }: { params: { favoriteId: string } }
) {
  try {
    if (!params.favoriteId) {
      return new NextResponse(
        JSON.stringify({ error: "Favorite id is required!" }),
        { status: 400 }
      );
    }

    const favorite = await prismadb.favorite.findUnique({
      where: {
        id: params.favoriteId,
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get favorite." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { favoriteId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.favoriteId) {
      return new NextResponse(
        JSON.stringify({ error: "Favorite id is required!" }),
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

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
        { status: 403 }
      );
    }

    const favorite = await prismadb.favorite.delete({
      where: {
        id: params.favoriteId,
      },
    });

    const sentFavorite = {
      name: favorite?.name,
    };

    // Log sự thay đổi của sentVeirifi
    const changes = [
      `DeleteName: ${sentFavorite.name}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETEPIN-FAVORITE",
        delete: changes,
        user: userId?.email || "",
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete favorite." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { favoriteId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { name,value } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
    }

    if (!params.favoriteId) {
      return new NextResponse(
        JSON.stringify({ error: "Favorite id is required!" }),
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

    const existingFavorite = await prismadb.favorite.findUnique({
      where: {
        id: params.favoriteId,
      },
    });

    const favorite = await prismadb.favorite.update({
      where: {
        id: params.favoriteId,
      },
      data: {
        name,
        value
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingFavorite) {
      if (
        existingFavorite.hasOwnProperty(key) &&
        favorite.hasOwnProperty(key)
      ) {
        if (
          existingFavorite[key as keyof typeof existingFavorite] !==
          favorite[key as keyof typeof favorite]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: existingFavorite[key as keyof typeof existingFavorite],
              newValue: favorite[key as keyof typeof favorite],
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
        type: "UPDATEPIN-FAVORITE",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch favorite." }),
      { status: 500 }
    );
  }
}

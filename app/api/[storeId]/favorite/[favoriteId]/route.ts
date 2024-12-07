import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import {
  translateFavoriteIdDelete,
  translateFavoriteIdGet,
  translateFavoritePatch,
} from "@/translate/translate-api";

type FavoriteValue = string | Date | undefined | null;

interface ChangeRecord {
  oldValue: FavoriteValue;
  newValue: FavoriteValue;
}

export async function GET(
  req: Request,
  { params }: { params: { favoriteId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteIdGetMessage = translateFavoriteIdGet(LanguageToUse);
  try {
    if (!params.favoriteId) {
      return new NextResponse(
        JSON.stringify({ error: favoriteIdGetMessage.favoriteIdRequired }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: favoriteIdGetMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: favoriteIdGetMessage.permissionDenied }),
        { status: 403 }
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
      JSON.stringify({ error: favoriteIdGetMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { favoriteId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteIdDeleteMessage = translateFavoriteIdDelete(LanguageToUse);
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: favoriteIdDeleteMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: favoriteIdDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!params.favoriteId) {
      return new NextResponse(
        JSON.stringify({ error: favoriteIdDeleteMessage.favoriteIdRequired }),
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
        JSON.stringify({ error: favoriteIdDeleteMessage.storeIdNotFound }),
        { status: 405 }
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
    const changes = [`DeleteName: ${sentFavorite.name}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETEPIN-FAVORITE",
        delete: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: favoriteIdDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { favoriteId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoritePatchMessage = translateFavoritePatch(LanguageToUse);
  try {
    const body = await req.json();
    const { name, value } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: favoritePatchMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: favoritePatchMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: favoritePatchMessage.nameRequired }),
        {
          status: 400,
        }
      );
    }

    if (!params.favoriteId) {
      return new NextResponse(
        JSON.stringify({ error: favoritePatchMessage.favoriteIdRequired }),
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
        JSON.stringify({ error: favoritePatchMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

     // Kiểm tra xem tên mới đã tồn tại trong cơ sở dữ liệu chưa (ngoại trừ favoriteId hiện tại)
     const existingFavorite = await prismadb.favorite.findFirst({
      where: {
        name,
        storeId: params.storeId,
        NOT: { id: params.favoriteId }, // Loại trừ mục yêu thích hiện tại
      },
    });

    if (existingFavorite) {
      return new NextResponse(
        JSON.stringify({ error: favoritePatchMessage.favoriteExists }),
        { status: 400 }
      );
    }

    const currentFavorite = await prismadb.favorite.findUnique({
      where: {
        id: params.favoriteId,
      },
    });

    if (!currentFavorite) {
      return new NextResponse(
        JSON.stringify({ error: favoritePatchMessage.favoriteNotFound }),
        { status: 404 }
      );
    }

    const favorite = await prismadb.favorite.update({
      where: {
        id: params.favoriteId,
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
    for (const key in currentFavorite) {
      if (
        currentFavorite.hasOwnProperty(key) &&
        favorite.hasOwnProperty(key)
      ) {
        if (
          currentFavorite[key as keyof typeof currentFavorite] !==
          favorite[key as keyof typeof favorite]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: currentFavorite[key as keyof typeof currentFavorite],
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
        user: user?.email || "",
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: favoritePatchMessage.internalError }),
      { status: 500 }
    );
  }
}

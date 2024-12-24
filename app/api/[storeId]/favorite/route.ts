import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { translateFavoriteDelete, translateFavoriteGet, translateFavoritePost } from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoritePostMessage = translateFavoritePost(LanguageToUse);

  try {
    const body = await req.json();
    const { name, value } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: favoritePostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: favoritePostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: favoritePostMessage.nameRequired }), {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: favoritePostMessage.storeIdRequired }),
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
        JSON.stringify({ error: favoritePostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Kiểm tra xem tên đã tồn tại chưa
    const existingFavorite = await prismadb.favorite.findFirst({
      where: {
        name,
        storeId: params.storeId,
      },
    });

    if (existingFavorite) {
      return new NextResponse(
        JSON.stringify({ error: favoritePostMessage.favoriteExists }),
        { status: 400 }
      );
    }

    const favorite = await prismadb.favorite.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    const sentFavorite = {
      name: favorite?.name,
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentFavorite.name}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATEPIN-FAVORITE",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: favoritePostMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteGetMessage = translateFavoriteGet(LanguageToUse);

  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: favoriteGetMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: favoriteGetMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: favoriteGetMessage.permissionDenied }),
        { status: 403 }
      );
    }

    const favorites = await prismadb.favorite.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: favoriteGetMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const favoriteDeleteMessage = translateFavoriteDelete(LanguageToUse);
  try {
    const body = await req.json();
    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: favoriteDeleteMessage.userNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: favoriteDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: favoriteDeleteMessage.idsArrayEmpty }),
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
        JSON.stringify({ error: favoriteDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Fetch all favorite to delete, including their images
    const FavoriteToDelete = await prismadb.favorite.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = FavoriteToDelete.map((favorite) => ({
      name: favorite.name,
    }));

    // Delete all the cartegories in one operation
    await prismadb.favorite.deleteMany({
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
        delete: changesArray.map((change) => `DeleteName: ${change.name}`),
        type: "DELETEMANY-FAVORITE",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: favoriteDeleteMessage.deleteSuccess });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: favoriteDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

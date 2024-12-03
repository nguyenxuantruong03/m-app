import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import {
  translateStoreIdDelete,
  translateStoreIdPatch,
} from "@/translate/translate-api";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const storePatchMessage = translateStoreIdPatch(LanguageToUse);

  try {
    const body = await req.json();
    const { name } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: storePatchMessage.userIdNotFound }),
        {
          status: 403,
        }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: storePatchMessage.permissionDenied }),
        { status: 405 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: storePatchMessage.nameRequired }),
        {
          status: 400,
        }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: storePatchMessage.storeIdRequired }),
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
    return new NextResponse(
      JSON.stringify({ error: storePatchMessage.internalErrorPatchStore }),
      {
        status: 500,
      }
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
  const storeIdDeleteMessage = translateStoreIdDelete(LanguageToUse);
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: storeIdDeleteMessage.userIdNotFound }),
        {
          status: 403,
        }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: storeIdDeleteMessage.permissionDenied }),
        { status: 405 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: storeIdDeleteMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    // Kiểm tra tổng số cửa hàng hiện tại
    const totalStores = await prismadb.store.count();
    if (totalStores <= 1) {
      return new NextResponse(
        JSON.stringify({ error: storeIdDeleteMessage.cannotDeleteStore }),
        { status: 400 }
      );
    }

    const store = await prismadb.store.delete({
      where: {
        id: params.storeId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: storeIdDeleteMessage.internalErrorDeleteStore }),
      {
        status: 500,
      }
    );
  }
}

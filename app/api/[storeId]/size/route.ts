import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { translateSizeDelete, translateSizeGet, translateSizePost } from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const sizePostMessage = translateSizePost(LanguageToUse);
  try {
    const body = await req.json();
    const { name, value } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: sizePostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: sizePostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: sizePostMessage.nameRequired }),
        {
          status: 400,
        }
      );
    }

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: sizePostMessage.valueRequired }),
        {
          status: 400,
        }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: sizePostMessage.storeIdRequired }),
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
        JSON.stringify({ error: sizePostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

     // Kiểm tra xem có size nào với name giống name mới không
     const existingSize = await prismadb.size.findFirst({
      where: {
        name: name,
        storeId: params.storeId,
      },
    });

    if (existingSize) {
      return new NextResponse(
        JSON.stringify({ error: sizePostMessage.sizeAlreadyExists }),
        { status: 400 }
      );
    }

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    const sentSize = {
      name: size?.name,
      value: size.value,
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentSize.name}, Value: ${sentSize.value}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATESIZE",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: sizePostMessage.internalError }),
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
  const sizeGetMessage = translateSizeGet(LanguageToUse);
  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: sizeGetMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    const size = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: sizeGetMessage.internalError }),
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
  const sizeDeleteMessage = translateSizeDelete(LanguageToUse)
  try {
    const body = await req.json();
    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: sizeDeleteMessage.userNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: sizeDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: sizeDeleteMessage.idsArrayNotEmpty }),
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
        JSON.stringify({ error: sizeDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Fetch all size to delete, including their images
    const SizeToDelete = await prismadb.size.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Create an array of changes for logging
    const changesArray = SizeToDelete.map((size) => ({
      name: size.name,
      value: size.value,
    }));

    // Delete all the size in one operation
    await prismadb.size.deleteMany({
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
        delete: changesArray.map(
          (change) => `DeleteName: ${change.name}, Value: ${change.value}`
        ),
        type: "DELETEMANY-SIZE",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: sizeDeleteMessage.deleteSuccess });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: sizeDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

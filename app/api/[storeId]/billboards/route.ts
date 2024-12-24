import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { translateBillboardDelete, translatebillboardGet, translateBillboardPost } from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  const body = await req.json();
  const { label, imagebillboard, description } = body;

  //language
  const LanguageToUse = user?.language || "vi";
  const billboardPostMessage = translateBillboardPost(LanguageToUse)
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: billboardPostMessage.name1 }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: billboardPostMessage.name2 }),
        { status: 403 }
      );
    }

    if (!label) {
      return new NextResponse(JSON.stringify({ error: billboardPostMessage.name3 }), {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: billboardPostMessage.name4 }),
        {
          status: 400,
        }
      );
    }

    if (!imagebillboard || !imagebillboard.length) {
      return new NextResponse(
        JSON.stringify({ error: billboardPostMessage.name5 }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: billboardPostMessage.name6 }),
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
        JSON.stringify({ error: billboardPostMessage.name7 }),
        { status: 405 }
      );
    }

    // Kiểm tra xem label mới có bị trùng với label cũ không
    const existingBillboard = await prismadb.billboard.findFirst({
      where: {
        storeId: params.storeId,
        label: label,
      },
    });

    if (existingBillboard) {
      return new NextResponse(
        JSON.stringify({ error: billboardPostMessage.name9 }),
        { status: 400 }
      );
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        description,
        imagebillboard: {
          createMany: {
            data: [...imagebillboard.map((image: { url: string }) => image)],
          },
        },
        storeId: params.storeId,
      },
    });

    const sentBillboard = {
      label: billboard?.label,
      description: billboard?.description,
      imagebillboard: imagebillboard.map((image: { url: string }) => image.url),
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Label: ${sentBillboard.label}, ImageBillboard: ${sentBillboard.imagebillboard} description: ${sentBillboard.description}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: changes,
        type: "CREATEBILLBOARD",
        user: user?.email || "",
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: billboardPostMessage.name8 }),
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
  const billboardGetMessage = translatebillboardGet(LanguageToUse)

  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: billboardGetMessage.name1 }),
        { status: 400 }
      );
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        imagebillboard: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: billboardGetMessage.name2 }),
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
  const billboardDeleteMessage = translateBillboardDelete(LanguageToUse) 

  try {
    const body = await req.json();

    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: billboardDeleteMessage.name1 }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: billboardDeleteMessage.name2 }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: billboardDeleteMessage.name3 }),
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
        JSON.stringify({ error: billboardDeleteMessage.name4 }),
        { status: 405 }
      );
    }

    // Fetch all billboards to delete, including their images
    const billboardsToDelete = await prismadb.billboard.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        imagebillboard: true,
      },
    });

    // Create an array of changes for logging
    const changesArray = billboardsToDelete.map((billboard) => ({
      label: billboard.label,
      description: billboard.description,
      valueImage: billboard.imagebillboard.map((image) => image.url),
    }));

    // Delete all the billboards in one operation
    await prismadb.billboard.deleteMany({
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
          (change) =>
            `DeleteLabel: ${change.label}, ImageBillboard: ${change.valueImage}, Descriotion: ${change.description}`
        ),
        type: "DELETEMANYBILLBOARD",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: billboardDeleteMessage.name5 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: billboardDeleteMessage.name6 }),
      { status: 500 }
    );
  }
}

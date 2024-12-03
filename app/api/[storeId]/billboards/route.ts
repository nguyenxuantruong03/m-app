import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { translateText } from "@/translate/translate-client";
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
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language
  
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

    const translations = await Promise.all(
      billboards.map(async (billboard) => {
        try {
          // Dịch label và description của billboard
          const translatedLabelText = await translateText(
            billboard.label || "",
            language
          );
          const translatedDescriptionText = await translateText(
            billboard.description || "",
            language
          );

          // Dịch cho các imagebillboard
          const translatedImageBillboards = await Promise.all(
            billboard.imagebillboard.map(async (imageBillboard) => {
              const translatedImageLabelText = await translateText(
                imageBillboard.label || "",
                language
              );
              const translatedImageDescriptionText = await translateText(
                imageBillboard.description || "",
                language
              );

              return {
                ...imageBillboard,
                label: translatedImageLabelText,
                description: translatedImageDescriptionText,
              };
            })
          );

          return {
            ...billboard,
            label: translatedLabelText,
            description: translatedDescriptionText,
            imagebillboard: translatedImageBillboards,
          };
        } catch (error) {
          console.error("Error while translating billboard:", error);
          return billboard; // Trả về dữ liệu gốc nếu có lỗi
        }
      })
    );

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

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
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

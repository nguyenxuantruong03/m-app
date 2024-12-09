import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { translateText } from "@/translate/translate-client";
import {
  translateColorDelete,
  translateColorGet,
  translateColorPost,
} from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const colorPostMessage = translateColorPost(LanguageToUse);
  try {
    const body = await req.json();
    const { name, value } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: colorPostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: colorPostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: colorPostMessage.nameRequired }),
        {
          status: 400,
        }
      );
    }

    if (!value) {
      return new NextResponse(
        JSON.stringify({ error: colorPostMessage.colorRequired }),
        {
          status: 400,
        }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: colorPostMessage.storeIdRequired }),
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
        JSON.stringify({ error: colorPostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Kiểm tra nếu đã có màu với tên và giá trị giống nhau
    const existingColor = await prismadb.color.findFirst({
      where: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    if (existingColor) {
      return new NextResponse(
        JSON.stringify({ error: colorPostMessage.colorExists }),
        { status: 400 }
      );
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    const sentColor = {
      name: color?.name,
      value: color.value,
    };

    // Log sự thay đổi của billboard
    const changes = [`Name: ${sentColor.name}, Value: ${sentColor.value}`];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATE-COLOR",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: colorPostMessage.internalError }),
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
  const colorGetMessage = translateColorGet(LanguageToUse);

  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language

  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: colorGetMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    const translations = await Promise.all(
      colors.map(async (color) => {
        try {
          // Chỉ dịch name
          let translatedName = color.name;
    
          if (language !== "vi") {
            translatedName = await translateText(color.name, language);
    
            // Nếu không có dữ liệu dịch, giữ lại tên gốc
            if (!translatedName) {
              translatedName = color.name;
            }
          }
    
          return {
            ...color,
            name: translatedName,
          };
        } catch (error) {
          // Nếu có lỗi trong quá trình dịch, trả về dữ liệu gốc
          return color; 
        }
      })
    );
    
    return NextResponse.json(translations);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: colorGetMessage.internalError }),
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
  const colorDeleteMessage = translateColorDelete(LanguageToUse);
  try {
    const body = await req.json();
    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: colorDeleteMessage.userNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: colorDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: colorDeleteMessage.idsRequired }),
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
        JSON.stringify({ error: colorDeleteMessage.storeIdNotFound }),
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
    const changesArray = ColorToDelete.map((color) => ({
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
        delete: changesArray.map(
          (change) => `DeleteName: ${change.name}, Value: ${change.value}`
        ),
        type: "DELETEMANYCOLOR",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: colorDeleteMessage.deleteSuccess });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: colorDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { ImageBillboard, UserRole } from "@prisma/client";
import { translateText } from "@/translate/translate-client";
import { translateBillboardIdDelete, translateBillboardIdGet, translateBillboardIdPatch } from "@/translate/translate-api";

// Update the BillboardValue type to include the new types
type BillboardValue =
  | string
  | number
  | boolean
  | string[]
  | Date
  | ImageBillboard[]
  | undefined;

// Define the type for change records
interface ChangeRecord {
  oldValue: BillboardValue;
  newValue: BillboardValue;
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const billboardIdGetMessage = translateBillboardIdGet(LanguageToUse)

  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language") || "vi"; // Mặc định là "vi" nếu không có language

    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdGetMessage.name1 }),
        { status: 400 }
      );
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
      include: {
        imagebillboard: true,
      },
    });

    // Kiểm tra nếu không tìm thấy billboard
    if (!billboard) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdGetMessage.name2 }),
        { status: 404 }
      );
    }

    // Dịch label và description của billboard
    const translatedLabelText = await translateText(
      billboard.label || "",
      language
    );
    const translatedDescriptionText = await translateText(
      billboard.description || "",
      language
    );

    // Dịch các imagebillboard
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

    // Trả về kết quả đã dịch
    return NextResponse.json({
      ...billboard,
      label: translatedLabelText,
      description: translatedDescriptionText,
      imagebillboard: translatedImageBillboards,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: billboardIdGetMessage.name3 }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const billboardIdDeleteMessage = translateBillboardIdDelete(LanguageToUse)

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdDeleteMessage.name1 }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdDeleteMessage.name2 }),
        { status: 403 }
      );
    }

    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdDeleteMessage.name3 }),
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
        JSON.stringify({ error: billboardIdDeleteMessage.name4 }),
        { status: 400 }
      );
    }

    const existingBillboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
      include: {
        imagebillboard: true,
      },
    });

    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    const sentBillboard = {
      label: billboard?.label,
      valueImage: existingBillboard?.imagebillboard.map(
        (image: { url: string }) => image.url
      ),
    };

    // Log sự thay đổi của sentVeirifi
    const changes = [
      `DeleteLabel: ${sentBillboard.label}, ImageBillboard: ${sentBillboard.valueImage}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changes,
        type: "DELETEBILLBOARD",
        user: user?.email || "",
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: billboardIdDeleteMessage.name5 }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const billboardIdPatchMessage = translateBillboardIdPatch(LanguageToUse)

  try {
    const body = await req.json();
    const { label, imagebillboard, description } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdPatchMessage.name1 }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdPatchMessage.name2 }),
        { status: 403 }
      );
    }

    if (!label) {
      return new NextResponse(JSON.stringify({ error: billboardIdPatchMessage.name3 }), {
        status: 400,
      });
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdPatchMessage.name4 }),
        {
          status: 400,
        }
      );
    }

    if (!imagebillboard || !imagebillboard.length) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdPatchMessage.name5 }),
        { status: 400 }
      );
    }

    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: billboardIdPatchMessage.name6 }),
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
        JSON.stringify({ error: billboardIdPatchMessage.name7 }),
        { status: 405 }
      );
    }

    const existingBillboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
      include: {
        imagebillboard: true,
      },
    });

    const existingImages = existingBillboard?.imagebillboard || [];

    // Tạo danh sách URL hiện tại
    const existingImageUrls = existingImages.map((image) => image.url);

    // Tìm các hình ảnh cần thêm mới và các hình ảnh cần cập nhật
    const imagesToCreate = imagebillboard.filter(
      (image: { url: string }) => !existingImageUrls.includes(image.url)
    );
    const imagesToUpdate = imagebillboard.filter((image: { url: string }) =>
      existingImageUrls.includes(image.url)
    );

    // Thêm các ảnh mới
    if (imagesToCreate.length > 0) {
      await prismadb.imageBillboard.createMany({
        data: imagesToCreate.map((image: string[]) => ({
          ...image,
          billboardId: params.billboardId,
        })),
      });
    }

    // Cập nhật các ảnh hiện tại
    for (const image of imagesToUpdate) {
      await prismadb.imageBillboard.updateMany({
        where: {
          billboardId: params.billboardId,
          url: image.url,
        },
        data: {
          label: image.label,
          description: image.description,
        },
      });
    }

    // Cập nhật các trường khác của billboard
    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        description,
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in existingBillboard) {
      if (
        existingBillboard.hasOwnProperty(key) &&
        billboard.hasOwnProperty(key)
      ) {
        if (
          existingBillboard[key as keyof typeof existingBillboard] !==
          billboard[key as keyof typeof billboard]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue:
                existingBillboard[key as keyof typeof existingBillboard],
              newValue: billboard[key as keyof typeof billboard],
            };
          }
        }
      }
    }

    // Nếu có thay đổi trong imagebillboard, thêm vào danh sách changes
    if (imagebillboard && imagebillboard.length) {
      changes["imagebillboard"] = {
        oldValue: existingBillboard?.imagebillboard.map(
          (image: { url: string }) => image.url
        ),
        newValue: imagebillboard.map((image: { url: string }) => image.url),
      };
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
        type: "UPDATEBILLBOARD",
        user: user?.email || "",
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: billboardIdPatchMessage.name8 }),
      { status: 500 }
    );
  }
}

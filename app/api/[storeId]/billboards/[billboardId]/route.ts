import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { ImageBillboard, UserRole } from "@prisma/client";
import { createTranslator } from "next-intl";

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
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.billboardID") }),
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
        JSON.stringify({ error: t("toastError.billboard.billboardNotFound") }),
        { status: 404 }
      );
    }

    // Trả về kết quả đã dịch
    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.billboard.intternalErrorGetBillboard") }),
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
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.billboardID") }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
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
      JSON.stringify({ error: t("toastError.billboard.intternalErrorDeleteBillboard") }),
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
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();
    const { label, imagebillboard, description } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.permissionDenied") }),
        { status: 403 }
      );
    }

    if (!label) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.label") }),
        {
          status: 400,
        }
      );
    }

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.description") }),
        {
          status: 400,
        }
      );
    }

    if (!imagebillboard || !imagebillboard.length) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.imageBillboard") }),
        { status: 400 }
      );
    }

    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.billboardID") }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.storeIdRequired") }),
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

    // Kiểm tra nếu không tìm thấy billboard
    if (!existingBillboard) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.billboard.billboardNotFound") }),
        { status: 404 }
      );
    }

    // Kiểm tra trùng lặp label
    const labelExists = await prismadb.billboard.findFirst({
      where: {
        storeId: params.storeId,
        label: label,
        NOT: {
          id: params.billboardId, // Loại trừ billboard hiện tại
        },
      },
    });

    if (labelExists) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.labelAlreadyExists") }),
        { status: 400 }
      );
    }

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
      JSON.stringify({ error: t("toastError.billboard.intternalErrorPatchBillboard") }),
      { status: 500 }
    );
  }
}

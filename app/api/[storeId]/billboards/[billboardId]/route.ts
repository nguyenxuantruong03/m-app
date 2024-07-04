import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { ImageBillboard, UserRole } from "@prisma/client";

// Update the BillboardValue type to include the new types
type BillboardValue = string | number | boolean | string[] | Date | ImageBillboard[] | undefined;

// Define the type for change records
interface ChangeRecord {
  oldValue: BillboardValue;
  newValue: BillboardValue;
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required!" }),
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

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get billboard." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }

    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required!" }),
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
        { status: 400 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
        { status: 403 }
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
        user: userId?.email || "",
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete billboard." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { label, imagebillboard } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!label) {
      return new NextResponse(JSON.stringify({ error: "Label is required!" }), {
        status: 400,
      });
    }

    if (!imagebillboard || !imagebillboard.length) {
      return new NextResponse(
        JSON.stringify({ error: "Images billboard is required!" }),
        { status: 400 }
      );
    }

    if (!params.billboardId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required!" }),
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

    const existingBillboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
      include: {
        imagebillboard: true,
      },
    });

    await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imagebillboard: {
          deleteMany: {},
        },
      },
    });
    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        imagebillboard: {
          createMany: {
            data: [...imagebillboard.map((image: { url: string }) => image)],
          },
        },
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
        user: userId?.email || "",
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch billboard." }),
      { status: 500 }
    );
  }
}

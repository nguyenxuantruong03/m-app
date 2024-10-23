import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { ImageBillboard, UserRole } from "@prisma/client";

// Update the BillboardValue type to include the new types
type BillboardValue =
  | string
  | number
  | boolean
  | string[]
  | Date
  | ImageBillboard[]
  | null
  | undefined;

// Define the type for change records
interface ChangeRecord {
  oldValue: BillboardValue;
  newValue: BillboardValue;
}

export async function GET(
  req: Request,
  { params }: { params: { imagebillboardId: string } }
) {
  try {
    if (!params.imagebillboardId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required!" }),
        { status: 400 }
      );
    }

    const billboard = await prismadb.imageBillboard.findUnique({
      where: {
        id: params.imagebillboardId,
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
  { params }: { params: { imagebillboardId: string; storeId: string } }
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

    if (!params.imagebillboardId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required!" }),
        { status: 400 }
      );
    }

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
        { status: 403 }
      );
    }

    const existingBillboard = await prismadb.imageBillboard.findUnique({
      where: {
        id: params.imagebillboardId,
      },
    });

    const imageBillboardData = await prismadb.imageBillboard.findMany();

    let billboard;
    if (imageBillboardData.some(billboard => billboard.id === params.imagebillboardId)) {
      billboard = await prismadb.imageBillboard.delete({
        where: {
          id: params.imagebillboardId,
        },
      });
    }  else {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id not found in either table!" }),
        { status: 404 }
      );
    }

    const sentBillboard = {
      label: billboard?.label,
      description: billboard?.description,
      valueImage: existingBillboard?.url,
    };

    // Log sự thay đổi của sentBillboard
    const changes = [
      `DeleteLabel: ${sentBillboard.label}, ImageBillboard: ${sentBillboard.valueImage}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changes,
        type: "DELETEIMAGEBILLBOARD",
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
  { params }: { params: { imagebillboardId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const body = await req.json();

    const { label, url, description } = body;

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

    if (!description) {
      return new NextResponse(
        JSON.stringify({ error: "Description is required!" }),
        { status: 400 }
      );
    }

    if (!url) {
      return new NextResponse(
        JSON.stringify({ error: "Images billboard is required!" }),
        { status: 400 }
      );
    }

    if (!params.imagebillboardId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required!" }),
        { status: 400 }
      );
    }

    // Kiểm tra tồn tại trong bảng imageBillboard
    const existingBillboard = await prismadb.imageBillboard.findUnique({
      where: {
        id: params.imagebillboardId,
      }
    });

    if (!existingBillboard) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard not found!" }),
        { status: 404 }
      );
    }

    // Update existing billboard
    const updatedBillboard = await prismadb.imageBillboard.update({
      where: {
        id: params.imagebillboardId,
      },
      data: {
        url: url,
        label: label,
        description: description,
      },
    });

    // Xác định bản ghi ban đầu
    const originalBillboard = existingBillboard;

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const ignoredFields = ["createdAt", "updatedAt"];
    const changes: Record<string, ChangeRecord> = {};
    for (const key in originalBillboard) {
      if (
        originalBillboard.hasOwnProperty(key) &&
        updatedBillboard[key as keyof typeof updatedBillboard] !== undefined &&
        originalBillboard[key as keyof typeof originalBillboard] !==
        updatedBillboard[key as keyof typeof updatedBillboard]
      ) {
        // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
        if (!ignoredFields.includes(key)) {
          changes[key] = {
            oldValue: originalBillboard[key as keyof typeof originalBillboard],
            newValue: updatedBillboard[key as keyof typeof updatedBillboard],
          };
        }
      }
    }

    // Hợp nhất các thay đổi thành một hàng duy nhất và ghi lại chúng
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
        type: "UPDATEIMAGEBILLBOARD",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(updatedBillboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch imagebillboard." }),
      { status: 500 }
    );
  }
}

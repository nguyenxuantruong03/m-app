import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { currentRole, currentUser } from "@/lib/auth";
import { ImageBillboardTime, UserRole } from "@prisma/client";

type BillboardTimeValue = string | number | boolean | string[] | Date | ImageBillboardTime[] | undefined | null;

interface ExtendedChangeRecord {
  oldValue: BillboardTimeValue;
  newValue: BillboardTimeValue;
}

export async function GET(
  req: Request,
  { params }: { params: { billboardtimesId: string } }
) {
  try {
    if (!params.billboardtimesId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboard id is required" }),
        { status: 400 }
      );
    }

    const billboardTime = await prismadb.billboardTime.findUnique({
      where: {
        id: params.billboardtimesId,
      },
      include: {
        imagebillboardtime: true,
      },
    });

    return NextResponse.json(billboardTime);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get billboardtime." }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardtimesId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Người dùng hiện tại không có id!" }),
        { status: 403 }
      );
    }

    if (!params.billboardtimesId) {
      return new NextResponse(
        JSON.stringify({ error: "Billboardtime id is required" }),
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

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        JSON.stringify({ error: "Vai trò của bạn không được quyền !" }),
        { status: 400 }
      );
    }

    const existingBillboardTime = await prismadb.billboardTime.findUnique({
      where: {
        id: params.billboardtimesId,
      },
      include: {
        imagebillboardtime: true,
      },
    });

    const billboardTime = await prismadb.billboardTime.delete({
      where: {
        id: params.billboardtimesId,
      },
    });

    const sentBillboardTime = {
      label: billboardTime?.label,
      valueImage: existingBillboardTime?.imagebillboardtime.map(
        (image: { url: string }) => image.url
      ),
    };

    // Log sự thay đổi của sentVeirifi
    const changes = [
      `DeleteLabel: ${sentBillboardTime.label}, ImageBillboardTime: ${sentBillboardTime.valueImage}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        delete: changes,
        type: "DELETEBILLBOARDTIME",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(billboardTime);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete billboardtime." }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardtimesId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { label, imagebillboardtime, timeout } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Người dùng hiện tại không có id!" }),
        { status: 403 }
      );
    }

    if (!label) {
      return new NextResponse(JSON.stringify({ error: "Label is required!" }), {
        status: 400,
      });
    }

    if (!timeout) {
      return new NextResponse(JSON.stringify({ error: "Label is required!" }), {
        status: 400,
      });
    }

    if (!imagebillboardtime || !imagebillboardtime.length) {
      return new NextResponse(
        JSON.stringify({ error: "Imagebillboardtime is required!" }),
        { status: 400 }
      );
    }

    if (!params.billboardtimesId) {
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

    const existingBillboardTime = await prismadb.billboardTime.findUnique({
      where: {
        id: params.billboardtimesId,
      },
      include: {
        imagebillboardtime: true,
      },
    });

    await prismadb.billboardTime.update({
      where: {
        id: params.billboardtimesId,
      },
      data: {
        label,
        timeout,
        imagebillboardtime: {
          deleteMany: {},
        },
      },
    });
    const billboardTime = await prismadb.billboardTime.update({
      where: {
        id: params.billboardtimesId,
      },
      data: {
        imagebillboardtime: {
          createMany: {
            data: [
              ...imagebillboardtime.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ExtendedChangeRecord> = {};
    for (const key in existingBillboardTime) {
      if (
        existingBillboardTime.hasOwnProperty(key) &&
        billboardTime.hasOwnProperty(key)
      ) {
        if (
          existingBillboardTime[key as keyof typeof existingBillboardTime] !==
          billboardTime[key as keyof typeof billboardTime]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue:
                existingBillboardTime[
                  key as keyof typeof existingBillboardTime
                ],
              newValue: billboardTime[key as keyof typeof billboardTime],
            };
          }
        }
      }
    }

    // Nếu có thay đổi trong imagebillboard, thêm vào danh sách changes
    if (imagebillboardtime && imagebillboardtime.length) {
      changes["imagebillboard"] = {
        oldValue: existingBillboardTime?.imagebillboardtime.map(
          (image: { url: string }) => image.url
        ),
        newValue: imagebillboardtime.map((image: { url: string }) => image.url),
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
        type: "UPDATEBILLBOARDTIME",
        newChange: newChanges,
        oldChange: oldChanges,
        user: userId?.email || "",
      },
    });

    return NextResponse.json(billboardTime);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch billboardtime." }),
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { billboardtimesId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Người dùng hiện tại không có id!" }),
        { status: 403 }
      );
    }

    const existingBillboardTime = await prismadb.billboardTime.findUnique({
      where: {
        id: params.billboardtimesId,
      },
      include: {
        imagebillboardtime: true,
      },
    });

    const billboardTime = await prismadb.billboardTime.update({
      where: {
        id: params.billboardtimesId,
      },
      data: {
        timeout: 0,
        isTimeout: true,
      },
    });

    // Kiểm tra sự thay đổi của sentVeirifi
    const sentBillboardTimeChanges = {
      oldValueisTimeout: existingBillboardTime?.isTimeout,
      newValueisTimeout: billboardTime.isTimeout,

      oldValuetimeout: existingBillboardTime?.timeout,
      newValuetimeout: billboardTime.timeout,
    };

    // Log sự thay đổi của sentVeirifi
    const oldchanges = [
      `OldValueisTimeout: ${sentBillboardTimeChanges.oldValueisTimeout}, OldValueTimeout: ${sentBillboardTimeChanges.oldValuetimeout}`,
    ];

    // Log sự thay đổi của sentVeirifi
    const newchanges = [
      `NewValueisTimeout: ${sentBillboardTimeChanges.newValueisTimeout}, NewValueTimeout: ${sentBillboardTimeChanges.newValuetimeout}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "UPDATEBILLBOARDTIME",
        oldChange: oldchanges,
        newChange: newchanges,
        user: userId?.email || "",
      },
    });

    return NextResponse.json(billboardTime);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch billboardtime." }),
      { status: 500 }
    );
  }
}

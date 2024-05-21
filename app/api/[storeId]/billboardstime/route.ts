import { NextResponse } from "next/server";
import { currentRole, currentUser } from "@/lib/auth";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required!" }),
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
      if (!storeByUserId) {
        return new NextResponse(
          JSON.stringify({ error: "Không tìm thấy store id!" }),
          { status: 405 }
        );
      }
    }

    const billboard = await prismadb.billboardTime.create({
      data: {
        label,
        timeout,
        imagebillboardtime: {
          createMany: {
            data: [
              ...imagebillboardtime.map((image: { url: string }) => image),
            ],
          },
        },
        storeId: params.storeId,
      },
    });

    const sentBillboardTime = {
      label: billboard?.label,
      imagebillboard: imagebillboardtime.map(
        (image: { url: string }) => image.url
      ),
      time: billboard?.timeout,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Label: ${sentBillboardTime.label}, Timeout: ${sentBillboardTime.time}, ImageBillboardTime: ${sentBillboardTime.imagebillboard},`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: changes,
        type: "CREATEBILLBOARDTIME",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post billboardtime." }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store id is required" }),
        { status: 400 }
      );
    }

    const billboards = await prismadb.billboardTime.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        imagebillboardtime: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error get billboardtime." }),
      { status: 500 }
    );
  }
}



export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();
    const body = await req.json();

    const { ids } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Mảng IDs không được trống!" }),
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
        JSON.stringify({ error: "Vai trò hiện tại của bạn không được quyền!" }),
        { status: 403 }
      );
    }

    // Fetch all billboards to delete, including their images
    const billboardsToDelete = await prismadb.billboardTime.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        imagebillboardtime: true,
      },
    });

    // Create an array of changes for logging
    const changesArray = billboardsToDelete.map(billboard => ({
      label: billboard.label,
      valueImage: billboard.imagebillboardtime.map(image => image.url),
    }));

    // Delete all the billboards in one operation
    await prismadb.billboardTime.deleteMany({
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
        delete: changesArray.map(change => `DeleteLabel: ${change.label}, ImageBillboardTime: ${change.valueImage}`),
        type: "DELETEMANYBILLBOARDTIME",
        user: userId?.email || "",
      },
    });

    return NextResponse.json({ message: "Xóa thành công!" });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete billboards." }),
      { status: 500 }
    );
  }
}

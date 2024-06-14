import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const userId = await currentUser();

    const body = await req.json();

    const { limitDevice } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }
    if (!limitDevice) {
      return new NextResponse(
        JSON.stringify({ error: "Limit Device is required!" }),
        {
          status: 400,
        }
      );
    }

    // Tìm thông tin thiết bị của người dùng hiện tại
    const deviceInfo = await prismadb.deviceInfo.findMany();
    // Lưu trữ danh sách limitDevice hiện tại từ deviceInfo
    const currentLimitDevices = deviceInfo.map((info) => info.limitDevice);
    // So sánh limitDevice mới với limitDevice hiện tại
    currentLimitDevices.forEach((newLimitDevice) => {
      if (currentLimitDevices.includes(newLimitDevice)) {
        return new NextResponse(
          JSON.stringify({
            error: `Cần thay đổi giới hạn mới hơn. Hiện tại bạn đã để ${newLimitDevice} thiết bị.`,
          }),
          { status: 400 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({
            error: `Thêm thiết bị mới có giới hạn ${newLimitDevice}.`,
          }),
          { status: 400 }
        );
      }
    });

    // Cập nhật thuộc tính `limitDevice` và `userId` của phần tử khớp
    const updatedDeviceInfo = await prismadb.deviceInfo.updateMany({
      where: {
        userId: userId?.id,
      },
      data: {
        limitDevice: limitDevice,
        userId: userId.id || "",
      },
    });

    // Tạo đối tượng `sentLimitDevice` từ phần tử đã được cập nhật
    if (updatedDeviceInfo.count > 0) {
      // Lấy limitDevice của phần tử đầu tiên
      const firstLimitDevice = await prismadb.deviceInfo.findFirst({
        where: {
          userId: userId.id || "",
          limitDevice: limitDevice,
        },
      });
      // Tạo đối tượng sentLimitDevice
      const sentLimitDevice = {
        limit: firstLimitDevice?.limitDevice,
      };

      // Log sự thay đổi của billboard
      const changes = [`Limit: ${sentLimitDevice.limit}`];
      // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
      await prismadb.system.create({
        data: {
          type: "CREATE-LIMITDEVICE",
          newChange: changes,
          user: userId?.email || "",
        },
      });
    }
    return NextResponse.json(updatedDeviceInfo);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error post deveciInfo." }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await currentUser();
    const body = await req.json();
    const { id } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy userId!" }),
        { status: 403 }
      );
    }
    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy id!" }),
        { status: 400 }
      );
    }

    const findDevice = await prismadb.deviceInfo.findMany({
      where: {
        userId: userId?.id
      }
    })

    // If there's only one device, do not allow deletion
    if (findDevice.length <= 1) {
      return new NextResponse(
        JSON.stringify({ error: "Không thể xóa thiết bị duy nhất!" }),
        { status: 400 }
      );
    }
    // Xóa thiết bị từ database
   const device = await prismadb.deviceInfo.delete({
      where: {
        id: id,
      },
    });

    const sentDevice = {
      os: device.os,
      ua: device.ua,
      fullModel: device.fullModel,
      device: device.device
    };

    const changes = [
      `os: ${sentDevice.os}, ua: ${sentDevice.ua}, fullModel: ${sentDevice.fullModel}, device: ${sentDevice.device}`
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        delete: changes,
        type: "DELETE-DEVICE",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(device);
  } catch (error) {
    console.error("Lỗi khi xóa thiết bị:", error);
    return new NextResponse(
      JSON.stringify({ error: "Lỗi nội bộ khi xóa thiết bị." }),
      { status: 500 }
    );
  }
}

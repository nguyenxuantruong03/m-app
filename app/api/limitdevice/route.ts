import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });

  try {

    const body = await req.json();

    const { limitDevice } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }
    if (!limitDevice) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.limitDeviceRequired") }),
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
            error: t("toastError.changeLimitMessage",{newLimitDevice: newLimitDevice})
          }),
          { status: 400 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({
            error: t("toastError.addDeviceMessage",{newLimitDevice:newLimitDevice})
          }),
          { status: 400 }
        );
      }
    });

    // Cập nhật thuộc tính `limitDevice` và `userId` của phần tử khớp
    const updatedDeviceInfo = await prismadb.deviceInfo.updateMany({
      where: {
        userId: user?.id,
      },
      data: {
        limitDevice: limitDevice,
        userId: user.id || "",
      },
    });

    // Tạo đối tượng `sentLimitDevice` từ phần tử đã được cập nhật
    if (updatedDeviceInfo.count > 0) {
      // Lấy limitDevice của phần tử đầu tiên
      const firstLimitDevice = await prismadb.deviceInfo.findFirst({
        where: {
          userId: user.id || "",
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
          user: user?.email || "",
        },
      });
    }
    return NextResponse.json(updatedDeviceInfo);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorPostDeviceInfo") }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  try {
    const body = await req.json();
    const { id } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.userNotFound") }),
        { status: 403 }
      );
    }
    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.idNotFound") }),
        { status: 400 }
      );
    }

    const findDevice = await prismadb.deviceInfo.findMany({
      where: {
        userId: user?.id
      }
    })

    // If there's only one device, do not allow deletion
    if (findDevice.length <= 1) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.cannotDeleteOnlyDevice") }),
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
        user: user?.email || "",
      },
    });

    return NextResponse.json(device);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.internalErrorDeleteDevice") }),
      { status: 500 }
    );
  }
}

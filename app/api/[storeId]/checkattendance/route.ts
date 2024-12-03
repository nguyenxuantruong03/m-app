import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import {
  translateCheckAttendanceGet,
  translateCheckAttendancePatch,
  translateCheckAttendancePost,
} from "@/translate/translate-api";
import { Degree, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = await currentUser();
  //language
  const LanguageToUse = userId?.language || "vi";
  const checkAttendanceGetMessage = translateCheckAttendanceGet(LanguageToUse);

  try {
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendanceGetMessage.name1 }),
        { status: 403 }
      );
    }

    if (userId.role === UserRole.GUEST || userId.role === UserRole.USER) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendanceGetMessage.name2 }),
        { status: 403 }
      );
    }

    const eventCalendar = await prismadb.eventCalendar.findMany({
      where: {
        userId: userId?.id,
      },
    });
    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: checkAttendanceGetMessage.name3 }),
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const userId = await currentUser();
  //language
  const LanguageToUse = userId?.language || "vi";
  const checkAttendancePostMessage =
    translateCheckAttendancePost(LanguageToUse);
  try {
    const body = await req.json();
    const { photo, qrResult, datacamera } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name1 }),
        { status: 403 }
      );
    }

    if (userId.role === UserRole.GUEST || userId.role === UserRole.USER) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name2 }),
        { status: 403 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name3 }),
        { status: 400 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!qrResult) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name4 }),
        { status: 405 }
      );
    }

    if (!photo) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name5 }),
        { status: 405 }
      );
    }

    if (!datacamera) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name6 }),
        { status: 405 }
      );
    }

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name7 }),
        { status: 405 }
      );
    }

    if (qrResult !== userId?.urlimageCheckAttendance) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name8 }),
        {
          status: 405,
        }
      );
    }

    const data = await prismadb.eventCalendar.findMany({
      where: {
        userId: userId?.id,
      },
    });
    const filteredData = data && data.filter((item) => item.id === datacamera);
    const isCheckAttendance = filteredData.map((item) => item.title);
    const isCheckAttendanceImage = filteredData.map(
      (item) => item.isCheckAttendanceImage
    );
    const isCheckAttendanceNFC = filteredData.map((item) => item.isCheckNFC);

    if (isCheckAttendanceImage[0] === true) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name9 }),
        { status: 405 }
      );
    }

    if (isCheckAttendanceNFC[0] === true) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePostMessage.name10 }),
        { status: 405 }
      );
    }

    //Trả lường nếu là title✅ có nghĩa là kết thúc
    if (isCheckAttendance[0] === "✅") {
      const eventcalendar = await prismadb.eventCalendar.findUnique({
        where: { id: userId?.id },
      });

      let totalPoints = 0; // Khởi tạo tổng điểm

      let checkCount = 0;
      for (const title of eventcalendar?.title || "") {
        if (title.includes("✅")) {
          checkCount++;
        }
      }

      // Kiểm tra nếu đủ 26 "✅" thì thêm 500 điểm
      if (checkCount >= 26) {
        totalPoints += 500000;
      }

      const user = await prismadb.user.findUnique({
        where: { id: userId?.id },
      });

      switch (user?.degree) {
        case Degree.Elementary:
        case Degree.JuniorHighSchool:
          totalPoints += 250000;
          break;
        case Degree.HighSchool:
        case Degree.JuniorColleges:
          totalPoints += 300000;
          break;
        case Degree.University:
        case Degree.MastersDegree:
          totalPoints += 400000;
          break;
        default:
          totalPoints += 0;
          break;
      }

      // Tìm và cập nhật bản ghi tồn tại nếu có, nếu không, tạo mới
      let existingSalary = await prismadb.caculateSalary.findFirst({
        where: {
          userId: userId?.id,
          eventcalendarId: eventcalendar?.id,
        },
      });

      if (existingSalary) {
        // Chuyển đổi giá trị từ Decimal thành number trước khi thêm vào totalPoints
        const existingSalaryValue = existingSalary.salaryday
          ? parseFloat(existingSalary.salaryday.toString())
          : 0;
        totalPoints += existingSalaryValue;
        await prismadb.caculateSalary.update({
          where: { id: existingSalary.id },
          data: {
            storeId: params.storeId, // Include the required fields
            salaryday: totalPoints,
            eventcalendarId: eventcalendar?.id || "",
            userId: userId?.id || "",
          },
        });
      } else {
        // Tạo bản ghi mới nếu không có bản ghi tồn tại
        await prismadb.caculateSalary.create({
          data: {
            storeId: params.storeId, // Include the required fields
            userId: userId?.id || "",
            eventcalendarId: eventcalendar?.id || "",
            salaryday: totalPoints,
          },
        });
      }
    }

    const currentTimeVN = new Date();
    currentTimeVN.setHours(currentTimeVN.getHours() + 7);
    // Chuyển đổi start và end sang múi giờ của Việt Nam
    const eventCalendar = await prismadb.eventCalendar.update({
      where: {
        id: datacamera,
        storeId: params.storeId,
        userId: userId?.id || "",
      },
      data: {
        urlImageAttendance: photo,
        qrcodeCheckAttendance: qrResult,
        updateImage: currentTimeVN,
        isCheckAttendanceImage: true,
      },
    });

    const sentCheckAttendance = {
      urlImageAttendance: eventCalendar?.urlImageAttendance,
      qrcodeCheckAttendance: eventCalendar?.qrcodeCheckAttendance,
      updateImage: eventCalendar?.updateImage,
      isCheckAttendanceImage: eventCalendar?.isCheckAttendanceImage,
      isCheckAttendance: isCheckAttendance,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `isCheckAttendance: ${sentCheckAttendance.isCheckAttendance}, UrlImageAttendance: ${sentCheckAttendance.urlImageAttendance}, QrcodeCheckAttendance: ${sentCheckAttendance.qrcodeCheckAttendance}, UpdateImage: ${sentCheckAttendance.updateImage}, isCheckAttendanceImage: ${isCheckAttendanceImage}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: changes,
        type: "UPDATECHECKATTENDANCE-QRCODE",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: checkAttendancePostMessage.name11 }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const userId = await currentUser();
  //language
  const LanguageToUse = userId?.language || "vi";
  const checkAttendancePatchMessage = translateCheckAttendancePatch(LanguageToUse)

  try {
    const body = await req.json();
    const { serialNumber, dataEventNFC } = body;

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePatchMessage.name1 }),
        { status: 400 }
      );
    }
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePatchMessage.name2 }),
        { status: 403 }
      );
    }

    if (userId.role === UserRole.GUEST || userId.role === UserRole.USER) {
      return new NextResponse(
        JSON.stringify({
          error: checkAttendancePatchMessage.name3,
        }),
        { status: 403 }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!serialNumber) {
      return new NextResponse(JSON.stringify({ error: checkAttendancePatchMessage.name4 }), {
        status: 405,
      });
    }

    if (!dataEventNFC) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePatchMessage.name5 }),
        { status: 405 }
      );
    }

    if (!storeByUserId) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePatchMessage.name6 }),
        { status: 405 }
      );
    }

    if (serialNumber !== userId?.codeNFC) {
      return new NextResponse(JSON.stringify({ error: checkAttendancePatchMessage.name7 }), {
        status: 405,
      });
    }

    const data = await prismadb.eventCalendar.findMany({
      where: {
        userId: userId?.id,
      },
    });
    const filteredData =
      data && data.filter((item) => item.id === dataEventNFC);
    const isCheckAttendance = filteredData.map((item) => item.title);
    const isCheckAttendanceImage = filteredData.map(
      (item) => item.isCheckAttendanceImage
    );
    const isCheckAttendanceNFC = filteredData.map((item) => item.isCheckNFC);

    if (isCheckAttendanceImage[0] === true) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePatchMessage.name8 }),
        { status: 405 }
      );
    }

    if (isCheckAttendanceNFC[0] === true) {
      return new NextResponse(
        JSON.stringify({ error: checkAttendancePatchMessage.name9 }),
        { status: 405 }
      );
    }

    if (isCheckAttendance[0] === "✅") {
      const eventcalendar = await prismadb.eventCalendar.findUnique({
        where: { id: userId?.id },
      });

      let totalPoints = 0; // Khởi tạo tổng điểm

      let checkCount = 0;
      for (const title of eventcalendar?.title || "") {
        if (title.includes("✅")) {
          checkCount++;
        }
      }

      // Kiểm tra nếu đủ 26 "✅" thì thêm 500 điểm
      if (checkCount >= 26) {
        totalPoints += 500000;
      }

      const user = await prismadb.user.findUnique({
        where: { id: userId?.id },
      });

      switch (user?.degree) {
        case Degree.Elementary:
        case Degree.JuniorHighSchool:
          totalPoints += 250000;
          break;
        case Degree.HighSchool:
        case Degree.JuniorColleges:
          totalPoints += 300000;
          break;
        case Degree.University:
        case Degree.MastersDegree:
          totalPoints += 400000;
          break;
        default:
          totalPoints += 0;
          break;
      }

      // Tìm và cập nhật bản ghi tồn tại nếu có, nếu không, tạo mới
      let existingSalary = await prismadb.caculateSalary.findFirst({
        where: {
          userId: userId?.id,
          eventcalendarId: eventcalendar?.id,
        },
      });

      if (existingSalary) {
        // Chuyển đổi giá trị từ Decimal thành number trước khi thêm vào totalPoints
        const existingSalaryValue = existingSalary.salaryday
          ? parseFloat(existingSalary.salaryday.toString())
          : 0;
        totalPoints += existingSalaryValue;
        await prismadb.caculateSalary.update({
          where: { id: existingSalary.id },
          data: {
            storeId: params.storeId, // Include the required fields
            salaryday: totalPoints,
            eventcalendarId: eventcalendar?.id || "",
            userId: userId?.id || "",
          },
        });
      } else {
        // Tạo bản ghi mới nếu không có bản ghi tồn tại
        await prismadb.caculateSalary.create({
          data: {
            storeId: params.storeId, // Include the required fields
            userId: userId?.id || "",
            eventcalendarId: eventcalendar?.id || "",
            salaryday: totalPoints,
          },
        });
      }
    }

    const currentTimeVN = new Date();
    currentTimeVN.setHours(currentTimeVN.getHours() + 7);
    // Chuyển đổi start và end sang múi giờ của Việt Nam
    const eventCalendar = await prismadb.eventCalendar.update({
      where: {
        id: dataEventNFC,
        storeId: params.storeId,
        userId: userId?.id || "",
      },
      data: {
        codeNFC: serialNumber,
        updateNFC: currentTimeVN,
        isCheckNFC: true,
      },
    });

    const sentCheckAttendance = {
      codeNFC: eventCalendar?.codeNFC,
      updateNFC: eventCalendar?.updateNFC,
      isCheckNFC: eventCalendar?.isCheckNFC,
      isCheckAttendance: isCheckAttendance,
    };

    // Log sự thay đổi của billboard
    const changes = [
      `isCheckAttendance: ${sentCheckAttendance.isCheckAttendance}, codeNFC: ${sentCheckAttendance.codeNFC}, updateNFC: ${sentCheckAttendance.updateNFC}, isCheckNFC: ${sentCheckAttendance.isCheckNFC}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        newChange: changes,
        type: "UPDATECHECKATTENDANCE-NFC",
        user: userId?.email || "",
      },
    });

    return NextResponse.json(eventCalendar);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: checkAttendancePatchMessage.name10 }),
      { status: 500 }
    );
  }
}

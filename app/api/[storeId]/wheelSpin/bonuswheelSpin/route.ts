import { currentUser } from "@/lib/auth";
import { sendSpin, sendUnSpin } from "@/lib/mail";
import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { format } from "date-fns";
import { createTranslator } from "next-intl";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

    const WheelSpin = await prismadb.user.findMany({
      include: {
        WheelSpin: true,
      },
    });
    return NextResponse.json(WheelSpin);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.wheelspin.internalErrorGetWheelSpin") }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  const body = await req.json();
  const { bonusAmount, bonusTitle, bonus, coinAmount, coinbonus, data } = body;

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

    if (!bonusTitle) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.wheelspin.bonusTitleRequired") }),
        { status: 400 }
      );
    }

    const existingWheelSpin = await prismadb.user.findMany({
      include: {
        WheelSpin: true,
      },
    });

    // Lấy tất cả các WheelSpin IDs từ mảng existingWheelSpin cho userId cụ thể
    const allWheelSpinIdsForUser = existingWheelSpin.flatMap((user) =>
      user.WheelSpin.filter((wheelSpin) => wheelSpin.userId === data).map(
        (wheelSpin) => wheelSpin.id
      )
    );

    // Tìm các WheelSpin hiện tại
    const allWheelSpinIdsForUserExisting = existingWheelSpin.flatMap((user) =>
      user.WheelSpin.filter((wheelSpin) => wheelSpin.userId === data)
    );

    //Dựa vào data tìm kiếm người dùng giống so sánh nếu giống thì lấy ra
    const findUserEmail = existingWheelSpin.find((user) => user.id === data);

    if (!existingWheelSpin) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.wheelspin.recordNotFound") }),
        { status: 404 }
      );
    }
    const today = new Date();
    const formattedDate = format(today, "E '-' dd/MM/yyyy '-' HH:mm:ss a");
    await sendSpin(
      findUserEmail?.language,
      findUserEmail?.email,
      findUserEmail?.name,
      bonus,
      bonusAmount,
      coinbonus,
      coinAmount,
      bonusTitle,
      formattedDate
    );

    if (allWheelSpinIdsForUser.length >= 1) {
      const updatedWheelSpin = await prismadb.wheelSpin.update({
        where: {
          id: allWheelSpinIdsForUser[0],
        },
        data: {
          rotation: bonusAmount,
          coin: coinAmount,
        },
      });

      //Tìm kiếm coin và rotation của người dùng giống với data --dùng để lưu vào hệ thống--
      const coinItem = allWheelSpinIdsForUserExisting.find((item) => item);
      const oldCoin = coinItem?.coin;
      const rotationItem = allWheelSpinIdsForUserExisting.find((item) => item);
      const oldRotation = rotationItem?.rotation;

      const sentWheelSpin = {
        oldcoin: oldCoin,
        oldrotation: oldRotation,
        newcoin: updatedWheelSpin?.coin,
        newrotation: updatedWheelSpin?.rotation,
      };

      const Oldchanges = [
        `Coin: ${sentWheelSpin.oldcoin}, Rotation: ${sentWheelSpin.oldrotation}`,
      ];

      const Newchanges = [
        `Coin: ${sentWheelSpin.newcoin}, Rotation: ${sentWheelSpin.newrotation}`,
      ];

      // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
      await prismadb.system.create({
        data: {
          storeId: params.storeId,
          oldChange: Oldchanges,
          newChange: Newchanges,
          type: "UPDATEWHEELSPIN",
          user: user?.email || "",
        },
      });
      return NextResponse.json(updatedWheelSpin);
    } else {
      const createWheelSpin = await prismadb.wheelSpin.create({
        data: {
          storeId: params.storeId,
          userId: data,
          rotation: bonus,
          coin: coinbonus,
        },
      });

      const sentWheelSpin = {
        coin: createWheelSpin?.coin,
        rotation: createWheelSpin?.rotation,
      };

      // Log sự thay đổi của billboard
      const changes = [
        `Coin: ${sentWheelSpin.coin}, Rotation: ${sentWheelSpin.rotation}`,
      ];

      // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
      await prismadb.system.create({
        data: {
          storeId: params.storeId,
          newChange: changes,
          type: "CREATEWHEELSPIN",
          user: user?.email || "",
        },
      });
      return NextResponse.json(createWheelSpin);
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.wheelspin.internalErrorPatchBonus") }),
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  const body = await req.json();
  const {
    unbonusAmount,
    unbonusTitle,
    unbonus,
    unbonusCoinsupdated,
    unbonuscoinnew,
    data,
  } = body;

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

    if (!unbonusTitle) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.wheelspin.unbonusTitleRequired") }),
        { status: 400 }
      );
    }

    const existingWheelSpin = await prismadb.user.findMany({
      include: {
        WheelSpin: true,
      },
    });

    // Lấy tất cả các WheelSpin IDs từ mảng existingWheelSpin cho userId cụ thể
    const allWheelSpinIdsForUser = existingWheelSpin.flatMap((user) =>
      user.WheelSpin.filter((wheelSpin) => wheelSpin.userId === data).map(
        (wheelSpin) => wheelSpin.id
      )
    );

    // Tìm các WheelSpin hiện tại
    const allWheelSpinIdsForUserExisting = existingWheelSpin.flatMap((user) =>
      user.WheelSpin.filter((wheelSpin) => wheelSpin.userId === data)
    );

    //Dựa vào data tìm kiếm người dùng giống so sánh nếu giống thì lấy ra
    const findUserEmail = existingWheelSpin.find((user) => user.id === data);

    if (!existingWheelSpin) {
      return new NextResponse(
        JSON.stringify({ error: t("toastError.wheelspin.recordNotFound") }),
        { status: 404 }
      );
    }

    const today = new Date();
    const formattedDate = format(today, "E '-' dd/MM/yyyy '-' HH:mm:ss a");
    await sendUnSpin(
      findUserEmail?.language,
      findUserEmail?.email,
      findUserEmail?.name,
      unbonus,
      unbonusAmount,
      unbonuscoinnew,
      unbonusCoinsupdated,
      unbonusTitle,
      formattedDate
    );

    if (allWheelSpinIdsForUser.length >= 1) {
      const updatedUnWheelSpin = await prismadb.wheelSpin.update({
        where: {
          id: allWheelSpinIdsForUser[0],
        },
        data: {
          rotation: unbonusAmount,
          coin: unbonusCoinsupdated,
        },
      });

      //Tìm kiếm coin và rotation của người dùng giống với data --dùng để lưu vào hệ thống--
      const coinItem = allWheelSpinIdsForUserExisting.find((item) => item);
      const oldCoin = coinItem?.coin;
      const rotationItem = allWheelSpinIdsForUserExisting.find((item) => item);
      const oldRotation = rotationItem?.rotation;

      const sentWheelSpin = {
        oldcoin: oldCoin,
        oldrotation: oldRotation,
        newcoin: updatedUnWheelSpin?.coin,
        newrotation: updatedUnWheelSpin?.rotation,
      };

      const Oldchanges = [
        `Coin: ${sentWheelSpin.oldcoin}, Rotation: ${sentWheelSpin.oldrotation}`,
      ];

      const Newchanges = [
        `Coin: ${sentWheelSpin.newcoin}, Rotation: ${sentWheelSpin.newrotation}`,
      ];

      // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
      await prismadb.system.create({
        data: {
          storeId: params.storeId,
          oldChange: Oldchanges,
          newChange: Newchanges,
          type: "UPDATEWHEELSPIN",
          user: user?.email || "",
        },
      });
      return NextResponse.json(updatedUnWheelSpin);
    } else {
      const createUnWheelSpin = await prismadb.wheelSpin.create({
        data: {
          storeId: params.storeId,
          userId: data,
          rotation: unbonus,
          coin: unbonuscoinnew,
        },
      });
      const sentUnWheelSpin = {
        coin: createUnWheelSpin?.coin,
        rotation: createUnWheelSpin?.rotation,
      };

      // Log sự thay đổi của billboard
      const changes = [
        `Coin: ${sentUnWheelSpin.coin}, Rotation: ${sentUnWheelSpin.rotation}`,
      ];

      // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
      await prismadb.system.create({
        data: {
          storeId: params.storeId,
          newChange: changes,
          type: "CREATEUNWHEELSPIN",
          user: user?.email || "",
        },
      });
      return NextResponse.json(createUnWheelSpin);
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: t("toastError.wheelspin.internalErrorPatchUnbonus") }),
      { status: 500 }
    );
  }
}

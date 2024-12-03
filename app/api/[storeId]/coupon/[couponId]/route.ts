import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { ImageCoupon, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { translateCouponIdDelete, translateCouponIdGet, translateCouponIdPatch } from "@/translate/translate-api";

type CouponValue = string | string[] | number | Date | ImageCoupon[] |  undefined | null;

interface ChangeRecord {
  oldValue: CouponValue;
  newValue: CouponValue;
}

export async function GET(
  req: Request,
  { params }: { params: { couponId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const couponIdGetMessage = translateCouponIdGet(LanguageToUse)

  try {
    if (!params.couponId) {
      return new NextResponse(
        JSON.stringify({ error: couponIdGetMessage.couponIdRequired }),
        { status: 400 }
      );
    }

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: couponIdGetMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: couponIdGetMessage.permissionDenied }),
        { status: 403 }
      );
    }

    const coupon = await prismadb.coupon.findUnique({
      where: {
        id: params.couponId,
      },
      include: {
        imagecoupon: true,
      },
    });

    return NextResponse.json(coupon);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: couponIdGetMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { couponId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const couponIdDeleteMessage = translateCouponIdDelete(LanguageToUse)
  try {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: couponIdDeleteMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: couponIdDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!params.couponId) {
      return new NextResponse(
        JSON.stringify({ error: couponIdDeleteMessage.couponIdRequired }),
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
        JSON.stringify({ error: couponIdDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    const existingCoupon = await prismadb.coupon.findUnique({
      where: {
        id: params.couponId,
      },
      include: {
        imagecoupon: true,
      },
    });

    await stripe.coupons.del(params.couponId);

    const coupon = await prismadb.coupon.delete({
      where: {
        id: params.couponId,
      },
    });

    const sentCoupon = {
      name: coupon?.name,
      description: coupon.description,
      duration: coupon?.duration,
      durationinmoth: coupon?.durationinmoth,
      percent: coupon?.percent,
      maxredemptions: coupon?.maxredemptions,
      redeemby: coupon?.redeemby,
      imagecoupon: existingCoupon?.imagecoupon.map(
        (image: { url: string }) => image
      ),
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentCoupon.name}, Description: ${sentCoupon.description}, duration: ${sentCoupon.duration}, DurationInMoth:${sentCoupon.durationinmoth}, Percent: ${sentCoupon.percent}, MaxRedemptions: ${sentCoupon.maxredemptions}, Redeemby: ${sentCoupon.redeemby}, imagecoupon: ${sentCoupon.imagecoupon}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "DELETECOUPON",
        delete: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(coupon);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: couponIdDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { couponId: string; storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const couponIdPatchMessage = translateCouponIdPatch(LanguageToUse)

  try {
    const body = await req.json();
    const {
      name,
      durationinmoth,
      duration,
      percent,
      imagecoupon,
      maxredemptions,
      redeemby,
      description,
    } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: couponIdPatchMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: couponIdPatchMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: couponIdPatchMessage.nameRequired }), {
        status: 400,
      });
    }

    if (!percent) {
      return new NextResponse(
        JSON.stringify({ error: couponIdPatchMessage.percentRequired }),
        {
          status: 400,
        }
      );
    }

    if (!imagecoupon || !imagecoupon.length) {
      return new NextResponse(
        JSON.stringify({ error: couponIdPatchMessage.imageCouponRequired }),
        { status: 400 }
      );
    }

    if (!params.couponId) {
      return new NextResponse(
        JSON.stringify({ error: couponIdPatchMessage.couponIdRequired }),
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
        JSON.stringify({ error: couponIdPatchMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    const exstingCoupon = await prismadb.coupon.findUnique({
      where: {
        id: params.couponId,
      },
      include: {
        imagecoupon: true,
      },
    });

    // Cập nhật thông tin tương ứng trên Stripe
    await stripe.coupons.update(params.couponId, {
      name: name,
    });

    await prismadb.coupon.update({
      where: {
        id: params.couponId,
      },
      data: {
        name,
        durationinmoth,
        duration,
        percent,
        maxredemptions,
        redeemby,
        description,
        imagecoupon: {
          deleteMany: {},
        },
      },
    });

    const couponupdate = await prismadb.coupon.update({
      where: {
        id: params.couponId,
      },
      data: {
        imagecoupon: {
          createMany: {
            data: [...imagecoupon.map((image: { url: string }) => image)],
          },
        },
      },
    });

    // Danh sách các trường cần loại bỏ
    const ignoredFields = ["createdAt", "updatedAt"];

    // Tạo consolidatedChanges và kiểm tra thay đổi dựa trên ignoredFields
    const changes: Record<string, ChangeRecord> = {};
    for (const key in exstingCoupon) {
      if (
        exstingCoupon.hasOwnProperty(key) &&
        couponupdate.hasOwnProperty(key)
      ) {
        if (
          exstingCoupon[key as keyof typeof exstingCoupon] !==
          couponupdate[key as keyof typeof couponupdate]
        ) {
          // Kiểm tra xem trường hiện tại có trong danh sách loại bỏ không
          if (!ignoredFields.includes(key)) {
            changes[key] = {
              oldValue: exstingCoupon[key as keyof typeof exstingCoupon],
              newValue: couponupdate[key as keyof typeof couponupdate],
            };
          }
        }
      }
    }

    // Nếu có thay đổi trong imagebillboard, thêm vào danh sách changes
    if (imagecoupon && imagecoupon.length) {
      changes["images"] = {
        oldValue: exstingCoupon?.imagecoupon.map(
          (image: { url: string }) => image.url
        ),
        newValue: imagecoupon.map((image: { url: string }) => image.url),
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
        newChange: newChanges,
        oldChange: oldChanges,
        type: "UPDATECOUPON",
        user: user?.email || "",
      },
    });

    return NextResponse.json(couponupdate);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: couponIdPatchMessage.internalError }),
      { status: 500 }
    );
  }
}

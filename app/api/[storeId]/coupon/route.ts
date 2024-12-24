import { stripe } from "@/lib/stripe";

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { Duration, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { translateCouponDelete, translateCouponGet, translateCouponPost } from "@/translate/translate-api";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const couponPostMessage = translateCouponPost(LanguageToUse);
  try {
    const body = await req.json();
    const {
      id,
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
        JSON.stringify({ error: couponPostMessage.userIdNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: couponPostMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: couponPostMessage.nameRequired }), {
        status: 400,
      });
    }

    if (!percent) {
      return new NextResponse(
        JSON.stringify({ error: couponPostMessage.percentRequired }),
        {
          status: 400,
        }
      );
    }

    if (!imagecoupon || !imagecoupon.length) {
      return new NextResponse(
        JSON.stringify({ error: couponPostMessage.imageRequired }),
        { status: 400 }
      );
    }

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: couponPostMessage.storeIdRequired }),
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
        JSON.stringify({ error: couponPostMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    let duration_in_months = null; // Mặc định là null

    // Đặt duration_in_months thành null nếu duration là once hoặc forever
    if (duration === Duration.once || duration === Duration.forever) {
      duration_in_months = null;
    } else if (duration === Duration.repeating) {
      if (durationinmoth > 0) {
        duration_in_months = durationinmoth;
      } else {
        return new NextResponse(
          JSON.stringify({ error: couponPostMessage.invalidDurationMonths }),
          { status: 400 }
        );
      }
    } else {
      return new NextResponse(JSON.stringify({ error: couponPostMessage.invalidDuration }), {
        status: 400,
      });
    }

    if (duration_in_months === null || duration_in_months === 0) {
      delete body.duration_in_months;
    } else {
      // Cập nhật giá trị duration_in_months với giá trị hợp lệ
      body.duration_in_months = duration_in_months;
    }

    const redeemTimestamp = redeemby
      ? Math.floor(new Date(redeemby).getTime() / 1000)
      : null; // Chuyển redeemby thành timestamp
    // Tạo coupon bằng Stripe
    const coupon = await stripe.coupons.create({
      id: id,
      duration: duration,
      currency: "VND",
      duration_in_months: body.duration_in_months,
      name: name,
      percent_off: percent,
      max_redemptions: maxredemptions,
      redeem_by: redeemTimestamp !== null ? redeemTimestamp : undefined,
    });

    // Lưu thông tin coupon vào cơ sở dữ liệu của bạn
    const createdCoupon = await prismadb.coupon.create({
      data: {
        id: coupon.id,
        name: coupon.name,
        description: description,
        duration: coupon.duration,
        durationinmoth: coupon.duration_in_months,
        percent: coupon.percent_off,
        maxredemptions: coupon.max_redemptions,
        redeemby: coupon.redeem_by
          ? new Date(coupon.redeem_by * 1000).toISOString()
          : null, // Chuyển đổi timestamp sang ngày
        storeId: params.storeId,
        imagecoupon: {
          createMany: {
            data: [...imagecoupon.map((image: { url: string }) => image)],
          },
        },
      },
    });

    const sentCoupon = {
      name: createdCoupon?.name,
      description: createdCoupon.description,
      duration: createdCoupon?.duration,
      durationinmoth: createdCoupon?.durationinmoth,
      percent: createdCoupon?.percent,
      maxredemptions: createdCoupon?.maxredemptions,
      redeemby: createdCoupon?.redeemby,
      imagecoupon: imagecoupon.map((image: { url: string }) => image),
    };

    // Log sự thay đổi của billboard
    const changes = [
      `Name: ${sentCoupon.name}, Description: ${sentCoupon.description}, duration: ${sentCoupon.duration}, DurationInMoth:${sentCoupon.durationinmoth}, Percent: ${sentCoupon.percent}, MaxRedemptions: ${sentCoupon.maxredemptions}, Redeemby: ${sentCoupon.redeemby}, imagecoupon: ${sentCoupon.imagecoupon}`,
    ];

    // Tạo một hàng duy nhất để thể hiện tất cả các thay đổi
    await prismadb.system.create({
      data: {
        storeId: params.storeId,
        type: "CREATECOUPON",
        newChange: changes,
        user: user?.email || "",
      },
    });

    return NextResponse.json(createdCoupon);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: couponPostMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const couponGetMessage = translateCouponGet(LanguageToUse);

  try {
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ error: couponGetMessage.storeIdRequired }),
        { status: 400 }
      );
    }

    const coupons = await prismadb.coupon.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        imagecoupon: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(coupons);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: couponGetMessage.internalError }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const user = await currentUser();
  //language
  const LanguageToUse = user?.language || "vi";
  const couponDeleteMessage = translateCouponDelete(LanguageToUse);
  try {
    const body = await req.json();
    const { ids } = body;

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: couponDeleteMessage.userNotFound }),
        { status: 403 }
      );
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return new NextResponse(
        JSON.stringify({ error: couponDeleteMessage.permissionDenied }),
        { status: 403 }
      );
    }

    if (!ids || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: couponDeleteMessage.emptyIdsArray }),
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
        JSON.stringify({ error: couponDeleteMessage.storeIdNotFound }),
        { status: 405 }
      );
    }

    // Fetch all coupon to delete, including their images
    const CouponToDelete = await prismadb.coupon.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        imagecoupon: true,
      },
    });

    // Create an array of changes for logging
    const changesArray = CouponToDelete.map((coupon) => ({
      name: coupon.name,
      description: coupon.description,
      duration: coupon.duration,
      durationinmoth: coupon.durationinmoth,
      percent: coupon.percent,
      imagecoupon: coupon.imagecoupon.map((item) => item.url),
      maxredemptions: coupon.maxredemptions,
      redeemby: coupon.redeemby,
    }));

    // Delete all the coupon in one operation
    await prismadb.coupon.deleteMany({
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
        delete: changesArray.map(
          (change) =>
            `DeleteName: ${change.name}, Description: ${change.description}, Duration: ${change.duration}, DurationInMoth: ${change.durationinmoth}, Percent: ${change.percent}, ImageCoupon: ${change.imagecoupon}, MaxRedemptions: ${change.maxredemptions}, Redeemby: ${change.redeemby}`
        ),
        type: "DELETEMANY-COUPON",
        user: user?.email || "",
      },
    });

    return NextResponse.json({ message: couponDeleteMessage.deleteSuccess });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: couponDeleteMessage.internalError }),
      { status: 500 }
    );
  }
}

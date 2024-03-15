import { stripe } from "@/lib/stripe";

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { Duration, UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const userId = await currentUser();

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

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (
      !name ||
      !percent ||
      !imagecoupon ||
      !imagecoupon.length ||
      !params.storeId
    ) {
      return new NextResponse("Invalid parameters", { status: 400 });
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
      return new NextResponse("Unauthorized", { status: 405 });
    }

    let duration_in_months = null; // Mặc định là null

    // Đặt duration_in_months thành null nếu duration là once hoặc forever
    if (duration === Duration.once || duration === Duration.forever) {
      duration_in_months = null;
    } else if (duration === Duration.repeating) {
      if (durationinmoth > 0) {
        duration_in_months = durationinmoth;
      } else {
        return new NextResponse("Invalid duration_in_months", { status: 400 });
      }
    } else {
      return new NextResponse("Invalid duration", { status: 400 });
    }

    if (duration_in_months === null || duration_in_months === 0) {
      delete body.duration_in_months;
    } else {
      // Cập nhật giá trị duration_in_months với giá trị hợp lệ
      body.duration_in_months = duration_in_months;
    }

    const redeemTimestamp = redeemby? Math.floor(new Date(redeemby).getTime() / 1000) : null; // Chuyển redeemby thành timestamp
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

    return NextResponse.json(createdCoupon);
  } catch (error) {
    console.log("[COUPON_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const getcoupon = await prismadb.coupon.findMany({
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

    return NextResponse.json(getcoupon);
  } catch (error) {
    console.log("[COUPON_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function GET(
  req: Request,
  { params }: { params: { couponId: string } }
) {
  try {
    if (!params.couponId) {
      return new NextResponse("Coupon id is required", { status: 400 });
    }

    const product = await prismadb.coupon.findUnique({
      where: {
        id: params.couponId,
      },
      include: {
        imagecoupon: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[COUPON_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { couponId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();
    const role = await currentRole();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.couponId) {
      return new NextResponse("CouponId id is required", { status: 400 });
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

    if (role !== UserRole.ADMIN) {
      return new NextResponse(
        "Access denied. Only Admins can perform this action.",
        { status: 403 }
      );
    }

    await stripe.coupons.del(params.couponId);

    const coupon = await prismadb.coupon.delete({
      where: {
        id: params.couponId,
      },
    });

    return NextResponse.json(coupon);
  } catch (error) {
    console.log("[COUPON_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { couponId: string; storeId: string } }
) {
  try {
    const userId = await currentUser();

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

    return NextResponse.json(couponupdate);
  } catch (error) {
    console.log("[COUPON_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

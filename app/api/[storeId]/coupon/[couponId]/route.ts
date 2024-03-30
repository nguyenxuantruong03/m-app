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
      return new NextResponse(
        JSON.stringify({ error: "Coupon id is required!" }),
        { status: 400 }
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
      JSON.stringify({ error: "Internal error get coupon." }),
      { status: 500 }
    );
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
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!params.couponId) {
      return new NextResponse(
        JSON.stringify({ error: "Coupon id is required!" }),
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

    await stripe.coupons.del(params.couponId);

    const coupon = await prismadb.coupon.delete({
      where: {
        id: params.couponId,
      },
    });

    return NextResponse.json(coupon);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal error delete coupon." }),
      { status: 500 }
    );
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

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Không tìm thấy user id!" }),
        { status: 403 }
      );
    }

    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
    }

    if (!percent) {
      return new NextResponse(JSON.stringify({ error: "Percent is required!" }), {
        status: 400,
      });
    }

    if (!imagecoupon || !imagecoupon.length) {
      return new NextResponse(
        JSON.stringify({ error: "Imagecoupon is required!" }),
        { status: 400 }
      );
    }

    if (!params.couponId) {
      return new NextResponse(
        JSON.stringify({ error: "CouponId id is required!" }),
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
    return new NextResponse(
      JSON.stringify({ error: "Internal error patch coupon." }),
      { status: 500 }
    );
  }
}

import prismadb from "@/lib/prismadb";
import CouponClient from "./components/client";
import { CouponColumn } from "./components/columns";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const CouponPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showCouponRole = isRole;
  const coupon = await prismadb.coupon.findMany({
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

  const formattedCoupon: CouponColumn[] = coupon.map((item) => ({
    id: item.id,
    name: item.name,
    duration: item.duration,
    durationinmoth: item.durationinmoth,
    imagecoupon: item.imagecoupon.map((item) => item.url),
    imagecouponpatch: item.imagecoupon,
    percent: item.percent,
    maxredemptions: item.maxredemptions,
    redeembypatch: item.redeemby,
    redeemby: item.redeemby,
    createdAt: item.createdAt,
    language: user?.language || "vi"
  }));
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showCouponRole}`}>
          {showCouponRole && <CouponClient data={formattedCoupon} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default CouponPage;

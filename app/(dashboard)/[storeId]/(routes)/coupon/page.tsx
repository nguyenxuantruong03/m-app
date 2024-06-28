import prismadb from "@/lib/prismadb";
import CouponClient from "./components/client";
import { CouponColumn } from "./components/columns";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const CouponPage = async ({ params }: { params: { storeId: string } }) => {
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
    imagecoupon: item.imagecoupon.map((item)=>item.url) ,
    imagecouponpatch: item.imagecoupon,
    percent: item.percent,
    maxredemptions: item.maxredemptions,
    redeembypatch: item.redeemby,
    redeemby:item.redeemby,
    createdAt: item.createdAt,
  }));
  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showCouponRole}`}>
        {showCouponRole && <CouponClient data={formattedCoupon} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default CouponPage;

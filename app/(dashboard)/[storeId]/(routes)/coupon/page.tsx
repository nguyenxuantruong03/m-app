import prismadb from "@/lib/prismadb";
import CouponClient from "./components/client";
import { CouponColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
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
    imagecoupon: item.imagecoupon.length > 0 ? item.imagecoupon[0].url : null,
    percent: item.percent,
    maxredemptions: item.maxredemptions,
    redeemby:item.redeemby
    ? format(item.redeemby, "dd/MM/yyyy")
    : null,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
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

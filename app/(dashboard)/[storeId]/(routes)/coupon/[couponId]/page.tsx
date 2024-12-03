import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import { CouponForm } from "./components/coupon-form";

const CouponPage = async ({
  params,
}: {
  params: { storeId: string; couponId: string };
}) => {
  const user = await currentUser();
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showCouponRole = isRole;
  const coupon = await prismadb.coupon.findUnique({
    where: {
      id: params.couponId,
    },
    include: {
      imagecoupon: true,
    },
  });
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showCouponRole}`}>
          {showCouponRole && <CouponForm initialData={coupon} language={user?.language || "vi"}/>}
        </div>
      </div>
    </RoleGate>
  );
};

export default CouponPage;

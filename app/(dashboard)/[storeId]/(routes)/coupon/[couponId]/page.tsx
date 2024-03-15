import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { CouponForm } from "./components/coupon-form";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; couponId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductRole = isRole;
  const coupon = await prismadb.coupon.findUnique({
    where: {
      id: params.couponId,
    },
    include: {
        imagecoupon: true,
      },
  });
  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showProductRole}`}>
        {showProductRole && (
          <CouponForm
            initialData={coupon}
          />
        )}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ProductPage;

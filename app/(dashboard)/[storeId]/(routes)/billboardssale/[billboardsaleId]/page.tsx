import prismadb from "@/lib/prismadb";
import { BillboardSaleForm } from "./components/billboardsale-form";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const BillboardSalePage = async ({
  params,
}: {
  params: { billboardsaleId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardRole = isRole;
  const billboardSale = await prismadb.billboardsale.findUnique({
    where: {
      id: params.billboardsaleId,
    },
  });
  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardRole}`}>
        {showBillboardRole && (
          <BillboardSaleForm initialData={billboardSale} />
        )}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default BillboardSalePage;

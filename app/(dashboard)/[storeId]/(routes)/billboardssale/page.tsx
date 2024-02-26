import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardSaleColumn } from "./components/columns";
import { format } from "date-fns";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const BillboardSalePage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardRole = isRole;
  const billboardSale = await prismadb.billboardsale.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboardSale: BillboardSaleColumn[] = billboardSale.map(
    (item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, "MM/dd/yyyy"),
    })
  );
  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardRole}`}>
        {showBillboardRole && (
          <BillboardClient data={formattedBillboardSale} />
        )}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default BillboardSalePage;

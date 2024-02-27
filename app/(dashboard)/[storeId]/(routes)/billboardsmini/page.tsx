import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";

const BillboardsMiniPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardRole = isRole;
  const billboardminis = await prismadb.billboardmini.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboardminis.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));
  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardRole}`}>
        {showBillboardRole && <BillboardClient data={formattedBillboards} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN && UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default BillboardsMiniPage;

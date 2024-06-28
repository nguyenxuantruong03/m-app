import prismadb from "@/lib/prismadb";
import TaxRateClient from "./components/client";
import { TaxRateColumn } from "./components/columns";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const TaxRatePage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showTaxRateRole = isRole;
  const taxRate = await prismadb.taxRate.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTaxRate: TaxRateColumn[] = taxRate.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    percentage: item.percentage,
    inclusive: item.inclusive,
    active: item.active,
    taxtype: item.taxtype,
    createdAt: item.createdAt,
  }));
  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showTaxRateRole}`}>
        {showTaxRateRole && <TaxRateClient data={formattedTaxRate} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default TaxRatePage;

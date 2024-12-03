import prismadb from "@/lib/prismadb";
import ShippingRatesClient from "./components/client";
import { ShippingRatesColumn } from "./components/columns";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import { formatter } from "@/lib/utils";

const ShippingRatesPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showShippingRatesRole = isRole;
  const shippingRates = await prismadb.shippingRates.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedShippingRates: ShippingRatesColumn[] = shippingRates.map(
    (item) => ({
      id: item.id,
      name: item.name,
      active: item.active,
      amount: formatter.format(item.amount),
      amountnotformat: item.amount,
      taxcode: item.taxcode,
      taxbehavior: item.taxbehavior,
      unitmin: item.unitmin,
      valuemin: item.valuemin,
      unitmax: item.unitmax,
      valuemax: item.valuemax,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
      language: user?.language || "vi"
    })
  );
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showShippingRatesRole}`}>
          {showShippingRatesRole && (
            <ShippingRatesClient data={formattedShippingRates} />
          )}
        </div>
      </div>
    </RoleGate>
  );
};

export default ShippingRatesPage;

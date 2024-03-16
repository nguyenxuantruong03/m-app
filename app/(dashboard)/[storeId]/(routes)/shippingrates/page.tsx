import prismadb from "@/lib/prismadb";
import ShippingRatesClient from "./components/client";
import { ShippingRatesColumn } from "./components/columns";
import { format } from "date-fns";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { formatter } from "@/lib/utils";

const ShippingRatesPage = async ({ params }: { params: { storeId: string } }) => {
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
  const formattedShippingRates: ShippingRatesColumn[] = shippingRates.map((item) => ({
    id: item.id,
    name: item.name,
    active: item.active,
    amount: formatter.format(item.amount),
    taxcode: item.taxcode,
    taxbehavior: item.taxbehavior,
    unitmin: item.unitmin,
    valuemin: item.valuemin,
    unitmax: item.unitmax,
    valuemax: item.valuemax,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }));
  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showShippingRatesRole}`}>
        {showShippingRatesRole && <ShippingRatesClient data={formattedShippingRates} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ShippingRatesPage;

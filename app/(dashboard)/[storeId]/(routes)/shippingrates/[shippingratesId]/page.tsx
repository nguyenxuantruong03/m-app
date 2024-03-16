import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { ShippingRatesForm } from "./components/shippingrates-form";

const ShippingRatesPage = async ({
  params,
}: {
  params: { storeId: string; shippingratesId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showShippingRatesRole = isRole;
  const shippingRates = await prismadb.shippingRates.findUnique({
    where: {
      id: params.shippingratesId,
    },
  });
  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showShippingRatesRole}`}>
        {showShippingRatesRole && (
          <ShippingRatesForm
            initialData={shippingRates}
          />
        )}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ShippingRatesPage;

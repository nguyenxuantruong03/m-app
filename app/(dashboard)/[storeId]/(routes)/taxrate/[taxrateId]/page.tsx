import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { TaxrateForm } from "./components/taxrate-form";

const TaxRatePage = async ({
  params,
}: {
  params: { storeId: string; taxrateId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showTaxRateRole = isRole;
  const taxrate = await prismadb.taxRate.findUnique({
    where: {
      id: params.taxrateId,
    },
  });
  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showTaxRateRole}`}>
        {showTaxRateRole && (
          <TaxrateForm
            initialData={taxrate}
          />
        )}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default TaxRatePage;

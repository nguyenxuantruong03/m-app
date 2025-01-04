import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/imageBillboard-form";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const BillboardPage = async ({
  params,
}: {
  params: { imagebillboardId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardRole = isRole;
  const billboard = await prismadb.imageBillboard.findUnique({
    where: {
      id: params.imagebillboardId,
    },
  });
  const initialData = billboard;

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardRole}`}>
          {showBillboardRole && <BillboardForm initialData={initialData} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default BillboardPage;

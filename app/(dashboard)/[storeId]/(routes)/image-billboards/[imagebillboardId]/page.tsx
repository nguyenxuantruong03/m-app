import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

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

  const billboardTime = await prismadb.imageBillboardTime.findUnique({
    where: {
      id: params.imagebillboardId,
    },
  });

  const initialData = billboard || billboardTime;

  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardRole}`}>
        {showBillboardRole && <BillboardForm initialData={initialData} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default BillboardPage;

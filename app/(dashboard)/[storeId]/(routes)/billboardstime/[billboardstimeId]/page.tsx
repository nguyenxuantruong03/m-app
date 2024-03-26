import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboardtime-form";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const BillboardTimePage = async ({
  params,
}: {
  params: { billboardstimeId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showBillboardtimeRole = isRole;
  const billboardTime = await prismadb.billboardTime.findUnique({
    where: {
      id: params.billboardstimeId,
    },
    include: {
      imagebillboardtime: true,
    },
  });

  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showBillboardtimeRole}`}>
        {showBillboardtimeRole && <BillboardForm initialData={billboardTime} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default BillboardTimePage;

import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";

const SizePage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showSizeRole = isRole;
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showSizeRole}`}>
        {showSizeRole && <SizeForm initialData={size} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN && UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default SizePage;

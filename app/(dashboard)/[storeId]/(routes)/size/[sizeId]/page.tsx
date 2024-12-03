import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";

const SizePage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showSizeRole = isRole;
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showSizeRole}`}>
          {showSizeRole && <SizeForm initialData={size} language={user?.language || "vi"}/>}
        </div>
      </div>
    </RoleGate>
  );
};

export default SizePage;

import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";

const ColorPage = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
}) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showColorRole = isRole;
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showColorRole}`}>
          {showColorRole && <ColorForm initialData={color} language={user?.language || "vi"}/>}
        </div>
      </div>
    </RoleGate>
  );
};

export default ColorPage;

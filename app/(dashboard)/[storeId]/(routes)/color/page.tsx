import prismadb from "@/lib/prismadb";
import ColorClient from "./components/client";
import { ColorColumn } from "./components/columns";
import { currentRole, currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showColorRole = isRole;
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColor: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt,
    language: user?.language || "vi"
  }));
  return (
      <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showColorRole}`}>
        {showColorRole && <ColorClient data={formattedColor} />}
      </div>
    </div>
      </RoleGate>
  );
};

export default ColorPage;

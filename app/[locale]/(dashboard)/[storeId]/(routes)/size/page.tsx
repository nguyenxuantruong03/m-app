import prismadb from "@/lib/prismadb";
import SizeClient from "./components/client";
import { SizeColumn } from "./components/columns";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showSizeRole = isRole;
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSize: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    updatedAt: item.updatedAt,
    createdAt: item.createdAt,
    language: user?.language || "vi"
  }));
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showSizeRole}`}>
          {showSizeRole && <SizeClient data={formattedSize} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default SizePage;

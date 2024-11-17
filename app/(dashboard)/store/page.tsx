import prismadb from "@/lib/prismadb";
import StoreClient from "./components/client";
import { StoreColumn } from "./components/columns";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const StorePage = async () => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showStoreRole = isRole;
  const stores = await prismadb.store.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedStore: StoreColumn[] = stores.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: item.createdAt,
  }));
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showStoreRole}`}>
          {showStoreRole && <StoreClient data={formattedStore} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default StorePage;

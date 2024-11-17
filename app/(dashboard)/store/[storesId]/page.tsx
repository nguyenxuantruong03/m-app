import prismadb from "@/lib/prismadb";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { StoreForm } from "./components/store-form";

const StorePage = async ({
  params,
}: {
  params: { storeId: string; storesId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showStoreRole = isRole;
  const store = await prismadb.store.findUnique({
    where: {
      id: params.storesId,
    },
  });

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showStoreRole}`}>
          {showStoreRole && <StoreForm initialData={store} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default StorePage;

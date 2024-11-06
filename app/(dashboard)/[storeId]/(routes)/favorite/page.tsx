import prismadb from "@/lib/prismadb";
import FavoriteClient from "./components/client";
import { FavoriteColumn } from "./components/columns";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const FavoritePage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showFavoriteRole = isRole;
  const favorite = await prismadb.favorite.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedFavorite: FavoriteColumn[] = favorite.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt,
  }));
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showFavoriteRole}`}>
          {showFavoriteRole && <FavoriteClient data={formattedFavorite} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default FavoritePage;
